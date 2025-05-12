﻿using Microsoft.AspNetCore.Mvc;

namespace Lab01.Controllers;

public class FallbackController : Controller
{

    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }
}
