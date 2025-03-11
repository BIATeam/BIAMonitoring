// <copyright file="DbServer.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Hangfire.Entities
{
    using BIA.Net.Core.Domain;
    using BIATeam.BIAMonitoring.Domain.SupportTeam.Entities;

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
        /// Gets or sets the template UrlDashboard.
        /// </summary>
        public string TemplateUrlDashboard { get; set; }

        /// <summary>
        /// Gets or sets the engine type.
        /// </summary>
        public DbEngineType EngineType { get; set; }

        /// <summary>
        /// Gets or sets the support team.
        /// </summary>
        public SupportTeam SupportTeam { get; set; }
    }
}