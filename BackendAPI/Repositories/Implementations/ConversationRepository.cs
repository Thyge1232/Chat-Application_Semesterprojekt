using BackendAPI.Context;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repositories.Implementations
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly MyDBContext _dbContext;

        public ConversationRepository(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(Conversation conversation)
        {
            await _dbContext.Conversations.AddAsync(conversation);
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task<Conversation?> GetByIdWithMembersAsync(int conversationId)
        {
            return await _dbContext.Conversations
                .Include(c => c.UserList)
                .ThenInclude(cu => cu.User)
                .FirstOrDefaultAsync(c => c.ConversationId == conversationId);
        }

    }
}