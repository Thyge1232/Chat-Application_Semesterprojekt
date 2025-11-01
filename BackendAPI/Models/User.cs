namespace BackendAPI.Models;

public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } 
    public DateTime CreatedAt { get; set; }
    public string ProfilePicture { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public ICollection<ConversationMember> MemberIn { get; set;} = new List<ConversationMember>();

}