namespace BIATeam.BIAMonitoring.Domain.Hangfire.Entities
{
    using BIA.Net.Core.Domain;

    /// <summary>
    /// The HangfireVersion entity.
    /// </summary>
    public class HangfireVersion : VersionedTable, IEntity<int>
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the version.
        /// </summary>
        public string Version { get; set; }
    }
}