namespace BackendAPI.Models;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; }
    public string PassWord { get; set; }
    public string CreatedAt { get; set; }
    public string ProfilePicture { get; set; }
    public string Email { get; set; }
    public ICollection<ChatroomMember> MemberIn { get; set;} = new List<ChatroomMember>();

}