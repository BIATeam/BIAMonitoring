namespace BIATeam.BIAMonitoring.Domain.Database.Entities
{
    using BIA.Net.Core.Domain;

    /// <summary>
    /// The Database entity.
    /// </summary>
    public class Database : VersionedTable, IEntity<int>
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the server.
        /// </summary>
        public DbServer Server { get; set; }

        /// <summary>
        /// Gets or sets the Hangfire version.
        /// </summary>
        public HangfireVersion HangfireVersion { get; set; }
    }
}