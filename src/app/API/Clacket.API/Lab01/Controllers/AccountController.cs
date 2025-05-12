using Lab01.DTOs;
using Lab01.Helper;
using Lab01.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Lab01.Controllers;

public class AccountController : ApiControllerBase
{
    private readonly IConfiguration _config;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(IConfiguration config, UserManager<ApplicationUser> userManager)
    {
        _config = config;
        _userManager = userManager;
    }



    [HttpPost("register")]
    //public async Task<ActionResult<TokenDto>> Register(RegisterDto registerDto)
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {

        var user = new ApplicationUser
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,

        };


        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return Unauthorized(new ApiResponse(StatusCodes.Status401Unauthorized));





        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            //new Claim (ClaimTypes.Role , "Admin")
            new Claim (ClaimTypes.Role , "student") //test student police
        };


        await _userManager.AddClaimsAsync(user, claims);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["MyKey"]!));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var Expire = DateTime.Now.AddDays(2);

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: signingCredentials,
            expires: Expire
            );


        //return new TokenDto(new JwtSecurityTokenHandler().WriteToken(token), Expire);

        var userToken = new JwtSecurityTokenHandler().WriteToken(token);

        return new UserDto(user.Email, userToken);

    }


    [HttpPost("login")]
    //public async Task<ActionResult<TokenDto>> Login(LoginDto loginDto)
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {

        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user is null)
            return NotFound(new ApiResponse(StatusCodes.Status404NotFound));


        if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized(new ApiResponse(StatusCodes.Status401Unauthorized));

        var claims = await _userManager.GetClaimsAsync(user);


        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["MyKey"]!));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var Expire = DateTime.Now.AddDays(2);

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: signingCredentials,
            expires: Expire
            );


        //return new TokenDto(new JwtSecurityTokenHandler().WriteToken(token), Expire);

        var userToken = new JwtSecurityTokenHandler().WriteToken(token);

        return new UserDto(user?.Email!, userToken);

    }




}
