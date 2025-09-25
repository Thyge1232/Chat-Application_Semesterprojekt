using BackendAPI.Context;
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

    // GET /messages/{chatroomId}
    [HttpGet("messages/{chatroomId:int}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFromChatroom(
        int chatroomId, CancellationToken ct)
    {
        try
        {
            var result = await _messages.GetMessagesFromChatroom(chatroomId, ct);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST /messages  (body is the Message model)
    [HttpPost("messages")]
    [ProducesResponseType(typeof(Message), StatusCodes.Status201Created)]
    public async Task<ActionResult<Message>> SendMessage([FromBody] Message message, CancellationToken ct)
    {
        try
        {
            var created = await _messages.CreateMessage(message, ct);
            return CreatedAtAction(nameof(GetMessagesFromChatroom),
                new { chatroomId = created.ChatroomId }, created);
        }
        catch (Exception ex) // includes FK violations, etc.
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
