using System.Security.Claims;
using BackendAPI.Dtos;
using BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers;

[ApiController]
[Route("api/users")] // api/users
public class UsersController : ControllerBase
{
    private readonly IConversationService _conversationService;

    private readonly IUserService _userService;


    public UsersController(IUserService userService, IConversationService conversationService)
    {
        _userService = userService;
        _conversationService = conversationService;
    }

    // POST /api/users
    [HttpPost]
    public async Task<ActionResult<UserDto>> RegisterUser([FromBody] CreateUserDto createUserDto)
    {
        try
        {
            var newUser = await _userService.RegisterUserAsync(createUserDto);


            // Ved succes: Return HTTP 201 Created.
            // Desuden retuneres den nye resource i location-headeren, og den nye bruger(UserDto) i bodyen
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }
        catch (ArgumentException ex) // Brugernavn optaget. 
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception) //Andre fejl
        {
            return StatusCode(500, new { message = "An internal server error occurred." });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);

        if (user == null) return NotFound();

        return Ok(user);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [Authorize]
    [HttpGet("me/conversations")]
    public async Task<ActionResult<IEnumerable<ConversationSummaryDto>>> GetMyConversations()
    {
        var loggedInUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(loggedInUserIdString, out var currentUserId)) return Unauthorized("Invalid user token.");

        var conversations = await _conversationService.GetConversationByUserIdAsync(currentUserId);
        return Ok(conversations);
    }

    

}