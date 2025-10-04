using BackendAPI.Tests.Unit.Factories;

public class UserServiceTest
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
    public async Task RegisterUserAsync_WithUniqueUsername_ShouldReturnNewUserDto()
    {
        // Arrange
        var createUserDto = UserFactory.CreateUserDto(username: "testuser", email: "test@example.com");

        _mockUserRepository
            .Setup(repo => repo.ExistsByUsernameOrEmailAsync(createUserDto.Username, createUserDto.Email))
            .ReturnsAsync(false);
        _mockPasswordHasher
            .Setup(ph => ph.HashPassword(createUserDto.Password))
            .Returns("hashed_password_from_mock");

        // Act
        var result = await _userService.RegisterUserAsync(createUserDto);

        // Assert
        // 1. Test det offentlige output (DTO'en)
        Assert.NotNull(result);
        Assert.Equal(createUserDto.Username, result.Username);
        Assert.Equal(createUserDto.Email, result.Email);

        // 2. Test den interne opførsel (hvad blev sendt til databasen?)
        _mockUserRepository.Verify(repo => repo.AddAsync(
            It.Is<User>(user =>
                user.Username == createUserDto.Username &&
                user.Email == createUserDto.Email &&
                user.Password == "hashed_password_from_mock" // <-- Vores bevis
            )), 
            Times.Once);
        
        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }
}