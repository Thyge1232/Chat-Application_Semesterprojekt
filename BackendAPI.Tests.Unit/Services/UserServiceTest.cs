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
        var createUserDto = CreateUserDtoFactory.Create(
            "testuser",
            "test@example.com",
            "password123"
        );

        _mockUserRepository
            .Setup(repo =>
                repo.ExistsByUsernameOrEmailAsync(createUserDto.Username, createUserDto.Email)
            )
            .ReturnsAsync(false);
        _mockPasswordHasher
            .Setup(ph => ph.HashPassword(createUserDto.Password))
            .Returns("hashed_password_from_mock");

        // Act
        var result = await _userService.RegisterUserAsync(createUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(createUserDto.Username, result.Username);
        Assert.Equal(createUserDto.Email, result.Email);

        // 2. Blev password hashing kaldt korrekt?
        _mockUserRepository.Verify(
            repo =>
                repo.AddAsync(
                    It.Is<User>(user => // Inspicerer den bruger, der blev sendt til AddAsync
                        user.Username == createUserDto.Username
                        && user.Email == createUserDto.Email
                        && user.Password == "hashed_password_from_mock"
                    )
                ),
            Times.Once
        ); // Sker kun en gang

        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task RegisterUserAsync_WithExistingUsername_ShouldReturnError()
    {
        // Arrange
        var existingUsername = "existingUser";
        var createUserDto = CreateUserDtoFactory.Create(
            username: existingUsername,
            email: "test@example.com",
            password: "password123"
        );

        _mockUserRepository
            .Setup(repo => repo.ExistsByUsernameOrEmailAsync(existingUsername, "test@example.com"))
            .ReturnsAsync(true);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ArgumentException>(() =>
            _userService.RegisterUserAsync(createUserDto)
        );

        // Verify at intet blev gemt
        _mockUserRepository.Verify(repo => repo.AddAsync(It.IsAny<User>()), Times.Never);

        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Never);

        // Verify exception message
        Assert.Equal("Username or Email is already taken.", exception.Message);
    }

    [Fact]
    public async Task GetUserByIdAsync_WithExistingId_ShouldReturnUserDto()
    {
        // Arrange
        var targetUserId = 1;
        var fakeUser = UserFactory.CreateUser(
            id: targetUserId,
            username: "fakeuser",
            email: "fake@example.com"
        );

        _mockUserRepository.Setup(repo => repo.GetByIdAsync(targetUserId)).ReturnsAsync(fakeUser);

        // Act
        var result = await _userService.GetUserByIdAsync(targetUserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(fakeUser.Username, result.Username);
        Assert.Equal(fakeUser.UserId, result.Id);
    }

    [Fact]
    public async Task GetUserByIdAsync_WithNonExistingId_ShouldReturnNull()
    {
        // Arrange
        var nonExistingId = 99;

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(nonExistingId))
            .ReturnsAsync(null as User);
        // Act
        var result = await _userService.GetUserByIdAsync(nonExistingId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task GetAllUsersAsync_WithUsers_ShouldReturnUsers()
    {
        // Arrange
        var user1 = UserFactory.CreateUser(
            id: 1,
            username: "fakeuser1",
            email: "fake1@example.com"
        );
        var user2 = UserFactory.CreateUser(
            id: 2,
            username: "fakeuser2",
            email: "fake2@example.com"
        );

        var users = new List<User> { user1, user2 };

        _mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(users);

        // Act
        var result = await _userService.GetAllUsersAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        var firstUserInResult = result.First();
        Assert.Equal(user1.Username, firstUserInResult.Username); // Tjekker at data er korrekt
        Assert.Equal(user1.Email, firstUserInResult.Email);

        var secondUserInResult = result.Last();
        Assert.Equal(user2.Username, secondUserInResult.Username);
        Assert.Equal(user2.Email, secondUserInResult.Email);
    }

    [Fact]
    public async Task GetAllUsersAsync_WithNoUsers_ShouldReturnEmptyCollection()
    {
        // Arrange
        var users = new List<User>();

        _mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(users);

        // Act
        var result = await _userService.GetAllUsersAsync();

        // Assert
        Assert.NotNull(result); //Er ikke null
        Assert.Empty(result); //Returer tom liste
        Assert.Empty(result);
    }

    [Fact]
    public async Task UpdateColorThemeAsync_WithCorrectUserId_ShouldUpdateUserColorTheme()
    {
        // Arrange
        var userId = 1;
        var newColorTheme = "dark-mode";

        var user1 = UserFactory.CreateUser(
           id: 1,
           username: "fakeuser1",
           email: "fake1@example.com"
       );
        _mockUserRepository.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync(user1);

        // Act
        await _userService.UpdateColorThemeAsync(userId, newColorTheme);
        // Assert
        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Once);
        Assert.Equal(newColorTheme, user1.ColorTheme);
    }

    [Fact]
    public async Task UpdateColorThemeAsync_WithWrongUserId_ShouldNotUpdateUserColorTheme()
    {
        // Arrange
        var userId = 99; // Non-existing user ID
        var newColorTheme = "dark-mode";

        _mockUserRepository.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync((User?)null);

        // Act
        await _userService.UpdateColorThemeAsync(userId, newColorTheme);

        // Assert
        _mockUserRepository.Verify(repo => repo.SaveChangesAsync(), Times.Never);
    }

}
