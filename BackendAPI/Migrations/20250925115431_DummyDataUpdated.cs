using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendAPI.Migrations
{
    /// <inheritdoc />
    public partial class DummyDataUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 19, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(1504));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 20, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(1596));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 2, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 23, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(1598));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 18, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(936));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 22, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(1035));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 1,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 19, 12, 54, 30, 692, DateTimeKind.Utc).AddTicks(2120));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 2,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 20, 13, 54, 30, 692, DateTimeKind.Utc).AddTicks(2216));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 3,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 23, 14, 54, 30, 692, DateTimeKind.Utc).AddTicks(2218));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 15, 11, 54, 30, 691, DateTimeKind.Utc).AddTicks(9786));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 11, 54, 30, 692, DateTimeKind.Utc).AddTicks(208));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 1 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 19, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2992));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 1, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 20, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(3092));

            migrationBuilder.UpdateData(
                table: "ChatroomMembers",
                keyColumns: new[] { "ChatroomId", "UserId" },
                keyValues: new object[] { 2, 2 },
                column: "JoinedAt",
                value: new DateTime(2025, 9, 23, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(3094));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 18, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2284));

            migrationBuilder.UpdateData(
                table: "Chatrooms",
                keyColumn: "ChatroomId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 22, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(2385));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 1,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 19, 11, 11, 53, 80, DateTimeKind.Utc).AddTicks(3658));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 2,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 20, 12, 11, 53, 80, DateTimeKind.Utc).AddTicks(3756));

            migrationBuilder.UpdateData(
                table: "Messages",
                keyColumn: "MessageId",
                keyValue: 3,
                column: "TimeStamp",
                value: new DateTime(2025, 9, 23, 13, 11, 53, 80, DateTimeKind.Utc).AddTicks(3757));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 15, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(625));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 10, 11, 53, 80, DateTimeKind.Utc).AddTicks(1235));
        }
    }
}
