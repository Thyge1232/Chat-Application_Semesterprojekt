namespace BackendAPI.Tests.Unit.Services;

public class ConversationTest
{
    private readonly Mock<IConversationRepository> _mockConvoRepo;
    private readonly IConversationService _uut;

    public ConversationTest()
    {
        _mockConvoRepo = new Mock<IConversationRepository>();
        _uut = new ConversationService(_mockConvoRepo.Object);
    }

    [Fact]
    public async Task CreateConversationAsync_WithValidData_ShouldCreateAndReturnConversationDto()
    {
        //Arrange
        var createConversationDto = ConversationFactory.CreateConversationDto(
            "New Test Conversation"
        );
        var creatorId = 1;

        //Act
        var result = await _uut.CreateConversationAsync(createConversationDto, creatorId);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(createConversationDto.Name, result.Name);

        _mockConvoRepo.Verify( //Blev repo-metoderne kaldt korrekt?
            repo =>
                repo.AddAsync(
                    It.Is<Conversation>(c =>
                        c.Name == createConversationDto.Name && //Check om conversation blev oprettet med det rigtige navn
                        c.UserList.Count == 1 && //Blev skaberen tilføjet som medlem af samtalen?
                        c.UserList.First().UserId == creatorId
                    )
                ),

                Times.Once //Kaldes kun én gang
        );

        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Once); // Blev save kaldt?
    }

    [Fact]
    public async Task GetConversationByIdAsync_WhenConversationExists_ShouldReturnConversationWithMembersDto()
    {
        // Arrange
        var targetConversationId = 1;

        var testUser = UserFactory.CreateUser(id: 1, username: "alice");

        var fakeConversation = ConversationFactory.CreateConversation(
            conversationId: targetConversationId,
            name: "Fake Conversation Name",
            members: new List<User> { testUser }
        );

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(targetConversationId)).ReturnsAsync(fakeConversation);

        //Act
        var result = await _uut.GetConversationByIdAsync(targetConversationId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(fakeConversation.Name, result.Name);
        Assert.Equal(fakeConversation.ConversationId, result.Id);
        Assert.Single(result.Members); // Der er et medlem
        Assert.Equal(testUser.Username, result.Members.First().Username);
    }

    [Fact]
    public async Task GetConversationByIdAsync_WhenConversationDoesNotExist_ShouldReturnNull()
    {
        // Arrange
        var nonExistingId = 69;

        _mockConvoRepo
            .Setup(repo => repo.GetByIdWithMembersAsync(nonExistingId))
            .ReturnsAsync(null as Conversation);

        // Act
        var result = await _uut.GetConversationByIdAsync(nonExistingId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task RemoveThisUserByIdFromConversationByIdAsync_WhenUserIsRemovedAndConversationIsNotEmpty_ShouldReturnTrue()
    {
        var conversationId = 1;
        var userIdToRemove = 1;
        var user1 = UserFactory.CreateUser(userIdToRemove, "alice");
        var user2 = UserFactory.CreateUser(2, "bob");
        var conversationWithTwoMembers = ConversationFactory.CreateConversation(
            conversationId, "test", new List<User> { user1, user2 }
        );

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
            .ReturnsAsync(conversationWithTwoMembers);

        _mockConvoRepo.Setup(repo => repo.RemoveThisUserFromConversationAsync(
                It.Is<Conversation>(c => c.ConversationId == conversationId),
                userIdToRemove))
            .ReturnsAsync(true);

        //Act
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(conversationId, userIdToRemove);

        // Assert
        Assert.True(result);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Once);
        _mockConvoRepo.Verify(repo => repo.DeleteAsync(It.IsAny<Conversation>()), Times.Never); // Samtalen er ikke slettet
    }

    [Fact]
    public async Task RemoveThisUserByIdFromConversationByIdAsync_WhenLastUserIsRemoved_ShouldDeleteConversationAndReturnTrue()
    {
        //Arrange
        var conversationId = 1;
        var lastUserId = 1;
        var lastUser = UserFactory.CreateUser(lastUserId, "alice");
        var conversationWithOneMember = ConversationFactory.CreateConversation(
            conversationId, "test", new List<User> { lastUser }
        );

        var conversationAfterRemoval = ConversationFactory.CreateConversation(
            conversationId, "test", new List<User>()
        );

        _mockConvoRepo.SetupSequence(repo => repo.GetByIdWithMembersAsync(conversationId))
            .ReturnsAsync(conversationWithOneMember) //Første kald et medlem
            .ReturnsAsync(conversationAfterRemoval); //Andet kald(efter delete) nul medlemmer

        _mockConvoRepo.Setup(repo => repo.RemoveThisUserFromConversationAsync(
                It.Is<Conversation>(c => c.ConversationId == conversationId),
                lastUserId))
            .ReturnsAsync(true);

        //Act
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(conversationId, lastUserId);

        //Assert
        Assert.True(result);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Exactly(2));
        _mockConvoRepo.Verify(repo => repo.DeleteAsync(
                It.Is<Conversation>(c => c.ConversationId == conversationId)),
                Times.Once); // Samtalen ER blevet slettet
    }

    [Fact]
    public async Task RemoveThisUserByIdFromConversationByIdAsync_WhenConversationNotFound_ShouldReturnFalse()
    {
        // Arrange
        var nonExistentId = 99;
        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(nonExistentId)).ReturnsAsync((Conversation?)null);

        // Act
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(nonExistentId, 1);

        // Assert
        Assert.False(result);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Never);
        _mockConvoRepo.Verify(repo => repo.DeleteAsync(It.IsAny<Conversation>()), Times.Never);
    }

    [Fact]
    public async Task GetConversationByUserIdAsync_WhenUserIsMemberOfConversations_ShouldReturnConversationSummaries()
    {
        //Arrange
        var userId = 1;
        var fakeConversations = new List<Conversation>
        {
            ConversationFactory.CreateConversation(1, "Test Samtale 1"),
            ConversationFactory.CreateConversation(2, "Test Samtale 2")
        };

        _mockConvoRepo.Setup(repo => repo.GetByUserIdAsync(userId))
                     .ReturnsAsync(fakeConversations);

        //Act
        var result = await _uut.GetConversationByUserIdAsync(userId);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.Contains(result, dto => dto.Name == "Test Samtale 1");
        Assert.Contains(result, dto => dto.Name == "Test Samtale 2");
    }

    [Fact]
    public async Task GetConversationByUserIdAsync_WhenUserIsNotMemberOfConversations_ShouldReturnEmptyList()
    {
        //Arrange
        var userId = 2;

        _mockConvoRepo.Setup(repo => repo.GetByUserIdAsync(userId))
                    .ReturnsAsync(new List<Conversation>());

        //Act
        var result = await _uut.GetConversationByUserIdAsync(userId);

        //Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task AddUserByIdToConversationByIdAsync_WhenSuccessful_ShouldReturnUpdatedConversationDto()
    {
        //Arrange
        var conversationId = 1;
        var userIdToAdd = 2;
        var userToAdd = UserFactory.CreateUser(userIdToAdd, "bob");
        var fakeConversation = ConversationFactory.CreateConversation(conversationId, "Test Samtale");

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
                    .ReturnsAsync(fakeConversation);
        _mockConvoRepo.Setup(repo => repo.AddUsertoConversationAsync(fakeConversation, userIdToAdd))
                    .ReturnsAsync(userToAdd);

        //Act
        var result = await _uut.AddUserByIdToConversationByIdAsync(conversationId, userIdToAdd);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(fakeConversation.Name, result.Name);

        _mockConvoRepo.Verify(repo =>
            repo.GetByIdWithMembersAsync(conversationId), Times.Once);
        _mockConvoRepo.Verify(repo =>
            repo.AddUsertoConversationAsync(fakeConversation, userIdToAdd), Times.Once);
    }

    [Fact]
    public async Task AddUserByIdToConversationByIdAsync_WhenConversationIsNotFould_ShouldReturnNull()
    {
        //Arrange
        var nonExistingConversationId = 99;
        var userIdToAdd = 1;

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(nonExistingConversationId))
                    .ReturnsAsync(null as Conversation);

        //Act
        var result = await _uut.AddUserByIdToConversationByIdAsync(nonExistingConversationId, userIdToAdd);

        //Assert
        Assert.Null(result);

        _mockConvoRepo.Verify(repo =>
            repo.AddUsertoConversationAsync(It.IsAny<Conversation>(), It.IsAny<int>()), Times.Never);
    }

    [Fact]
    public async Task AddUserByIdToConversationByIdAsync_WhenUserIdIsNotFould_ShouldReturnNull()
    {
        //Arrange
        var conversationId = 1;
        var nonExistinguserIdToAdd = 99;
        var fakeConversation = ConversationFactory.CreateConversation(conversationId, "Test Samtale");

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
                    .ReturnsAsync(fakeConversation);

        _mockConvoRepo.Setup(repo => repo.AddUsertoConversationAsync(fakeConversation, nonExistinguserIdToAdd))
                    .ReturnsAsync((User?)null);

        //Act
        var result = await _uut.AddUserByIdToConversationByIdAsync(conversationId, nonExistinguserIdToAdd);

        //Assert
        Assert.Null(result);

        _mockConvoRepo.Verify(repo =>
            repo.AddUsertoConversationAsync(It.IsAny<Conversation>(), It.IsAny<int>()), Times.Once);
    }

    [Fact]
    public async Task UpdateColorThemeAsync_WhenSuccessful_ShouldUpdateColorTheme()
    {
        //Arrange
        var conversationId = 1;
        var userId = 1;
        var newColorTheme = "#FF5733";
        var user = UserFactory.CreateUser(userId, "alice");
        var conversation = ConversationFactory.CreateConversation(
            conversationId, "Test", new List<User> { user }
        );

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
                    .ReturnsAsync(conversation);

        //Act
        await _uut.UpdateColorThemeAsync(conversationId, userId, newColorTheme);

        //Assert
        Assert.Equal(newColorTheme, conversation.ColorTheme);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateColorThemeAsync_WhenConversationNotFound_ShouldThrowException()
    {
        //Arrange
        var nonExistentId = 99;
        var userId = 1;
        var colorTheme = "#FF5733";

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(nonExistentId))
                    .ReturnsAsync((Conversation?)null);

        //Act & Assert
        var exception = await Assert.ThrowsAsync<Exception>(
            () => _uut.UpdateColorThemeAsync(nonExistentId, userId, colorTheme)
        );

        Assert.Equal("Conversation not found.", exception.Message);
    }

    [Fact]
    public async Task UpdateColorThemeAsync_WhenUserIsNotMember_ShouldThrowException()
    {
        //Arrange
        var conversationId = 1;
        var nonMemberUserId = 99;
        var colorTheme = "#FF5733";
        var member = UserFactory.CreateUser(1, "alice");
        var conversation = ConversationFactory.CreateConversation(
            conversationId, "Test", new List<User> { member }
        );

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
                    .ReturnsAsync(conversation);

        //Act & Assert
        var exception = await Assert.ThrowsAsync<Exception>(
            () => _uut.UpdateColorThemeAsync(conversationId, nonMemberUserId, colorTheme)
        );

        Assert.Equal("User is not a member of this conversation.", exception.Message);
    }

    [Fact]
    public async Task AddUserByIdToConversationByIdAsync_WhenUserIsAlreadyMember_ShouldReturnDtoWithoutDuplicates()
    {
        // Arrange
        var conversationId = 1;
        var existingUserId = 2;
        var existingUser = UserFactory.CreateUser(existingUserId, "bob");

        var fakeConversation = ConversationFactory.CreateConversation(
            conversationId,
            "Test Samtale",
            new List<User> { existingUser }
        );

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId))
                    .ReturnsAsync(fakeConversation);
        _mockConvoRepo.Setup(repo => repo.AddUsertoConversationAsync(fakeConversation, existingUserId))
                    .ReturnsAsync(existingUser);

        // Act
        var result = await _uut.AddUserByIdToConversationByIdAsync(conversationId, existingUserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(fakeConversation.Name, result.Name);

        Assert.Single(result.Members);  // Stadigvæk kun en og den samme bruger
        Assert.Equal(existingUserId, result.Members.First().Id);

        _mockConvoRepo.Verify(repo => repo.GetByIdWithMembersAsync(conversationId), Times.Once);
        _mockConvoRepo.Verify(repo => repo.AddUsertoConversationAsync(fakeConversation, existingUserId), Times.Once);
    }

    [Fact]
    public async Task RemoveThisUserByIdFromConversationByIdAsync_WhenUserIsNotMember_ShouldReturnFalse()
    {
        // Arrange
        var conversationId = 1;
        var nonMemberUserId = 99;
        var member = UserFactory.CreateUser(1, "alice");
        var conversation = ConversationFactory.CreateConversation(conversationId, "Test", new List<User> { member });

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId)).ReturnsAsync(conversation);

        _mockConvoRepo.Setup(repo => repo.RemoveThisUserFromConversationAsync(conversation, nonMemberUserId)).ReturnsAsync(false);

        // Act
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(conversationId, nonMemberUserId);

        // Assert
        Assert.False(result);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Never);
    }


    [Fact]
    public async Task RemoveThisUserByIdFromConversationByIdAsync_WhenUserIsMember_ShouldReturnTrue()
    {
        // Arrange
        var conversationId = 1;
        var nonMemberUserId = 99;
        var member = UserFactory.CreateUser(1, "alice");
        var conversation = ConversationFactory.CreateConversation(conversationId, "Test", new List<User> { member });

        _mockConvoRepo.Setup(repo => repo.GetByIdWithMembersAsync(conversationId)).ReturnsAsync(conversation);

        _mockConvoRepo.Setup(repo => repo.RemoveThisUserFromConversationAsync(conversation, nonMemberUserId)).ReturnsAsync(true);

        // Act
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(conversationId, nonMemberUserId);

        // Assert
        Assert.True(result);
        _mockConvoRepo.Verify(repo => repo.SaveChangesAsync(), Times.Once);
    }
}