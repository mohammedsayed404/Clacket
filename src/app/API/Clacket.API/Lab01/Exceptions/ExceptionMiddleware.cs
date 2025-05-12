using System.Text.Json;

namespace Lab01.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next) 
    {
        _next = next;
    }


    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next?.Invoke(httpContext)!;

        }
        catch (Exception ex)
        {

            Console.WriteLine(ex.Message);

            #region HEader
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            httpContext.Response.ContentType = "application/json";

            #endregion

            var response = new ApiExceptionResponse
                    (ex?.StackTrace?.ToString() ?? string.Empty, ex?.Message ?? string.Empty);



            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await httpContext.Response.WriteAsync(json);


            throw;
        }
    }

}