using BackendAPI.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;



namespace BackendAPI.Tests.Unit.Services;

public class AuthServiceTest
{
    private readonly MyDBContext _myDbContext;
    private readonly Mock<IConfiguration> _mockConfig;
    private readonly Mock<IPasswordHasher> _mockPasswordHasher;
    private readonly AuthService _authService;

    public AuthServiceTest()
    {
        var options = new DbContextOptionsBuilder<MyDBContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _myDbContext = new MyDBContext(options);

        _mockConfig = new Mock<IConfiguration>();
        _mockConfig.Setup(c => c["Jwt:Secret"]).Returns("this_is_a_super_secret_key_1234567890");

         _mockPasswordHasher = new Mock<IPasswordHasher>();

        _authService = new AuthService(_myDbContext, _mockConfig.Object, _mockPasswordHasher.Object);
    }

    [Fact]
    public async Task LoginAsync_CorrectPassword_LoginSuccess()
    {
        // Arrange
        var user = new User
        {
            UserId = 1111,
            Username = "alice",
            Password = "$2a$11$DHb2SBahkIIXSIv1hf.GX.fP1BjCtOwTJJ9Boyqi3PrjEqCZRQs66",
            Email = "alice@example.com"
        };

        _myDbContext.Users.Add(user);
        await _myDbContext.SaveChangesAsync();

        _mockPasswordHasher.Setup(p => p.VerifyPassword("alice123", user.Password)).Returns(true);

        var loginDto = new LoginDto { Username = "alice", Password = "alice123" };

        // Act
        var token = await _authService.LoginAsync(loginDto);

        // Assert
        Assert.False(string.IsNullOrWhiteSpace(token));
    }

      [Fact]
    public async Task LoginAsync_WrongPassword_LoginFail()
    {
        // Arrange
        var user = new User
        {
            UserId = 1111,
            Username = "alice",
            Password = "$2a$11$DHb2SBahkIIXSIv1hf.GX.fP1BjCtOwTJJ9Boyqi3PrjEqCZRQs66",
            Email = "alice@example.com"
        };

        _myDbContext.Users.Add(user);
        await _myDbContext.SaveChangesAsync();

        var loginDto = new LoginDto { Username = "alice", Password = "forkert" };

        _mockPasswordHasher.Setup(p => p.VerifyPassword("forkert", user.Password)).Returns(false);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
        _authService.LoginAsync(loginDto));
    }
}