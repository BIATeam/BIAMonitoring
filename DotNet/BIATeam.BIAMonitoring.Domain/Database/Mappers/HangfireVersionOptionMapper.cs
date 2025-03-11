// <copyright file="HangfireVersionOptionMapper.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Database.Mappers
{
    using System;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIATeam.BIAMonitoring.Domain.Database.Entities;

    /// <summary>
    /// The mapper used for hangfireVersion option.
    /// </summary>
    public class HangfireVersionOptionMapper : BaseMapper<OptionDto, HangfireVersion, int>
    {
        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<HangfireVersion, OptionDto>> EntityToDto()
        {
            return entity => new OptionDto
            {
                Id = entity.Id,

                Display = entity.Version,

            };
        }
    }
}
