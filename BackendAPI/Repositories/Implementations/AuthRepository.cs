using System.Runtime.InteropServices;
using BackendAPI.Context;
using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repositories.Implementations;

public class AuthRepository : IAuthRepository
{
    private readonly MyDBContext _dbContext;

    public AuthRepository(MyDBContext context)
    {
        _dbContext = context;
    }

    public async Task<User?> PostLoginAsync(LoginDto loginDto)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
    }
}
