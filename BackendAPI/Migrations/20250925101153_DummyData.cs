using System;
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
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chatrooms", x => x.ChatroomId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PassWord = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    JoinedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
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
                    TimeStamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    { 1, new DateTime(2025, 9, 18, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2284), "General" },
                    { 2, new DateTime(2025, 9, 22, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2385), "Tech Talk" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "CreatedAt", "Email", "PassWord", "ProfilePicture", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 9, 15, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(625), "alice@example.com", "hashed_pw_1", "alice.png", "alice" },
                    { 2, new DateTime(2025, 9, 20, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(1235), "bob@example.com", "hashed_pw_2", "bob.png", "bob" }
                });

            migrationBuilder.InsertData(
                table: "ChatroomMembers",
                columns: new[] { "ChatroomId", "UserId", "JoinedAt" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 9, 19, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2992) },
                    { 1, 2, new DateTime(2025, 9, 20, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(3092) },
                    { 2, 2, new DateTime(2025, 9, 23, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(3094) }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "MessageId", "ChatroomId", "MessageContent", "TimeStamp", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "Hello everyone!", new DateTime(2025, 9, 19, 11, 11, 53, 80, DateTimeKind.Utc).AddTicks(3658), 1 },
                    { 2, 1, "Hi Alice!", new DateTime(2025, 9, 20, 12, 11, 53, 80, DateTimeKind.Utc).AddTicks(3756), 2 },
                    { 3, 2, "Anyone tried .NET MAUI?", new DateTime(2025, 9, 23, 13, 11, 53, 80, DateTimeKind.Utc).AddTicks(3757), 2 }
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
                name: "Chatrooms");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
