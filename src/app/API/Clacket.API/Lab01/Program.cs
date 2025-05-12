using Lab01.Data;
using Lab01.Exceptions;
using Lab01.Helper;
using Lab01.Mapping;
using Lab01.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Lab01;

public class Program
{
    public async static Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);



        #region DI Services 

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<AppDbContext>(options =>
        //options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


        builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>();

        builder.Services.Configure<ApiBehaviorOptions>(config =>
        {
            config.InvalidModelStateResponseFactory = context =>
            {
                var errors = context.ModelState.Where(model => model.Value.Errors.Any())
                                               .SelectMany(model => model.Value.Errors)
                                               .Select(error => error.ErrorMessage);

                var response = new ApiValidationErrorResponse()
                {
                    Errors = errors
                };


                return new BadRequestObjectResult(response);

            };
        });


        builder.Services.AddAutoMapper(typeof(MappingProfiler));

        builder.Services.AddCors(options =>
        {

            options.AddPolicy("myCore", builder =>
            //builder.WithOrigins("http://127.0.0.1:5500")
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyMethod()
                   .AllowAnyHeader());
        });

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = "mySchema";
            options.DefaultChallengeScheme = "mySchema";
        }).AddJwtBearer("mySchema", config =>
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["MyKey"]!));
            config.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = key
            };
        });



        builder.Services.AddAuthorization(options =>
        {
            const string AllowAdmin = "AllowAdmin";

            options.AddPolicy(AllowAdmin, policy =>
            policy.RequireClaim(ClaimTypes.Role, "Admin"));
        });




        #endregion

        var app = builder.Build();


        using (var scope = app.Services.CreateScope())
        {
            using (var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>())
            {
                await dbContext.Database.MigrateAsync();
            }
        }


        #region  Kestrel

        app.UseMiddleware<ExceptionMiddleware>();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }


        app.UseHttpsRedirection();



        app.UseCors("myCore");

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.UseStaticFiles();


        app.MapControllers();
        //app.MapFallbackToController("Index", "Fallback");

        #endregion



        app.Run();
    }
}
