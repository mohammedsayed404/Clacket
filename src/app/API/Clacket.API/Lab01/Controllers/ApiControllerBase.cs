using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Lab01.Controllers;

[Route("api/[controller]")]
[ApiController]
//[EnableCors("myCore")]
public class ApiControllerBase : ControllerBase
{
}
