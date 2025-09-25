using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class StringToDatetime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeStamp",
                table: "Messages",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Chatrooms",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "JoinedAt",
                table: "ChatroomMembers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(string),
                oldType: "text",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 2, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 1,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 2,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 3,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 25, 14, 0, 0, 0, DateTimeKind.Utc));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "TimeStamp",
                table: "Messages",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Chatrooms",
                type: "text",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "JoinedAt",
                table: "ChatroomMembers",
                type: "text",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "JoinedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "JoinedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 2, 2 },
                column: "JoinedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 1,
                column: "CreatedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 2,
                column: "CreatedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 1,
                column: "TimeStamp",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 2,
                column: "TimeStamp",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 3,
                column: "TimeStamp",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: "2025-09-25");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: "2025-09-25");
        }
    }
}
