using BackendAPI.Dtos;

namespace BackendAPI.Services.Interfaces;

public interface IConversationService
{
    Task<ConversationDto> CreateConversationAsync(CreateConversationDto createDto, int creatorId);
    Task<ConversationWithMembersDto?> GetConversationByIdAsync(int conversationId);
    Task<ConversationWithMembersDto?> AddUserByIdToConversationByIdAsync(
        int conversationId,
        int userId
    );
    Task<IEnumerable<ConversationSummaryDto>> GetConversationByUserIdAsync(int userId);

    Task<bool> RemoveThisUserByIdFromConversationByIdAsync(int conversationId, int userid);
    Task UpdateColorThemeAsync(int conversationId, int userId, string colorTheme);
}
