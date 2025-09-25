using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class DummyData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chatrooms",
                columns: table => new
                {
                    ChatroomId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chatrooms", x => x.ChatroomId);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    DbTestId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    testString = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.DbTestId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PassWord = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false),
                    ProfilePicture = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "ChatroomMembers",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ChatroomId = table.Column<int>(type: "integer", nullable: false),
                    JoinedAt = table.Column<string>(type: "text", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatroomMembers", x => new { x.UserId, x.ChatroomId });
                    table.ForeignKey(
                        name: "FK_ChatroomMembers_Chatrooms_ChatroomId",
                        column: x => x.ChatroomId,
                        principalTable: "Chatrooms",
                        principalColumn: "ChatroomId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatroomMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MessageContent = table.Column<string>(type: "text", nullable: false),
                    ChatroomId = table.Column<int>(type: "integer", nullable: false),
                    TimeStamp = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_Messages_Chatrooms_ChatroomId",
                        column: x => x.ChatroomId,
                        principalTable: "Chatrooms",
                        principalColumn: "ChatroomId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Chatrooms",
                columns: new[] { "ChatroomId", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { 1, "2025-09-25", "General" },
                    { 2, "2025-09-25", "Tech Talk" }
                });

            migrationBuilder.InsertData(
                table: "Tests",
                columns: new[] { "DbTestId", "testString" },
                values: new object[] { 1, "Test!!!" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "CreatedAt", "Email", "PassWord", "ProfilePicture", "Username" },
                values: new object[,]
                {
                    { 1, "2025-09-25", "alice@example.com", "hashed_pw_1", "alice.png", "alice" },
                    { 2, "2025-09-25", "bob@example.com", "hashed_pw_2", "bob.png", "bob" }
                });

            migrationBuilder.InsertData(
                table: "ChatroomMembers",
                columns: new[] { "ChatroomId", "UserId", "JoinedAt" },
                values: new object[,]
                {
                    { 1, 1, "2025-09-25" },
                    { 1, 2, "2025-09-25" },
                    { 2, 2, "2025-09-25" }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "MessageId", "ChatroomId", "MessageContent", "TimeStamp", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "Hello everyone!", "2025-09-25", 1 },
                    { 2, 1, "Hi Alice!", "2025-09-25", 2 },
                    { 3, 2, "Anyone tried .NET MAUI?", "2025-09-25", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatroomMembers_ChatroomId",
                table: "ChatroomMembers",
                column: "ChatroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatroomId",
                table: "Messages",
                column: "ChatroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserId",
                table: "Messages",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatroomMembers");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Chatrooms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
