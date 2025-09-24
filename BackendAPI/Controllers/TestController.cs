using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test;

// A simple health check controller to verify that the API is running.
namespace BackendAPI.Controllers;

[ApiController]
public class TestController : ControllerBase
{
    private readonly MyDBContext _db;

    public TestController(MyDBContext db)
    {
        _db = db;
        _db.Database.EnsureCreated();
    }




    [Route("testPost")]
    [HttpPost]
    public async Task<ActionResult> Post()
    {
        try
        {
            await _db.Database.MigrateAsync();
            return Ok(new { status = "migrated" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [Route("testGet")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DbTest>>> GetAll() =>
    
            await _db.Tests.AsNoTracking().OrderByDescending(t => t.DbTestId).ToListAsync();
}
