using BackendAPI.Dtos; 
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces

{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDto loginDto);
    }
}