using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using BackendAPI.Services.Interfaces;

namespace BackendAPI.Services.Implementations;

public class ConversationService : IConversationService
{
    private readonly IConversationRepository _convoRepo;

    public ConversationService(IConversationRepository convoRepo)
    {
        _convoRepo = convoRepo;
    }

    public async Task<ConversationDto> CreateConversationAsync(CreateConversationDto createDto, int creatorId)
    {
        var conversation = new Conversation
        {
            Name = createDto.Name,
            CreatedAt = DateTime.UtcNow
        };

        //Skaberen tilføjes til conversation
        var firstMember = new ConversationMember
        {
            UserId = creatorId,
            Conversation = conversation,
            JoinedAt = DateTime.UtcNow
        };
        conversation.UserList.Add(firstMember);


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
        if (conversation == null) return null;
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

    public async Task<IEnumerable<ConversationSummaryDto>> GetConversationByUserIdAsync(int userId)
    {
        var conversations = await _convoRepo.GetByUserIdAsync(userId);

        return conversations.Select(c => new ConversationSummaryDto
        {
            Id = c.ConversationId,
            Name = c.Name
        });
    }
}