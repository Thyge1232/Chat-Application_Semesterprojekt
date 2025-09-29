using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty; 

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty; 

        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
        public string Password { get; set; } = string.Empty;
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty; 
        public string Email { get; set; } = string.Empty;    
        public DateTime CreatedAt { get; set; }              
    }
}