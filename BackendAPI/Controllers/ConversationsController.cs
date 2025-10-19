using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Context;
using Microsoft.AspNetCore.Mvc;
using BackendAPI.Services.Interfaces;

[ApiController]
[Route("api/conversations")]

public class ConversationController : ControllerBase
{
    private readonly IConversationService _conversationservice;

    public ConversationController(IConversationService conversationService)
    {
        _conversationservice = conversationService;
    }
    [HttpPost]
    public async Task<IActionResult> CreateConversation([FromBody] CreateConversationDto createConversationsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var newConversation = await _conversationservice.CreateConversationAsync(createConversationsDto);

            return CreatedAtAction(nameof(GetConversationById), new { id = newConversation.Id }, newConversation);
        }

        catch (ArgumentException ex)
        {
            return Conflict(new { message = ex.Message });
        }



    }
        [HttpGet("{id}")]
    public async Task<IActionResult> GetConversationById(int id)
    {
        var conversation = await _conversationservice.GetConversationByIdAsync(id);

        if (conversation == null)
        {
            return NotFound(); 
        }

        return Ok(conversation); 
    }
}





