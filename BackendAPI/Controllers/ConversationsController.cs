using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Context;
using Microsoft.AspNetCore.Mvc;
using BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;



[Authorize]
[ApiController]
[Route("api/conversations")]

public class ConversationController : ControllerBase
{
    private readonly IConversationService _conversationservice;

    public ConversationController(IConversationService conversationService)
    {
        _conversationservice = conversationService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateConversation([FromBody] CreateConversationDto createConversationsDto)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var userIdString = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Invalid user token.");
            }
            var newConversation = await _conversationservice.CreateConversationAsync(createConversationsDto, currentUserId);

            return CreatedAtAction(nameof(GetConversationById), new { id = newConversation.Id }, newConversation);
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
        var userIdString = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);

        // Vi kan ikke fortsætte uden et gyldigt ID
        if (!int.TryParse(userIdString, out var currentUserId))
        {
            // Dette burde teoretisk set aldrig ske, da [Authorize] beskytter metoden,
            // men det er god praksis at have et sikkerhedsnet.
            return Unauthorized("Invalid user token.");
        }
        var conversation = await _conversationservice.GetConversationByIdAsync(id);

        if (conversation == null)
        {
            return NotFound(); 
        }

        var isUserMember = conversation.Members.Any(member => member.Id == currentUserId);

        if (!isUserMember)
        {
            return Forbid();
        }

        return Ok(conversation); 
    }
}





