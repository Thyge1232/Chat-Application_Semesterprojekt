using BackendAPI.Models;
using BackendAPI.Dtos;

namespace BackendAPI.Repositories.Interfaces;

public interface IAuthRepository
{
    Task<User?> PostLoginAsync(LoginDto loginDto);
}