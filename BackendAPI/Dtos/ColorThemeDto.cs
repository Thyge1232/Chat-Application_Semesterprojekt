using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos;

public class ColorThemeUpdateDto
{


    [Required]
    public string ColorTheme { get; set; } = string.Empty;


}