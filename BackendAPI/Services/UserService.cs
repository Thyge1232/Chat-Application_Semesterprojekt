using BackendAPI.Context; 
using BackendAPI.Dtos;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;

namespace BackendAPI.Services
{
    public class UserService : IUserService
    {
        private readonly MyDBContext _dbContext;

        public UserService(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserDto?> GetUserByIdAsync(int userId)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return null;
            }

            // Hvis brugeren findes, map den til en UserDto og returner
            return new UserDto
            {
                Id = user.UserId,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _dbContext.Users
                .Select(u => new UserDto
                {
                    Id = u.UserId,
                    Username = u.Username,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();

            return users;
        }

        public async Task<UserDto> RegisterUserAsync(CreateUserDto createUserDto) // POST
        {
            if (await _dbContext.Users.AnyAsync(u => u.Username == createUserDto.Username))
            {

                throw new ArgumentException($"Username '{createUserDto.Username}' is already taken.");
            }

            var user = new User
            {
                Username = createUserDto.Username,
                Email = createUserDto.Email,
                Password = null,
                CreatedAt = DateTime.UtcNow,
                ProfilePicture = "default-avatar.png"
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return new UserDto
            {
                Id = user.UserId,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }
    }
}