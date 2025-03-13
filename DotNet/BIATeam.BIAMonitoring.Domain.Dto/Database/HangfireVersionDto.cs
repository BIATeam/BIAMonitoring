// <copyright file="HangfireVersionDto.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Dto.Database
{
    using System;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.CustomAttribute;

    /// <summary>
    /// The DTO used to represent a HangfireVersion.
    /// </summary>
    public class HangfireVersionDto : BaseDto<int>
    {
        /// <summary>
        /// Gets or sets the Version.
        /// </summary>
        [BiaDtoField(Required = true)]
        public string Version { get; set; }
    }
}
