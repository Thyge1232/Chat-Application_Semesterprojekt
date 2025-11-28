using System;
using System.Collections.Generic;
using BackendAPI.Models;

namespace BackendAPI.Tests.Unit.Factories
{
    public static class MessageFactory
    {
        public static Message CreateMessage(
            int messageId = 1,
            int conversationId = 1,
            int userId = 1,
            string content = "Hello Test Message",
            DateTime? timestamp = null)
        {
            return new Message
            {
                MessageId = messageId,
                ConversationId = conversationId,
                UserId = userId,
                MessageContent = content,
                TimeStamp = timestamp ?? DateTime.UtcNow
            };
        }

        public static List<Message> CreateMessageList(
            int conversationId = 1,
            int count = 3)
        {
            var messages = new List<Message>();

            for (int i = 0; i < count; i++)
            {
                messages.Add(CreateMessage(
                    messageId: i + 1,
                    conversationId: conversationId,
                    userId: 1,
                    content: $"Message {i + 1}",
                    timestamp: DateTime.UtcNow.AddMinutes(i)
                ));
            }

            return messages;
        }

        public static Message CreateValidMessageForCreation(
            int conversationId = 1,
            int userId = 1,
            string content = "New Test Message")
        {
            return new Message
            {
                ConversationId = conversationId,
                UserId = userId,
                MessageContent = content,
                TimeStamp = DateTime.UtcNow
            };
        }
    }
}
