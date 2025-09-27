namespace BackendAPI.Models;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; }
    public string? Password { get; set; } // Nullable i prototype
    public DateTime CreatedAt { get; set; }
    public string ProfilePicture { get; set; }
    public string Email { get; set; }
    public ICollection<ChatroomMember> MemberIn { get; set;} = new List<ChatroomMember>();

}