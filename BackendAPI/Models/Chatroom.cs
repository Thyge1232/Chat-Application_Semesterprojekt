namespace BackendAPI.Models;

public class Chatroom
{
    public int ChatroomId { get; set; }
    public string Name { get; set; }
    public string CreatedAt { get; set; }
    public ICollection<ChatroomMember> UserList { get; set;} = new List<ChatroomMember>();
}