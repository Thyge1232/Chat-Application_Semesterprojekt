using System.Security.Claims;
using BackendAPI.Dtos;
using BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/conversations")]
public class ConversationController : ControllerBase
{
    private readonly IConversationService _conversationService;

    public ConversationController(IConversationService conversationService)
    {
        _conversationService = conversationService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateConversation(
        [FromBody] CreateConversationDto createConversationsDto
    )
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdString, out var currentUserId))
                return Unauthorized("Invalid user token.");
            var newConversation = await _conversationService.CreateConversationAsync(
                createConversationsDto,
                currentUserId
            );

            return CreatedAtAction(
                nameof(GetConversationById),
                new { id = newConversation.Id },
                newConversation
            );
        }
        catch (ArgumentException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetConversationById(int id)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var currentUserId))
            return Unauthorized("Invalid user token.");
        var conversation = await _conversationService.GetConversationByIdAsync(id);

        if (conversation == null)
            return NotFound();

        var isUserMember = conversation.Members.Any(member => member.Id == currentUserId);

        if (!isUserMember)
            return Forbid();

        return Ok(conversation);
    }

    [Authorize]
    [HttpPost("{conversationId}/users/{userId}")]
    public async Task<IActionResult> AddUserByIdToConversationById(int conversationId, int userId)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var currentUserId))
            return Unauthorized("Invalid user token.");

        var conversation = await _conversationService.GetConversationByIdAsync(conversationId);
        if (conversation == null)
        {
            NotFound("Conversation doesn't exist");
        }
        else if (conversation.Members.FirstOrDefault(u => u.Id == currentUserId) != null)
        {
            var result = await _conversationService.AddUserByIdToConversationByIdAsync(
                conversationId,
                userId
            );
            if (result == null)
            {
                return BadRequest("Request failed.");
            }

            return Ok(result);
        }
        return BadRequest("You're not a member of this conversation.");
    }

    [Authorize]
    [HttpDelete("{conversationId}/users/{userId}")]
    public async Task<IActionResult> RemoveUserByIdFromConversationById(
        int conversationId,
        int userId
    )
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdString, out var currentUserId))
            return Unauthorized("Invalid user token.");

        var conversation = await _conversationService.GetConversationByIdAsync(conversationId);
        if (conversation == null)
        {
            NotFound("Conversation doesn't exist");
        }
        else if (conversation.Members.FirstOrDefault(u => u.Id == currentUserId) != null)
        {
            var result = await _conversationService.RemoveUserByIdFromConversationByIdAsync(
                conversationId,
                userId
            );
            if (!result)
            {
                return BadRequest("Request failed.");
            }

            return Ok("Succesfully removed user.");
        }
        return BadRequest("You're not a member of this conversation.");
    }
}
