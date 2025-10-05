namespace BackendAPI.Tests.Unit.Factories;

public static class UserFactory
{
    public static User CreateUser(
        int id = 1, 
        string username = "testuser", 
        string email = "test@example.com", 
        string passwordHash = "a_valid_hash")
    {
        return new User
        {
            UserId = id,
            Username = username,
            Email = email, 
            Password = passwordHash,
            CreatedAt = DateTime.UtcNow,
            ProfilePicture = "default.png"
        };
    }
}

public static class CreateUserDtoFactory
{
    public static CreateUserDto Create(
        string username = "testname", 
        string email = "test@example.com", 
        string password = "password123")
    {
        return new CreateUserDto
        {
            Username = username,
            Email = email,
            Password = password 
        };
    }
}