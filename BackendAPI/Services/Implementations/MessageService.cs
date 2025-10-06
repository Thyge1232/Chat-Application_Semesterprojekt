using System;
using BackendAPI.Context;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace MessageService;

public interface IMessageService
{
    Task<IReadOnlyList<Message>> GetMessagesFromConversation(int conversationId, CancellationToken ct = default);
    Task<Message> CreateMessage(int conversationId, int userId, string content, CancellationToken ct = default);
}

public sealed class MessageService(MyDBContext db) : IMessageService
{
    public async Task<IReadOnlyList<Message>> GetMessagesFromConversation(int conversationId, CancellationToken ct = default)
    {
        var exists = await db.Conversations.AsNoTracking().AnyAsync(c => c.ConversationId == conversationId, ct);
        if (!exists) return Array.Empty<Message>();

        return await db.Messages
            .AsNoTracking()
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.TimeStamp)
            .Select(m => new Message
            {
                MessageId = m.MessageId,
                MessageContent = m.MessageContent,
                ConversationId = m.ConversationId,
                TimeStamp = m.TimeStamp,
                UserId = m.UserId
            })
            .ToListAsync(ct);
    }

    public async Task<Message> CreateMessage(int conversationId, int userId, string content, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Message content cannot be empty.", nameof(content));

        // Validate user and room exist
        var userExists = await db.Users.AnyAsync(u => u.UserId == userId, ct);
        var roomExists = await db.Conversations.AnyAsync(r => r.ConversationId == conversationId, ct);
        if (!userExists || !roomExists)
            throw new InvalidOperationException("User or conversation not found.");

        // Optional: enforce membership
        var isMember = await db.ConversationMembers
            .AnyAsync(cm => cm.ConversationId == conversationId && cm.UserId == userId, ct);
        //if (!isMember)
            //throw new UnauthorizedAccessException("User is not a member of this conversation.");

        var entity = new Message
        {
            ConversationId = conversationId,
            UserId = userId,
            MessageContent = content.Trim(),
            TimeStamp = DateTime.UtcNow
        };

        db.Messages.Add(entity);
        await db.SaveChangesAsync(ct);
        return entity; // now has MessageId
    }
}
