// <copyright file="Site.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Site.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// The site entity.
    /// </summary>
    public class Site : Team
    {
        /// <summary>
        /// Add row version timestamp in table Site.
        /// </summary>
        [Timestamp]
        [Column("RowVersion")]
        public byte[] RowVersionSite { get; set; }
    }
}