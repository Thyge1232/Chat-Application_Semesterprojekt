using BackendAPI.Context;
using BackendAPI.Dtos;
using BackendAPI.Models;
using MessageService;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers;

[ApiController]
public class MessageController : ControllerBase
{
    private readonly MyDBContext _db;
    private readonly IMessageService _messages;

    public MessageController(MyDBContext db, IMessageService messages)
    {
        _db = db;
        _messages = messages;
    }

    // GET /messages/{conversationId}
    [HttpGet("messages/{conversationId:int}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFromConversation(
        int conversationId, CancellationToken ct)
    {
        try
        {
            var result = await _messages.GetMessagesFromConversation(conversationId, ct);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST /messages
    [HttpPost("messages")]
    [ProducesResponseType(typeof(Message), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Message>> SendMessage([FromBody] SendMessageRequest req, CancellationToken ct)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        try
        {
            var created = await _messages.CreateMessage(req.ConversationId, req.UserId, req.Content, ct);

            // 201 with a Location that lists the room's messages
            return CreatedAtAction(
                nameof(GetMessagesFromConversation),
                new { conversationId = req.ConversationId },
                created);
        }
        catch (UnauthorizedAccessException ex)
        {
            return StatusCode(StatusCodes.Status401Unauthorized, ex.Message);
        }
        catch (InvalidOperationException ex) // user/room missing
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
}
