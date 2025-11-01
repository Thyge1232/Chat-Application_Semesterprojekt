using System.Net.Cache;

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
        var userIdToRemove  = 1;
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
        var result = await _uut.RemoveThisUserByIdFromConversationByIdAsync(conversationId, userIdToRemove );

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
    } 

