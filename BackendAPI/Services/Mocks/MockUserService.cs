using BackendAPI.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using BackendAPI.Services.Interfaces;

namespace BackendAPI.Services.Mocks
{
    // Denne klasse implementerer det SAMME interface som jeres rigtige service.
    // Den er en "stunt double".
    public class MockUserService : IUserService
    {
        // Vi simulerer en database med en simpel liste i hukommelsen.
        private readonly List<UserDto> _users;
        private int _nextId = 3; // Start ID efter de hardcodede brugere

        public MockUserService()
        {
            // Initialiser med noget falsk data
            _users = new List<UserDto>
            {
                new UserDto { Id = 1, Username = "mock_alice", Email = "alice@mock.com", CreatedAt = DateTime.UtcNow },
                new UserDto { Id = 2, Username = "mock_bob", Email = "bob@mock.com", CreatedAt = DateTime.UtcNow }
            };
        }

        public Task<UserDto?> GetUserByIdAsync(int userId)
        {
            var user = _users.FirstOrDefault(u => u.Id == userId);
            // Task.FromResult() pakker et simpelt resultat ind i en Task, så signaturen matcher interfacet.
            return Task.FromResult(user);
        }

        public Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return Task.FromResult(_users.AsEnumerable());
        }

        public Task<UserDto> RegisterUserAsync(CreateUserDto createUserDto)
        {
            // Simuler at tjekke for dubletter
            if (_users.Any(u => u.Username == createUserDto.Username))
            {
                throw new ArgumentException($"Username '{createUserDto.Username}' is already taken.");
            }

            // Simuler oprettelse af en ny bruger
            var newUser = new UserDto
            {
                Id = _nextId++,
                Username = createUserDto.Username,
                Email = createUserDto.Email,
                CreatedAt = DateTime.UtcNow
            };

            _users.Add(newUser);
            return Task.FromResult(newUser);
        }
    }
}