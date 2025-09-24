using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test;
// A simple health check controller to verify that the API is running.
namespace BackendAPI.Controllers;

[ApiController]
[Route("testPut")]
public class TestController : ControllerBase
{
    private readonly MyDBContext _db;
    TestController(MyDBContext db) => _db = db;
    [HttpPost] async public Task<ActionResult> Post()
    {
        await _db.Database.MigrateAsync();
        return Ok(new { status = "migrated" });
    }
    [HttpGet] async public Task<ActionResult<IEnumerable<DbTest>>> GetAll() =>
        await _db.Tests.AsNoTracking().OrderByDescending(t => t.TestId).ToListAsync();

}
