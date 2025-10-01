namespace BackendAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Message
{
    public int MessageId { get; set; }
    public string MessageContent { get; set; }
    public int ConversationId { get; set; } 

    [ForeignKey("ConversationId")]
    public Conversation Conversation { get; set; }
    public DateTime TimeStamp { get; set; }

    public int UserId { get; set; }
    [ForeignKey("UserId")] public User User { get; set; }

}