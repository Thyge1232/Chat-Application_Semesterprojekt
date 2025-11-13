using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using BackendAPI.Dtos;
using BackendAPI.Models;
using Xunit;
using System.Net;
using Microsoft.AspNetCore.Http;
using BackendApi.Tests.Integration;


namespace BackendAPI.Tests.Integration.Controllers;

public class AuthControllerTest : IClassFixture<TestDatabase>
{
    private readonly HttpClient _client;
    public AuthControllerTest(TestDatabase data)
    {
        _client = data.CreateClient();
    }

    [Fact]
    public async Task IntegrationTest_ValidCredentials_Exspected200()
    {
        var loginDto = new LoginDto { Username = "alice", Password = "alice12345678" };
        var response = await _client.PostAsJsonAsync("/api/auth/login", loginDto);
        response.EnsureSuccessStatusCode();

        var token = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"TOKEN: {token}");
        Console.WriteLine($"ValidCredentials login: {response}");
        Assert.False(string.IsNullOrEmpty(token));
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }


    [Fact]
    public async Task IntegrationTest_InvalidCredentials_Exspected401()
    {
        var loginDto = new LoginDto { Username = "alice", Password = "wrongpassword" };
        var response = await _client.PostAsJsonAsync("/api/auth/login", loginDto);

        Console.WriteLine($"InvalidCredentials login: {response}");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

}
