using System.Runtime.InteropServices;
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
            return await _dbContext
                .Conversations.Include(c => c.UserList)
                .ThenInclude(cu => cu.User)
                .FirstOrDefaultAsync(c => c.ConversationId == conversationId);
        }
        
        public async Task<IEnumerable<Conversation>> GetByUserIdAsync(int userId)
        {
            return await _dbContext.Conversations
                .Where(c => c.UserList.Any(cm => cm.UserId == userId))
                .AsNoTracking()
                .ToListAsync();
        }


        public async Task<User?> AddUsertoConversationAsync(Conversation conversation, int userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
            {
                return null;
            }

            var alreadyAdded = await _dbContext.ConversationMembers.AnyAsync(cm =>
                cm.ConversationId == conversation.ConversationId && cm.UserId == userId
            );

            if (alreadyAdded)
                return user;

            var conversationMember = new ConversationMember
            {
                ConversationId = conversation.ConversationId,
                UserId = userId,
                JoinedAt = DateTime.UtcNow
            };
            _dbContext.ConversationMembers.Add(conversationMember);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<bool> RemoveUserFromConversationAsync(Conversation conversation, int userId)
        {
            var conversationMember = await _dbContext.ConversationMembers.FirstOrDefaultAsync(u => u.UserId == userId && u.ConversationId == conversation.ConversationId);
            if (conversationMember == null)
            {
                return false;
            }

            _dbContext.ConversationMembers.Remove(conversationMember);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
