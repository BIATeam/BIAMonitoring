// <copyright file="TeamAdvancedFilterSpecification.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.User.Specifications
{
    using System.Linq;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Specification;
    using BIATeam.BIAMonitoring.Domain.Dto.Site;
    using BIATeam.BIAMonitoring.Domain.Dto.User;
    using BIATeam.BIAMonitoring.Domain.User.Entities;
    using Newtonsoft.Json;

    /// <summary>
    /// The specifications of the site entity.
    /// </summary>
    /// <typeparam name="TTeam">The type of team.</typeparam>
    public static class TeamAdvancedFilterSpecification<TTeam>
        where TTeam : Team
    {
        /// <summary>
        /// Search site using the filter.
        /// </summary>
        /// <param name="filter">The filter.</param>
        /// <returns>
        /// The specification.
        /// </returns>
        public static Specification<TTeam> Filter(PagingFilterFormatDto filter)
        {
            Specification<TTeam> specification = new TrueSpecification<TTeam>();
            if (filter.AdvancedFilter != null)
            {
                TeamAdvancedFilterDto advancedFilter = JsonConvert.DeserializeObject<TeamAdvancedFilterDto>(filter.AdvancedFilter.ToString());
                if (advancedFilter.UserId > 0)
                {
                    specification &= new DirectSpecification<TTeam>(s =>
                        s.Members.Any(a => a.UserId == advancedFilter.UserId));
                }
            }

            return specification;
        }
    }
}