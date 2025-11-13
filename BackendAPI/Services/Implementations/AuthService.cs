using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackendAPI.Context;
using BackendAPI.Dtos;
using BackendAPI.Repositories.Implementations;
using BackendAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BackendAPI.Repositories.Interfaces;

namespace BackendAPI.Services.Implementations;

public class AuthService : IAuthService
{
    private readonly IConfiguration _config;
    private readonly IAuthRepository _authRepository;
    private readonly IPasswordHasher _passwordHasher;


    public AuthService(IAuthRepository repo, IConfiguration config, IPasswordHasher passwordHasher)
    {
        _authRepository = repo;
        _config = config;
        _passwordHasher = passwordHasher;
    }

    public async Task<string> LoginAsync(LoginDto loginDto)
    {
        var user = await _authRepository.PostLoginAsync(loginDto);

        if (user == null)
            throw new InvalidOperationException("Cannot find user");

        if (!_passwordHasher.VerifyPassword(loginDto.Password, user.Password))
            throw new UnauthorizedAccessException("That is an invalid password");

        var key = Encoding.ASCII.GetBytes(_config["Jwt:Secret"]);
        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}