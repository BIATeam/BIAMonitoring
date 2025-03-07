// <copyright file="SiteMapper.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Site.Mappers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Security.Principal;
    using BIA.Net.Core.Common;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Authentication;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIATeam.BIAMonitoring.Crosscutting.Common.Enum;
    using BIATeam.BIAMonitoring.Domain.Dto.Site;
    using BIATeam.BIAMonitoring.Domain.Site.Entities;
    using BIATeam.BIAMonitoring.Domain.User.Mappers;

    /// <summary>
    /// The mapper used for site.
    /// </summary>
    public class SiteMapper : TTeamMapper<SiteDto, Site>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapper"/> class.
        /// </summary>
        /// <param name="principal">The principal.</param>
        public SiteMapper(IPrincipal principal)
            : base(principal)
        {
        }

        /// <summary>
        /// Precise the Id of the type of team.
        /// </summary>
        public override int TeamType
        {
            get { return (int)TeamTypeId.Site; }
        }
    }
}