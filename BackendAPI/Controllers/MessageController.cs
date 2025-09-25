using BackendAPI.Context;
using MessageService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test;
using BackendAPI.Models;

// A simple health check controller to verify that the API is running.
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


    //GetMessagesFromChatroom()
        // GET /messages/{chatroomId}
        [HttpGet("messages/{chatroomId:int}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFromChatroom(
            int chatroomId, CancellationToken ct)
        {
            try
            {
                var result = await _messages.GetMessagesFromChatroom(chatroomId, ct);
                return Ok(result); // [] if room has no messages or doesn't exist (by design)
            }
            catch (Exception Ex)
            {
                return StatusCode(500, $"Internal server error: {Ex.Message}");
            }
        }
    
}