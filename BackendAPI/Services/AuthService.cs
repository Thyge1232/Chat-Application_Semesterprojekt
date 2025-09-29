using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Context;
using BackendAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly MyDBContext _dbContext;

        private readonly IConfiguration _config;

        public AuthService(MyDBContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
             var user = await _dbContext.Users
        .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

    if (user == null)
        throw new InvalidOperationException("User not found");

    if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
        throw new UnauthorizedAccessException("Invalid password");

    var key = Encoding.ASCII.GetBytes(_config["Jwt:Secret"]);
    var tokenHandler = new JwtSecurityTokenHandler();

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}

    }
}
