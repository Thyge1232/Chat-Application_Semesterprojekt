namespace BackendAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;
public class ChatroomMember
{
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; }
    public int ChatroomId { get; set; }
    public Chatroom Chatroom { get; set; }
    public DateTime JoinedAt { get; set; }

}