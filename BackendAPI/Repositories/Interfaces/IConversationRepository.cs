using BackendAPI.Models;

namespace BackendAPI.Repositories.Interfaces;

public interface IConversationRepository
{
    Task AddAsync(Conversation conversation);
    Task SaveChangesAsync();
    Task<Conversation?> GetByIdWithMembersAsync(int conversationId);
    Task<IEnumerable<Conversation>> GetByUserIdAsync(int userId);
}