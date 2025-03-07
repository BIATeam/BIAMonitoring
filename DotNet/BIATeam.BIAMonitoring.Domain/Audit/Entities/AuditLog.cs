// <copyright file="AuditLog.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Audit.Entities
{
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Audit;

    /// <summary>
    /// The airport entity.
    /// </summary>
    public class AuditLog : AuditEntity, IEntity<int>
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the table name.
        /// </summary>
        public string Table { get; set; }

        /// <summary>
        /// Gets or sets the PrimaryKey.
        /// </summary>
        public string PrimaryKey { get; set; }
    }
}
