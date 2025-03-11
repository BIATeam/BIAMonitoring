using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BIATeam.BIAMonitoring.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SupportTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SupportTeamId",
                table: "DbServer",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TemplateUrlDashboard",
                table: "DbServer",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SupportTeam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupportTeam", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportTeam_Teams_Id",
                        column: x => x.Id,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DbServer_SupportTeamId",
                table: "DbServer",
                column: "SupportTeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_DbServer_SupportTeam_SupportTeamId",
                table: "DbServer",
                column: "SupportTeamId",
                principalTable: "SupportTeam",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DbServer_SupportTeam_SupportTeamId",
                table: "DbServer");

            migrationBuilder.DropTable(
                name: "SupportTeam");

            migrationBuilder.DropIndex(
                name: "IX_DbServer_SupportTeamId",
                table: "DbServer");

            migrationBuilder.DropColumn(
                name: "SupportTeamId",
                table: "DbServer");

            migrationBuilder.DropColumn(
                name: "TemplateUrlDashboard",
                table: "DbServer");
        }
    }
}
