// <copyright file="SiteModelBuilder.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Infrastructure.Data.ModelBuilders
{
    using BIATeam.BIAMonitoring.Crosscutting.Common.Enum;
    using BIATeam.BIAMonitoring.Domain.Site.Entities;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Class used to update the model builder for site domain.
    /// </summary>
    public static class SiteModelBuilder
    {
        /// <summary>
        /// Create the model for sites.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        public static void CreateSiteModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Site>().ToTable("Sites");
        }
    }
}