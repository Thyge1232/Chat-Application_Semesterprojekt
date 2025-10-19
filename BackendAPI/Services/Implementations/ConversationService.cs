using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using BackendAPI.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace BackendAPI.Services.Implementations
{
    public class ConversationService : IConversationService
    {
        private readonly IConversationRepository _convoRepo;

        public ConversationService(IConversationRepository convoRepo)
        {
            _convoRepo = convoRepo;
        }

        public async Task<ConversationDto> CreateConversationAsync(CreateConversationDto createDto)
        {

            var conversation = new Conversation
            {
                Name = createDto.Name,
                CreatedAt = DateTime.UtcNow
            };

            await _convoRepo.AddAsync(conversation);
            await _convoRepo.SaveChangesAsync();

            return new ConversationDto
            {
                Id = conversation.ConversationId,
                Name = conversation.Name
            };
        }
        public async Task<ConversationWithMembersDto?> GetConversationByIdAsync(int conversationId)
        {
            var conversation = await _convoRepo.GetByIdWithMembersAsync(conversationId);
            if (conversation == null)
            {
                return null;
            }
            return new ConversationWithMembersDto
            {
                Id = conversation.ConversationId,
                Name = conversation.Name,
                CreatedAt = conversation.CreatedAt,
                Members = conversation.UserList.Select(cm => new UserDto
                {
                    Id = cm.User.UserId,
                    Username = cm.User.Username,
                    Email = cm.User.Email,
                    CreatedAt = cm.User.CreatedAt
                }).ToList()

            };
        }
    
    }
        
}