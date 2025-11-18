using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Context;
using BackendAPI.Models;
using MessageService;
using BackendAPI.Tests.Unit.Factories;

namespace BackendAPI.Tests.Unit.Services
{
    public class MessageServiceTests
    {
        private readonly MyDBContext _db;
        private readonly IMessageService _uut;

        public MessageServiceTests()
        {
            var options = new DbContextOptionsBuilder<MyDBContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _db = new MyDBContext(options);
            _uut = new MessageService.MessageService(_db);
        }

        // -------------------------------------------------------
        // GET MESSAGES TESTS
        // -------------------------------------------------------

        [Fact]
        public async Task GetMessagesFromConversation_WhenConversationDoesNotExist_ShouldReturnEmptyList()
        {
            // Act
            var result = await _uut.GetMessagesFromConversation(999);

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetMessagesFromConversation_WhenConversationExists_ShouldReturnOrderedMessages()
        {
            // Arrange
            var conversation = ConversationFactory.CreateConversation(1, "Test");
            _db.Conversations.Add(conversation);

            // Create a reversed (unsorted) list first → ensures sorting is tested
            var messages = MessageFactory.CreateMessageList(conversationId: 1, count: 2);
            messages.Reverse();

            _db.Messages.AddRange(messages);
            await _db.SaveChangesAsync();

            // Act
            var result = await _uut.GetMessagesFromConversation(1);

            // Assert
            Assert.Equal(2, result.Count);
            Assert.Equal("Message 1", result[0].MessageContent);
            Assert.Equal("Message 2", result[1].MessageContent);
        }

        // -------------------------------------------------------
        // CREATE MESSAGE TESTS
        // -------------------------------------------------------

        [Fact]
        public async Task CreateMessage_WhenContentIsEmpty_ShouldThrowArgumentException()
        {
            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() =>
                _uut.CreateMessage(1, 1, "  "));
        }

        [Fact]
        public async Task CreateMessage_WhenUserOrConversationDoesNotExist_ShouldThrowInvalidOperationException()
        {
            // Arrange: only user exists
            _db.Users.Add(UserFactory.CreateUser(1, "Alice"));
            await _db.SaveChangesAsync();

            // Act + Assert
            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                _uut.CreateMessage(conversationId: 2, userId: 1, content: "Test"));
        }

        [Fact]
        public async Task CreateMessage_WhenUserIsNotMember_ShouldStillCreateMessage_BecauseMembershipCheckIsDisabled()
        {
            // Arrange
            _db.Users.Add(UserFactory.CreateUser(1, "Alice"));
            _db.Conversations.Add(ConversationFactory.CreateConversation(1, "Test"));
            await _db.SaveChangesAsync();

            // Act
            var result = await _uut.CreateMessage(1, 1, "Hello world");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Hello world", result.MessageContent);
            Assert.True(result.MessageId > 0);
        }

        [Fact]
        public async Task CreateMessage_WhenValid_ShouldSaveToDatabase()
        {
            // Arrange
            var user = UserFactory.CreateUser(5, "Bob");
            var conversation = ConversationFactory.CreateConversation(10, "Chat");

            _db.Users.Add(user);
            _db.Conversations.Add(conversation);
            _db.ConversationMembers.Add(new ConversationMember { ConversationId = 10, UserId = 5 });
            await _db.SaveChangesAsync();

            // Act
            var message = await _uut.CreateMessage(10, 5, "Hi");

            // Assert
            Assert.NotNull(message);
            Assert.Equal(10, message.ConversationId);
            Assert.Equal(5, message.UserId);
            Assert.Equal("Hi", message.MessageContent);

            var saved = await _db.Messages.FirstOrDefaultAsync(m => m.MessageId == message.MessageId);
            Assert.NotNull(saved);
        }

        [Fact]
        public async Task CreateMessage_ShouldTrimWhitespace()
        {
            // Arrange
            _db.Users.Add(UserFactory.CreateUser(1, "Alice"));
            _db.Conversations.Add(ConversationFactory.CreateConversation(1, "Test"));
            _db.ConversationMembers.Add(new ConversationMember { ConversationId = 1, UserId = 1 });
            await _db.SaveChangesAsync();

            // Act
            var result = await _uut.CreateMessage(1, 1, "   Hello World   ");

            // Assert
            Assert.Equal("Hello World", result.MessageContent);
        }
    }
}
