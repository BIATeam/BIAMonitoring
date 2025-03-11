using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BIATeam.BIAMonitoring.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class HangfireModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DbEngineType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbEngineType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HangfireVersion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Version = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HangfireVersion", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DbServer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ConnectionString = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EngineTypeId = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DbServer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DbServer_DbEngineType_EngineTypeId",
                        column: x => x.EngineTypeId,
                        principalTable: "DbEngineType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Database",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ServerId = table.Column<int>(type: "int", nullable: true),
                    HangfireVersionId = table.Column<int>(type: "int", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Database", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Database_DbServer_ServerId",
                        column: x => x.ServerId,
                        principalTable: "DbServer",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Database_HangfireVersion_HangfireVersionId",
                        column: x => x.HangfireVersionId,
                        principalTable: "HangfireVersion",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Database_HangfireVersionId",
                table: "Database",
                column: "HangfireVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_Database_ServerId",
                table: "Database",
                column: "ServerId");

            migrationBuilder.CreateIndex(
                name: "IX_DbServer_EngineTypeId",
                table: "DbServer",
                column: "EngineTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Database");

            migrationBuilder.DropTable(
                name: "DbServer");

            migrationBuilder.DropTable(
                name: "HangfireVersion");

            migrationBuilder.DropTable(
                name: "DbEngineType");
        }
    }
}
