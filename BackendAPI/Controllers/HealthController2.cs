using Microsoft.AspNetCore.Mvc;

// A simple health check controller to verify that the API is running.
namespace BackendAPI.Controllers;

[ApiController]
[Route("health2")]
public class HealthController2 : ControllerBase
{
    [HttpGet] public IActionResult Get() => Ok(new { status = "NOT ok" });
}
