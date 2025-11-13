using BackendAPI.Context;
using BackendAPI.Models;
using BackendAPI.Services.Implementations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace BackendApi.Tests.Integration;

public class TestDatabase : WebApplicationFactory<Program>
{
    private SqliteConnection _connection; // keep one connection alive

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var hasher = new PasswordHasher();

        builder.UseEnvironment("Testing");

        // inject test JWT secret
        builder.ConfigureAppConfiguration(
            (context, config) =>
            {
                var dict = new Dictionary<string, string>
                {
                    { "Jwt:Secret", "this_is_a_super_secret_key_1234567890" },
                };
                config.AddInMemoryCollection(dict);
            }
        );

        builder.ConfigureServices(services =>
        {
            // create and hold a single open connection
            if (_connection == null)
            {
                _connection = new SqliteConnection("DataSource=:memory:");
                _connection.Open();
            }

            // replace DbContext to use that connection
            services.Replace(
                ServiceDescriptor.Scoped<MyDBContext>(sp =>
                {
                    var options = new DbContextOptionsBuilder<MyDBContext>()
                        .UseSqlite(_connection)
                        .Options;
                    return new MyDBContext(options);
                })
            );

            // build provider and seed
            var sp = services.BuildServiceProvider();
            using var scope = sp.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<MyDBContext>();

            // ensure schema exists
            db.Database.EnsureCreated();

            // clear any existing data
            db.Users.RemoveRange(db.Users);
            db.Conversations.RemoveRange(db.Conversations);
            db.ConversationMembers.RemoveRange(db.ConversationMembers);
            db.Messages.RemoveRange(db.Messages);
            db.SaveChanges();

            // seed users with hashed passwords
            var user1 = new User
            {
                UserId = 1,
                Username = "alice",
                Password = hasher.HashPassword("alice12345678"), // plain password is alice123
                CreatedAt = DateTime.UtcNow.AddDays(-10),
                ProfilePicture = "/images/profiles/alice.png",
                Email = "alice@example.com",
            };
            var user2 = new User
            {
                UserId = 2,
                Username = "bob",
                Password = hasher.HashPassword("bob12345678"), // plain password is bob123
                CreatedAt = DateTime.UtcNow.AddDays(-5),
                ProfilePicture = "/images/profiles/bob.png",
                Email = "bob@example.com",
            };
            db.Users.AddRange(user1, user2);

            var conv1 = new Conversation
            {
                ConversationId = 1,
                Name = "Project Chat",
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                ColorTheme = "Blue",
            };
            var conv2 = new Conversation
            {
                ConversationId = 2,
                Name = "Social Hangout",
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                ColorTheme = "Green",
            };
            db.Conversations.AddRange(conv1, conv2);
            db.SaveChanges();

            db.ConversationMembers.AddRange(
                new ConversationMember
                {
                    UserId = user1.UserId,
                    ConversationId = conv1.ConversationId,
                    JoinedAt = DateTime.UtcNow.AddDays(-7),
                },
                new ConversationMember
                {
                    UserId = user2.UserId,
                    ConversationId = conv1.ConversationId,
                    JoinedAt = DateTime.UtcNow.AddDays(-6),
                },
                new ConversationMember
                {
                    UserId = user1.UserId,
                    ConversationId = conv2.ConversationId,
                    JoinedAt = DateTime.UtcNow.AddDays(-3),
                },
                new ConversationMember
                {
                    UserId = user2.UserId,
                    ConversationId = conv2.ConversationId,
                    JoinedAt = DateTime.UtcNow.AddDays(-2),
                }
            );

            db.Messages.AddRange(
                new Message
                {
                    MessageContent = "Hey Bob, did you finish the report?",
                    ConversationId = conv1.ConversationId,
                    UserId = user1.UserId,
                    TimeStamp = DateTime.UtcNow.AddDays(-6),
                },
                new Message
                {
                    MessageContent = "Yes Alice, I sent it yesterday.",
                    ConversationId = conv1.ConversationId,
                    UserId = user2.UserId,
                    TimeStamp = DateTime.UtcNow.AddDays(-5),
                },
                new Message
                {
                    MessageContent = "Anyone up for coffee later?",
                    ConversationId = conv2.ConversationId,
                    UserId = user1.UserId,
                    TimeStamp = DateTime.UtcNow.AddDays(-2),
                },
                new Message
                {
                    MessageContent = "Sure, let’s meet at 3pm.",
                    ConversationId = conv2.ConversationId,
                    UserId = user2.UserId,
                    TimeStamp = DateTime.UtcNow.AddDays(-2).AddHours(1),
                }
            );

            db.SaveChanges();
        });
    }
}
