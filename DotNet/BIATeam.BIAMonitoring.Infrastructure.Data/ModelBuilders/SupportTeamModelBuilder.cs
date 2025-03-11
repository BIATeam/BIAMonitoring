// <copyright file="SupportTeamModelBuilder.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Infrastructure.Data.ModelBuilders
{
    using BIATeam.BIAMonitoring.Crosscutting.Common.Enum;
    using BIATeam.BIAMonitoring.Domain.SupportTeam.Entities;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Class used to update the model builder for supportTeam domain.
    /// </summary>
    public static class SupportTeamModelBuilder
    {
        /// <summary>
        /// Create the model for supportTeams.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        public static void CreateSupportTeamModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SupportTeam>().ToTable("SupportTeams");
        }
    }
}