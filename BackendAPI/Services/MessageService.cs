using System;
using BackendAPI.Context;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace MessageService;

public interface IMessageService
{
    Task<IReadOnlyList<Message>> GetMessagesFromChatroom(int chatroomId, CancellationToken ct = default);
    Task<Message> CreateMessage(int chatroomId, int userId, string content, CancellationToken ct = default);
}

public sealed class MessageService(MyDBContext db) : IMessageService
{
    public async Task<IReadOnlyList<Message>> GetMessagesFromChatroom(int chatroomId, CancellationToken ct = default)
    {
        var exists = await db.Chatrooms.AsNoTracking().AnyAsync(c => c.ChatroomId == chatroomId, ct);
        if (!exists) return Array.Empty<Message>();

        return await db.Messages
            .AsNoTracking()
            .Where(m => m.ChatroomId == chatroomId)
            .OrderBy(m => m.TimeStamp)
            .Select(m => new Message
            {
                MessageId = m.MessageId,
                MessageContent = m.MessageContent,
                ChatroomId = m.ChatroomId,
                TimeStamp = m.TimeStamp,
                UserId = m.UserId
            })
            .ToListAsync(ct);
    }

    public async Task<Message> CreateMessage(int chatroomId, int userId, string content, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Message content cannot be empty.", nameof(content));

        // Validate user and room exist
        var userExists = await db.Users.AnyAsync(u => u.UserId == userId, ct);
        var roomExists = await db.Chatrooms.AnyAsync(r => r.ChatroomId == chatroomId, ct);
        if (!userExists || !roomExists)
            throw new InvalidOperationException("User or chatroom not found.");

        // Optional: enforce membership
        var isMember = await db.ChatroomMembers
            .AnyAsync(cm => cm.ChatroomId == chatroomId && cm.UserId == userId, ct);
        if (!isMember)
            throw new UnauthorizedAccessException("User is not a member of this chatroom.");

        var entity = new Message
        {
            ChatroomId = chatroomId,
            UserId = userId,
            MessageContent = content.Trim(),
            TimeStamp = DateTime.UtcNow
        };

        db.Messages.Add(entity);
        await db.SaveChangesAsync(ct);
        return entity; // now has MessageId
    }
}
