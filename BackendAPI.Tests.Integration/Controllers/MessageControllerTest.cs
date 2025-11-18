using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BackendAPI.Dtos;
using BackendAPI.Models;
using Xunit;

namespace BackendApi.Tests.Integration.Controllers
{
    public class MessageControllerTest : IClassFixture<TestDatabase>
    {
        private readonly HttpClient _client;

        public MessageControllerTest(TestDatabase database)
        {
            _client = database.CreateClient();
        }

        // ---------------------------------------------------------------
        // Helper: Authenticate as "alice"
        // ---------------------------------------------------------------
        private async Task AuthenticateAsAlice()
        {
            var loginResponse = await _client.PostAsJsonAsync(
                "/api/auth/login",
                new LoginDto { Username = "alice", Password = "alice12345678" }
            );

            loginResponse.EnsureSuccessStatusCode();

            var token = await loginResponse.Content.ReadAsStringAsync();
            _client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        // ---------------------------------------------------------------
        // GET /api/messages/{conversationId}
        // ---------------------------------------------------------------
        [Fact]
        public async Task GetMessages_WhenUserIsMember_ShouldReturnMessages()
        {
            await AuthenticateAsAlice();

            // Alice is a member of conversation 2 ("Social Hangout")
            var response = await _client.GetAsync("/api/messages/2");

            response.EnsureSuccessStatusCode();

            var messages = await response.Content.ReadFromJsonAsync<List<Message>>();

            Assert.NotNull(messages);
            Assert.True(messages.Count >= 2);
            Assert.Contains(messages, m => m.MessageContent.Contains("coffee"));
        }

        [Fact]
        public async Task GetMessages_WhenUserIsNotMember_ShouldReturnForbid()
        {
            await AuthenticateAsAlice();

            // Alice is NOT a member of conversation 999
            var response = await _client.GetAsync("/api/messages/999");

            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        // ---------------------------------------------------------------
        // POST /api/messages
        // ---------------------------------------------------------------
        [Fact]
        public async Task SendMessage_WhenValid_ShouldCreateMessage()
        {
            await AuthenticateAsAlice();

            var request = new SendMessageRequest
            {
                ConversationId = 1, // Alice is a member of conversation 1
                Content = "Integration Test Message"
            };

            var response = await _client.PostAsJsonAsync("/api/messages", request);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            var createdMessage = await response.Content.ReadFromJsonAsync<Message>();

            Assert.NotNull(createdMessage);
            Assert.Equal(request.Content, createdMessage.MessageContent);
            Assert.Equal(request.ConversationId, createdMessage.ConversationId);
            Assert.Equal(1, createdMessage.UserId); // alice = ID 1
        }

        [Fact]
        public async Task SendMessage_WhenUserNotMember_ShouldReturnUnauthorized()
        {
            await AuthenticateAsAlice();

            var request = new SendMessageRequest
            {
                ConversationId = 999, // Alice is NOT a member
                Content = "Hello"
            };

            var response = await _client.PostAsJsonAsync("/api/messages", request);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task SendMessage_WhenEmptyContent_ShouldReturnBadRequest()
        {
            await AuthenticateAsAlice();

            var request = new SendMessageRequest
            {
                ConversationId = 1,
                Content = "   " // empty
            };

            var response = await _client.PostAsJsonAsync("/api/messages", request);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        // ---------------------------------------------------------------
        // DELETE /api/messages/{messageId}
        // ---------------------------------------------------------------
        [Fact]
        public async Task DeleteMessage_WhenUserIsAuthor_ShouldReturnNoContent()
        {
            await AuthenticateAsAlice();

            // Create message as Alice first
            var created = await _client.PostAsJsonAsync("/api/messages",
                new SendMessageRequest
                {
                    ConversationId = 1,
                    Content = "Delete me"
                });

            var msg = await created.Content.ReadFromJsonAsync<Message>();
            Assert.NotNull(msg);

            // Delete it
            var response = await _client.DeleteAsync($"/api/messages/{msg.MessageId}");

            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMessage_WhenUserIsNotAuthor_ShouldReturnUnauthorized()
        {
            await AuthenticateAsAlice();

            // message seeded in TestDatabase, authored by Bob (userId 2)
            // message in conversation 1
            var response = await _client.DeleteAsync("/api/messages/2");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        // ---------------------------------------------------------------
        // PUT /api/messages/{messageId}
        // ---------------------------------------------------------------
        [Fact]
        public async Task UpdateMessage_WhenValid_ShouldReturnNoContent()
        {
            await AuthenticateAsAlice();

            // First create a message
            var created = await _client.PostAsJsonAsync("/api/messages",
                new SendMessageRequest
                {
                    ConversationId = 1,
                    Content = "Old content"
                });

            var msg = await created.Content.ReadFromJsonAsync<Message>();

            // Now update it
            var updatePayload = new StringContent(
                "\"New content\"", Encoding.UTF8, "application/json");

            var response = await _client.PutAsync(
                $"/api/messages/{msg!.MessageId}", updatePayload);

            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Fact]
        public async Task UpdateMessage_WhenUserIsNotAuthor_ShouldReturnUnauthorized()
        {
            await AuthenticateAsAlice();

            // Message from TestDatabase where Bob is the author
            // MessageId = 2 is authored by userId = 2
            var updatePayload = new StringContent(
                "\"Hack attempt\"", Encoding.UTF8, "application/json");

            var response = await _client.PutAsync("/api/messages/2", updatePayload);

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task UpdateMessage_WhenMessageDoesNotExist_ShouldReturnNotFound()
        {
            await AuthenticateAsAlice();

            var updatePayload = new StringContent(
                "\"Hi\"", Encoding.UTF8, "application/json");

            var response = await _client.PutAsync("/api/messages/9999", updatePayload);

            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
