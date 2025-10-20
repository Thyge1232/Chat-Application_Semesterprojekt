using BackendAPI.Dtos;
using System.Threading.Tasks;

namespace BackendAPI.Services.Interfaces
{
    public interface IConversationService
    {
        Task<ConversationDto> CreateConversationAsync(CreateConversationDto createDto, int creatorId);
        Task<ConversationWithMembersDto?> GetConversationByIdAsync(int conversationId);
    }
}