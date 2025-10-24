using BackendAPI.Context;
using BackendAPI.Dtos;
using BackendAPI.Models;
using MessageService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BackendAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/messages")]
public class MessageController : ControllerBase
{
    private readonly MyDBContext _db;
    private readonly IMessageService _messages;

    public MessageController(MyDBContext db, IMessageService messages)
    {
        _db = db;
        _messages = messages;
    }

    // GET /api/messages/{conversationId}
    [HttpGet("{conversationId:int}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFromConversation(
        int conversationId, CancellationToken ct)
    {
        try
        {
            // 🔒 Get current user ID from JWT
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdString, out var currentUserId))
                return Unauthorized("Invalid user token.");

            // Ensure user is a member of this conversation
            bool isMember = await _db.ConversationMembers
                .AnyAsync(cm => cm.ConversationId == conversationId && cm.UserId == currentUserId, ct);

            if (!isMember)
                return Forbid();

            var result = await _messages.GetMessagesFromConversation(conversationId, ct);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST /api/messages
    [HttpPost("")]
    [ProducesResponseType(typeof(Message), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Message>> SendMessage([FromBody] SendMessageRequest req, CancellationToken ct)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        try
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdString, out var currentUserId))
                return Unauthorized("Invalid user token.");

            // Security: Ensure the user is part of the conversation
            var isMember = await _db.ConversationMembers
                .AnyAsync(cm => cm.ConversationId == req.ConversationId && cm.UserId == currentUserId, ct);

            if (!isMember)
                return Unauthorized("User is not a member of this conversation.");

            var created = await _messages.CreateMessage(req.ConversationId, currentUserId, req.Content, ct);

            return CreatedAtAction(
                nameof(GetMessagesFromConversation),
                new { conversationId = req.ConversationId },
                created);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // DELETE /api/messages/{messageId}
    [HttpDelete("{messageId:int}")]
    public async Task<IActionResult> DeleteMessage(int messageId, CancellationToken ct)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdString, out var currentUserId))
            return Unauthorized("Invalid user token.");

        var message = await _db.Messages.FindAsync(new object[] { messageId }, ct);
        if (message == null)
            return NotFound("Message not found.");

        // Security: Only the author can delete their message
        if (message.UserId != currentUserId)
            return Unauthorized("You can only delete your own messages.");

        _db.Messages.Remove(message);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    // PUT /api/messages/{messageId}
    [HttpPut("{messageId:int}")]
    public async Task<IActionResult> UpdateMessage(int messageId, [FromBody] string newContent, CancellationToken ct)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(userIdString, out var currentUserId))
            return Unauthorized("Invalid user token.");

        var message = await _db.Messages.FindAsync(new object[] { messageId }, ct);
        if (message == null)
            return NotFound("Message not found.");

        // Security: Only the author can edit their message
        if (message.UserId != currentUserId)
            return Unauthorized("You can only edit your own messages.");

        if (string.IsNullOrWhiteSpace(newContent))
            return BadRequest("Message content cannot be empty.");

        message.MessageContent = newContent.Trim();
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }
}
