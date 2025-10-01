namespace BackendAPI.Models;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;
    public string Password { get; set; } 
    public DateTime CreatedAt { get; set; }
    public string? ProfilePicture { get; set; }
    public string Email { get; set; }= null!;
    public ICollection<ConversationMember> MemberIn { get; set;} = new List<ConversationMember>();

}