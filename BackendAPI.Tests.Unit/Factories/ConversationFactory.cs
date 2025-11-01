namespace BackendAPI.Tests.Unit.Factories;
public static class ConversationFactory
{
    public static Conversation CreateConversation(
        int conversationId = 1,
        string name = "Test Conversation",
        List<User>? members = null) 
    {
        var conversation = new Conversation
        {
            ConversationId = conversationId,
            Name = name,
            CreatedAt = System.DateTime.UtcNow,
            UserList = new List<ConversationMember>()
        };

        if (members != null)
        {
            foreach (var user in members)
            {
                conversation.UserList.Add(new ConversationMember { UserId = user.UserId, User = user });
            }
        }
        return conversation;
    }

    public static CreateConversationDto CreateConversationDto(string name = "New Test Conversation")
    {
        return new CreateConversationDto { Name = name };
    }
}