namespace BackendAPI.Tests.Unit.Services;

public class AuthTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IPasswordHasher> _mockPasswordHasher;
    private readonly UserService _userService;

    public UserServiceTest()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _mockPasswordHasher = new Mock<IPasswordHasher>();
        _userService = new UserService(_mockUserRepository.Object, _mockPasswordHasher.Object);
    }

    [Fact]
    public async Task VerifyPassword_PasswordIsCorrect_Return
    {
        
    }

}