namespace BIATeam.BIAMonitoring.Domain.Hangfire.Entities
{
    using BIA.Net.Core.Domain;

    /// <summary>
    /// The DbServer entity.
    /// </summary>
    public class DbServer : VersionedTable, IEntity<int>
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
        /// Gets or sets the connection string.
        /// </summary>
        public string ConnectionString { get; set; }

        /// <summary>
        /// Gets or sets the engine type.
        /// </summary>
        public DbEngineType EngineType { get; set; }
    }
}