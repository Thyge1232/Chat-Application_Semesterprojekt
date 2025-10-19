namespace BackendAPI.Dtos
{
    public class ConversationWithMembersDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public List<UserDto> Members { get; set; } = new();
    }
}