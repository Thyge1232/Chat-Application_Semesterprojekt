using System;
using BackendAPI.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace MessageService;
public interface IMessageService
{
    Task<IReadOnlyList<Message>> GetMessagesFromChatroom(int chatroomId, CancellationToken ct = default);
}

public sealed class MessageService(MyDBContext db) : IMessageService
{
    public async Task<IReadOnlyList<Message>> GetMessagesFromChatroom(int chatroomId, CancellationToken ct = default)
    {
        // Optional: Fail early if chatroom doesn't exist
        var exists = await db.Chatrooms.AsNoTracking()
                                       .AnyAsync(c => c.ChatroomId == chatroomId, ct);
        if (!exists) return Array.Empty<Message>();

        return await db.Messages
            .AsNoTracking()
            .Where(m => m.ChatroomId == chatroomId)
            .OrderBy(m => m.TimeStamp)               // chronological (oldest → newest)
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
}
