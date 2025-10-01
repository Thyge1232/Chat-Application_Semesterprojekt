using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using BackendAPI.Services.Interfaces;
using BCrypt.Net;

namespace BackendAPI.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDto?> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

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
            var users = await _userRepository.GetAllAsync();
            return users.Select(user => new UserDto
            {
                Id = user.UserId,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            });
        }

        public async Task<UserDto> RegisterUserAsync(CreateUserDto createUserDto)
        {
            if (await _userRepository.ExistsByUsernameOrEmailAsync(createUserDto.Username, createUserDto.Email))
            {
                throw new ArgumentException("Username or Email is already taken.");
            }

            // FEJL: Brug createUserDto.Password i stedet for password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password);
            var user = new User
            {
                Username = createUserDto.Username,
                Email = createUserDto.Email,
                Password = passwordHash,
                CreatedAt = DateTime.UtcNow,
                ProfilePicture = "default-avatar.png"
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

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