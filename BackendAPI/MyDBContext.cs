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
            .HasDefaultValueSql("CURRENT_TIMESTAMP"); // Optional default
    }
}
