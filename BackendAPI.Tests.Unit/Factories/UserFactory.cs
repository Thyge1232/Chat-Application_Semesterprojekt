namespace BackendAPI.Tests.Unit.Factories;

public static class UserFactory
{
    public static User CreateUser(int id, string username, string email, string passwordHash)
    {
        return new User
        {
            UserId = id,
            Username = username,
            Email = $"{email}@example.com",
            Password = hashed_password,
            CreatedAt = DateTime.UtcNow,
            ProfilePicture = "default.png"
        };
    }

}


public static class CreateUserDtoFactory
{
    public static CreateUserDto Create(string username = "testname", string email = "test@example.com", string password)
    {
        return new CreateUserDto
        {
            Username = username,
            Email = email,
            Password = "password123"
        };
    }
}
