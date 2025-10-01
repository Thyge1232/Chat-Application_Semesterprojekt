using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    ConversationId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.ConversationId);
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
                    Password = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProfilePicture = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "ConversationMembers",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ConversationId = table.Column<int>(type: "integer", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConversationMembers", x => new { x.UserId, x.ConversationId });
                    table.ForeignKey(
                        name: "FK_ConversationMembers_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "ConversationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConversationMembers_Users_UserId",
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
                    ConversationId = table.Column<int>(type: "integer", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_Messages_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "ConversationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Conversations",
                columns: new[] { "ConversationId", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), "General" },
                    { 2, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), "Tech Talk" }
                });

            migrationBuilder.InsertData(
                table: "Tests",
                columns: new[] { "DbTestId", "testString" },
                values: new object[] { 1, "Test!!!" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "CreatedAt", "Email", "Password", "ProfilePicture", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), "alice@example.com", "hashed_pw_1", "alice.png", "alice" },
                    { 2, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), "bob@example.com", "hashed_pw_2", "bob.png", "bob" }
                });

            migrationBuilder.InsertData(
                table: "ConversationMembers",
                columns: new[] { "ConversationId", "UserId", "JoinedAt" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc) },
                    { 1, 2, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc) },
                    { 2, 2, new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "MessageId", "ConversationId", "MessageContent", "TimeStamp", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "Hello everyone!", new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), 1 },
                    { 2, 1, "Hi Alice!", new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), 2 },
                    { 3, 2, "Anyone tried .NET MAUI?", new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc), 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConversationMembers_ConversationId",
                table: "ConversationMembers",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ConversationId",
                table: "Messages",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserId",
                table: "Messages",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConversationMembers");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
