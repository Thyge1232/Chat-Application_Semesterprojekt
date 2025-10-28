using BackendAPI.Models;

namespace BackendAPI.Repositories.Interfaces;

public interface IConversationRepository
{
    Task AddAsync(Conversation conversation);
    Task SaveChangesAsync();
    Task<Conversation?> GetByIdWithMembersAsync(int conversationId);
    Task<IEnumerable<Conversation>> GetByUserIdAsync(int userId);
    Task<User?> AddUsertoConversationAsync(Conversation conversation, int userId);
    Task<bool> RemoveUserFromConversationAsync(Conversation conversation, int userId);
}
