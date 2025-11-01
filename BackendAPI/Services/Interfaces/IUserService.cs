using BackendAPI.Dtos; 

namespace BackendAPI.Services.Interfaces
{
    public interface IUserService
    {

        Task<UserDto?> GetUserByIdAsync(int userId);

        Task<IEnumerable<UserDto>> GetAllUsersAsync();

        Task<UserDto> RegisterUserAsync(CreateUserDto createUserDto);

    }
}