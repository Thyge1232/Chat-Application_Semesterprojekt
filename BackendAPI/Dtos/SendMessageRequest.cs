using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos;

public sealed class SendMessageRequest
{
    [Required] public int ConversationId { get; set; }
    [Required] public int UserId { get; set; }

    [Required, StringLength(4000, MinimumLength = 1)]
    public string Content { get; set; } = string.Empty;
}
