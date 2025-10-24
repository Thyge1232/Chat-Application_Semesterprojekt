using BackendAPI.Context;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repositories.Implementations;

public class UserRepository : IUserRepository
{
    private readonly MyDBContext _dbContext;

    public UserRepository(MyDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> GetByIdAsync(int userId)
    {
        return await _dbContext.Users.FindAsync(userId);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _dbContext.Users.AsNoTracking().ToListAsync();
    }

    public async Task<bool> ExistsByUsernameOrEmailAsync(string username, string email)
    {
        return await _dbContext.Users
            .AnyAsync(u => u.Username == username || u.Email == email);
    }

    public async Task<User> AddAsync(User user)
    {
        await _dbContext.Users.AddAsync(user);
        return user;
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }


    public async Task<User?> FindByUsernameAsync(string username)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Username == username);
    }
}