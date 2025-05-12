using Microsoft.AspNetCore.Identity;

namespace Lab01.Models;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}
