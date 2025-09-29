namespace BackendAPI.Models;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;
    public string? Password { get; set; } // Nullable i prototype
    public DateTime CreatedAt { get; set; }
    public string ProfilePicture { get; set; }= null!;
    public string Email { get; set; }= null!;
    public ICollection<ChatroomMember> MemberIn { get; set;} = new List<ChatroomMember>();

}