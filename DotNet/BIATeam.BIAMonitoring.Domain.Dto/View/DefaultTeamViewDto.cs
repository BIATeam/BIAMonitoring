// <copyright file="DefaultTeamViewDto.cs" company="BIATeam">
// Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Dto.View
{
    /// <summary>
    /// DefaultTeamView Dto.
    /// </summary>
    /// <seealso cref="BIATeam.BIAMonitoring.Domain.Dto.View.DefaultViewDto" />
    public class DefaultTeamViewDto : DefaultViewDto
    {
        /// <summary>
        /// Gets or sets the site identifier.
        /// </summary>
        /// <value>
        /// The site identifier.
        /// </value>
        public int TeamId { get; set; }
    }
}