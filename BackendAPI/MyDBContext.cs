using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Test;

namespace BackendAPI.Context;

public class MyDBContext : DbContext
{
    public MyDBContext(DbContextOptions<MyDBContext> options)
        : base(options) { }

    public DbSet<DbTest> Tests { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Chatroom> Chatrooms { get; set; }
    public DbSet<ChatroomMember> ChatroomMembers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<DbTest>().HasData(new DbTest { DbTestId = 1, testString = "Test!!!" });

        modelBuilder.Entity<ChatroomMember>().HasKey(cm => new { cm.UserId, cm.ChatroomId });

        modelBuilder
            .Entity<ChatroomMember>()
            .HasOne(cm => cm.User)
            .WithMany(u => u.MemberIn)
            .HasForeignKey(cm => cm.UserId);

        modelBuilder
            .Entity<ChatroomMember>()
            .HasOne(cm => cm.Chatroom)
            .WithMany(c => c.UserList)
            .HasForeignKey(cm => cm.ChatroomId);

        modelBuilder
            .Entity<ChatroomMember>()
            .Property(cm => cm.JoinedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder
            .Entity<User>()
            .HasData(
                new User
                {
                    UserId = 1,
                    Username = "alice",
                    PassWord = "hashed_pw_1",
                    CreatedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                    ProfilePicture = "alice.png",
                    Email = "alice@example.com",
                },
                new User
                {
                    UserId = 2,
                    Username = "bob",
                    PassWord = "hashed_pw_2",
                    CreatedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                    ProfilePicture = "bob.png",
                    Email = "bob@example.com",
                }
            );

        modelBuilder
            .Entity<Chatroom>()
            .HasData(
                new Chatroom
                {
                    ChatroomId = 1,
                    Name = "General",
                    CreatedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                },
                new Chatroom
                {
                    ChatroomId = 2,
                    Name = "Tech Talk",
                    CreatedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                }
            );

        modelBuilder
            .Entity<ChatroomMember>()
            .HasData(
                new ChatroomMember
                {
                    UserId = 1,
                    ChatroomId = 1,
                    JoinedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                },
                new ChatroomMember
                {
                    UserId = 2,
                    ChatroomId = 1,
                    JoinedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                },
                new ChatroomMember
                {
                    UserId = 2,
                    ChatroomId = 2,
                    JoinedAt = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                }
            );

        modelBuilder
            .Entity<Message>()
            .HasData(
                new Message
                {
                    MessageId = 1,
                    MessageContent = "Hello everyone!",
                    ChatroomId = 1,
                    UserId = 1,
                    TimeStamp = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                },
                new Message
                {
                    MessageId = 2,
                    MessageContent = "Hi Alice!",
                    ChatroomId = 1,
                    UserId = 2,
                    TimeStamp = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                },
                new Message
                {
                    MessageId = 3,
                    MessageContent = "Anyone tried .NET MAUI?",
                    ChatroomId = 2,
                    UserId = 2,
                    TimeStamp = new DateTime(2025, 9, 25, 14, 0, 0, DateTimeKind.Utc),
                }
            );
    }
}
