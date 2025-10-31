namespace BackendAPI.Models;

public class Conversation
{
    public int ConversationId { get; set; }
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? ColorTheme { get; set; }
    public ICollection<ConversationMember> UserList { get; set;} = new List<ConversationMember>();
}