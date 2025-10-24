using BackendAPI.Dtos;

namespace BackendAPI.Services.Interfaces;

public interface IConversationService
{
    Task<ConversationDto> CreateConversationAsync(CreateConversationDto createDto, int creatorId);
    Task<ConversationWithMembersDto?> GetConversationByIdAsync(int conversationId);
    Task<IEnumerable<ConversationSummaryDto>> GetConversationByUserIdAsync(int userId);
}