// <copyright file="SupportTeam.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.SupportTeam.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// The SupportTeam entity.
    /// </summary>
    public class SupportTeam : Team
    {
        /// <summary>
        /// Add row version timestamp in table SupportTeam.
        /// </summary>
        [Timestamp]
        [Column("RowVersion")]
        public byte[] RowVersionSupportTeam { get; set; }
    }
}