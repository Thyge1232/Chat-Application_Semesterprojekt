using BackendAPI.Models;

namespace BackendAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> ExistsByUsernameOrEmailAsync(string username, string email);
        Task<User> AddAsync(User user);
        Task SaveChangesAsync();
    }
}