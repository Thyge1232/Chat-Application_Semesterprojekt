using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Contracts;

public sealed class SendMessageRequest
{
    [Required] public int ChatroomId { get; set; }
    [Required] public int UserId { get; set; }

    [Required, StringLength(4000, MinimumLength = 1)]
    public string Content { get; set; } = string.Empty;
}
