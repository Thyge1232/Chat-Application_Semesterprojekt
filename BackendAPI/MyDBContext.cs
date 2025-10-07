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
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<ConversationMember> ConversationMembers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<DbTest>().HasData(new DbTest { DbTestId = 1, testString = "Test!!!" });

        modelBuilder.Entity<ConversationMember>().HasKey(cm => new { cm.UserId, cm.ConversationId });

        modelBuilder.Entity<User>() // Unik Username
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>() // Unik Email
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder
            .Entity<ConversationMember>()
            .HasOne(cm => cm.User)
            .WithMany(u => u.MemberIn)
            .HasForeignKey(cm => cm.UserId);

        modelBuilder
            .Entity<ConversationMember>()
            .HasOne(cm => cm.Conversation)
            .WithMany(c => c.UserList)
            .HasForeignKey(cm => cm.ConversationId);

        modelBuilder.Entity<ConversationMember>().Property(cm => cm.JoinedAt);

        modelBuilder
            .Entity<User>()
            .HasData(
                new User
                {
                    UserId = 1,
                    Username = "alice",
                    Password = "$2a$11$DHb2SBahkIIXSIv1hf.GX.fP1BjCtOwTJJ9Boyqi3PrjEqCZRQs66", // hashed version of "alice123"
                    CreatedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0),DateTimeKind.Utc),
                    ProfilePicture = "alice.png",
                    Email = "alice@example.com",
                },
                new User
                {
                    UserId = 2,
                    Username = "bob",
                    Password = "hashed_pw_2",
                    CreatedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                    ProfilePicture = "bob.png",
                    Email = "bob@example.com",
                }
            );

        modelBuilder
            .Entity<Conversation>()
            .HasData(
                new Conversation
                {
                    ConversationId = 1,
                    Name = "General",
                    CreatedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                },
                new Conversation
                {
                    ConversationId = 2,
                    Name = "Tech Talk",
                    CreatedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                }
            );

        modelBuilder
            .Entity<ConversationMember>()
            .HasData(
                new ConversationMember
                {
                    UserId = 1,
                    ConversationId = 1,
                    JoinedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                },
                new ConversationMember
                {
                    UserId = 2,
                    ConversationId = 1,
                    JoinedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                },
                new ConversationMember
                {
                    UserId = 2,
                    ConversationId = 2,
                    JoinedAt = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                }
            );

        modelBuilder
            .Entity<Message>()
            .HasData(
                new Message
                {
                    MessageId = 1,
                    MessageContent = "Hello everyone!",
                    ConversationId = 1,
                    UserId = 1,
                    TimeStamp = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                },
                new Message
                {
                    MessageId = 2,
                    MessageContent = "Hi Alice!",
                    ConversationId = 1,
                    UserId = 2,
                    TimeStamp = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                },
                new Message
                {
                    MessageId = 3,
                    MessageContent = "Anyone tried .NET MAUI?",
                    ConversationId = 2,
                    UserId = 2,
                    TimeStamp = DateTime.SpecifyKind(new DateTime(2025, 9, 25, 14, 0, 0), DateTimeKind.Utc),
                }
            );
        modelBuilder
            .Entity<User>()
            .Property(u => u.CreatedAt)
            .HasColumnType("timestamp with time zone");

        modelBuilder
            .Entity<Conversation>()
            .Property(c => c.CreatedAt)
            .HasColumnType("timestamp with time zone");

        modelBuilder
            .Entity<ConversationMember>()
            .Property(cm => cm.JoinedAt)
            .HasColumnType("timestamp with time zone");

        modelBuilder
            .Entity<Message>()
            .Property(m => m.TimeStamp)
            .HasColumnType("timestamp with time zone");
    }
}
