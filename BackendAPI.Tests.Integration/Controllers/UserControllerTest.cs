using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendApi.Tests.Integration;
using FluentAssertions;
using Xunit;

namespace BackendAPI.Tests.Integration.Controllers;

public class UsersControllerTest : IClassFixture<TestDatabase>
{
    private readonly HttpClient _client;
    private readonly TestDatabase _database;

    public UsersControllerTest(TestDatabase database)
    {
        _client = database.CreateClient();
        _database = database; 
    }

    [Fact]
    public async Task RegisterUser_WithUniqueUsername_ShouldReturnCreated()
    {
        // Arrange
        var newUserDto = new CreateUserDto
        {
            Username = "bob_the_builder",
            Email = "bob@builder.com",
            Password = "wecanfixit123"
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/users", newUserDto);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        
        var createdUser = await response.Content.ReadFromJsonAsync<UserDto>();
        createdUser.Should().NotBeNull();
        createdUser.Username.Should().Be(newUserDto.Username);
    }
}