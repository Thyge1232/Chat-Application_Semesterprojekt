using BackendAPI.Context;
using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


// A simple health check controller to verify that the API is running.
namespace BackendAPI.Controllers;

[ApiController]
public class TestController : ControllerBase
{
    private readonly MyDBContext _context;
    private readonly MyDBContext _db;
    private readonly IPasswordHasher _passwordHasher;

    public TestController(MyDBContext db)
    {
        _db = db;
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

    [HttpGet("test-hash")]
    public IActionResult TestHash()
    {
        var testPassword = "test123";
        var hashedPassword = _passwordHasher.HashPassword(testPassword);
        var isValid = _passwordHasher.VerifyPassword(testPassword, hashedPassword);

        return Ok(new
        {
            OriginalPassword = testPassword,
            HashedPassword = hashedPassword,
            VerificationResult = isValid
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            // Find bruger i databasen
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

            if (user == null)
                return Unauthorized("User not found");

            // Verificér adgangskode
            if (!_passwordHasher.VerifyPassword(loginDto.Password, user.Password))
                return Unauthorized("Invalid password");

            // Generér JWT-token (hvis du har AuthService)
            // Eller brug en simpel test-token
            return Ok(new { token = "test-jwt-token" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [Route("testGet")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DbTest>>> GetAll()
    {
        return await _db.Tests.AsNoTracking().OrderByDescending(t => t.DbTestId).ToListAsync();
    }
}