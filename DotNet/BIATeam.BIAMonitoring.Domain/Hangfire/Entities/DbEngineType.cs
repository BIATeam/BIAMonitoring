namespace BIATeam.BIAMonitoring.Domain.Hangfire.Entities
{
    using BIA.Net.Core.Domain;

    /// <summary>
    /// The DbEngineType entity.
    /// </summary>
    public class DbEngineType : VersionedTable, IEntity<int>
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }
    }
}