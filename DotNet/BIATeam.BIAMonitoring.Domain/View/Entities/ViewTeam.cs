// <copyright file="ViewTeam.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.View.Entities
{
    using BIA.Net.Core.Domain;
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// The mapping entity between users and sites.
    /// </summary>
    public class ViewTeam : VersionedTable
    {
        /// <summary>
        /// Gets or sets the site identifier.
        /// </summary>
        public int TeamId { get; set; }

        /// <summary>
        /// Gets or sets the site.
        /// </summary>
        public virtual Team Team { get; set; }

        /// <summary>
        /// Gets or sets the view identifier.
        /// </summary>
        public int ViewId { get; set; }

        /// <summary>
        /// Gets or sets the view.
        /// </summary>
        public virtual View View { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the view is the default one.
        /// </summary>
        public bool IsDefault { get; set; }
    }
}