using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class _2ndChangedColorThemeFromUserToConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorTheme",
                table: "ConversationMembers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorTheme",
                table: "ConversationMembers",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ConversationMembers",
                keyColumns: new[] { "ConversationId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "ColorTheme",
                value: null);

            migrationBuilder.UpdateData(
                table: "ConversationMembers",
                keyColumns: new[] { "ConversationId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "ColorTheme",
                value: null);

            migrationBuilder.UpdateData(
                table: "ConversationMembers",
                keyColumns: new[] { "ConversationId", "UserId" },
                keyValues: new object[] { 2, 2 },
                column: "ColorTheme",
                value: null);
        }
    }
}
