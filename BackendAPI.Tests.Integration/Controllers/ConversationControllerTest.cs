using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using BackendAPI.Dtos;
using BackendAPI.Models;
using Xunit;

namespace BackendApi.Tests.Integration.Controllers;

public class ConversationControllerTest : IClassFixture<TestDatabase>
{
    private readonly HttpClient _client;

    public ConversationControllerTest(TestDatabase database)
    {
        _client = database.CreateClient();
    }

    [Fact]
    public async Task IntegrationTest()
    {
        // Logging in and getting authenticated
        var loginResponse = await _client.PostAsJsonAsync(
            "/api/auth/login",
            new LoginDto { Username = "alice", Password = "alice12345678" }
        );
        var body = await loginResponse.Content.ReadAsStringAsync();

        loginResponse.EnsureSuccessStatusCode();
        var token = await loginResponse.Content.ReadAsStringAsync();

        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        // Get request
        var response = await _client.GetAsync("/api/conversations/2");
        Console.WriteLine($"TEST:{response}");
        response.EnsureSuccessStatusCode();

        var conversation = await response.Content.ReadFromJsonAsync<Conversation>();

        Assert.Equal("Social Hangout", conversation.Name);
        Assert.Equal("Green", conversation.ColorTheme);
    }
}
