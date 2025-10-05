namespace BackendAPI.Tests.Unit.Services;

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
        var createUserDto = CreateUserDtoFactory.Create("testuser", "test@example.com", "password123");

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

        // 2. Blev password hashing kaldt korrekt?
        _mockUserRepository.Verify(repo => repo.AddAsync(
            It.Is<User>(user => // Inspicerer den bruger, der blev sendt til AddAsync
                user.Username == createUserDto.Username &&
                user.Email == createUserDto.Email &&
                user.Password == "hashed_password_from_mock" // <-- Vores bevis
            )),
            Times.Once); // Sker kun en gang

        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task GetUserByIdAsync_WithExistingId_ShouldReturnUserDto()
    {
        // Arrange
        var targetUserId = 1;
        var fakeUser = UserFactory.CreateUser(id: targetUserId, username: "fakeuser", email: "fake@example.com");

        _mockUserRepository
                .Setup(repo => repo.GetByIdAsync(targetUserId))
                .ReturnsAsync(fakeUser);

        // Act
        var result = await _userService.GetUserByIdAsync(targetUserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(fakeUser.Username, result.Username);
        Assert.Equal(fakeUser.UserId, result.Id);
    }
    [Fact]
    public async Task GetUserByIdAsyc_WithNoneExistingId_ShoudReturnNull()
    {
        //Arrange
        var nonExistingId = 99;

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(nonExistingId))
            .ReturnsAsync(null);

        //Act
        var result = await _userService.GetUserByIdAsync(nonExistingId);

        //Assert
        Assert.Null(result);





    }
}