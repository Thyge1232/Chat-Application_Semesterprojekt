using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos;

public class CreateConversationDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;
}