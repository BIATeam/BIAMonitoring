// <copyright file="DbEngineTypeDto.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Dto.Database
{
    using System;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.CustomAttribute;

    /// <summary>
    /// The DTO used to represent a DbEngineType.
    /// </summary>
    public class DbEngineTypeDto : BaseDto<int>
    {
        /// <summary>
        /// Gets or sets the Name.
        /// </summary>
        [BiaDtoField(Required = true)]
        public string Name { get; set; }
    }
}
