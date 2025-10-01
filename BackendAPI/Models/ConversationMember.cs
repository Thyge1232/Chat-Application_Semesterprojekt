namespace BackendAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;
public class ConversationMember
{
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; }
    public int ConversationId { get; set; }
    [ForeignKey("ConversationId")]
    public Conversation Conversation { get; set; }
    public DateTime JoinedAt { get; set; }

}