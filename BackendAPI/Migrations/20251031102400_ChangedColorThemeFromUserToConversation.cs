using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangedColorThemeFromUserToConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorTheme",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "ColorTheme",
                table: "Conversations",
                type: "text",
                nullable: true);

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

            migrationBuilder.UpdateData(
                table: "Conversations",
                keyColumn: "ConversationId",
                keyValue: 1,
                column: "ColorTheme",
                value: null);

            migrationBuilder.UpdateData(
                table: "Conversations",
                keyColumn: "ConversationId",
                keyValue: 2,
                column: "ColorTheme",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ColorTheme",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "ColorTheme",
                table: "ConversationMembers");

            migrationBuilder.AddColumn<string>(
                name: "ColorTheme",
                table: "Users",
                type: "character varying(30)",
                maxLength: 30,
                nullable: true,
                defaultValue: "default");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new string[0],
                values: new object[0]);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new string[0],
                values: new object[0]);
        }
    }
}
