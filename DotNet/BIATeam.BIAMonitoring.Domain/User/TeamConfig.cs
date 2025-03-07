// <copyright file="TeamConfig.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>
namespace BIATeam.BIAMonitoring.Domain.User
{
    using System.Collections.Immutable;
    using BIA.Net.Core.Common;
    using BIA.Net.Core.Common.Helpers;
    using BIATeam.BIAMonitoring.Crosscutting.Common.Enum;
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// Team prefixe.
    /// </summary>
    public static class TeamConfig
    {
        /// <summary>
        /// the private mapping.
        /// </summary>
        public static readonly ImmutableList<BiaTeamConfig<Team>> Config = new ImmutableListBuilder<BiaTeamConfig<Team>>()
        {
            new BiaTeamConfig<Team>()
            {
                TeamTypeId = (int)TeamTypeId.Site,
                RightPrefix = "Site",
                AdminRoleIds = new int[] { (int)RoleId.SiteAdmin },
            },

            // BIAToolKit - Begin TeamConfig
            // BIAToolKit - End TeamConfig
        }.ToImmutable();
    }
}
