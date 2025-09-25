namespace BackendAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Message
{
    public int MessageId { get; set; }
    public string MessageContent { get; set; }
    public int ChatroomId { get; set; } 

    [ForeignKey("ChatroomId")]
    public Chatroom Chatroom { get; set; }
    public string TimeStamp { get; set; }

    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; }

}