namespace BIATeam.BIAMonitoring.Infrastructure.Data.ModelBuilders
{
    using BIATeam.BIAMonitoring.Domain.Hangfire.Entities;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Class used to update the model builder for Hangfire domain.
    /// </summary>
    public static class HangfireModelBuilder
    {
        /// <summary>
        /// Create the Hangfire model.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        public static void CreateModel(ModelBuilder modelBuilder)
        {
            CreateDbServerModel(modelBuilder);
            CreateDatabaseModel(modelBuilder);
            CreateDbEngineTypeModel(modelBuilder);
            CreateHangfireVersionModel(modelBuilder);
        }

        /// <summary>
        /// Create the model for DbServer.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        private static void CreateDbServerModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbServer>().HasKey(m => m.Id);
            modelBuilder.Entity<DbServer>().Property(m => m.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<DbServer>().Property(m => m.ConnectionString).IsRequired();
            modelBuilder.Entity<DbServer>().HasOne(m => m.EngineType).WithMany().HasForeignKey("EngineTypeId");
        }

        /// <summary>
        /// Create the model for Database.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        private static void CreateDatabaseModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Database>().HasKey(m => m.Id);
            modelBuilder.Entity<Database>().Property(m => m.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Database>().HasOne(m => m.Server).WithMany().HasForeignKey("ServerId");
            modelBuilder.Entity<Database>().HasOne(m => m.HangfireVersion).WithMany().HasForeignKey("HangfireVersionId");
        }

        /// <summary>
        /// Create the model for DbEngineType.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        private static void CreateDbEngineTypeModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbEngineType>().HasKey(m => m.Id);
            modelBuilder.Entity<DbEngineType>().Property(m => m.Name).IsRequired().HasMaxLength(50);
        }

        /// <summary>
        /// Create the model for HangfireVersion.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        private static void CreateHangfireVersionModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HangfireVersion>().HasKey(m => m.Id);
            modelBuilder.Entity<HangfireVersion>().Property(m => m.Version).IsRequired().HasMaxLength(50);
        }
    }
}