// <copyright file="DbEngineTypeOptionMapper.cs" company="TheBIADevCompany">
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
    /// The mapper used for dbEngineType option.
    /// </summary>
    public class DbEngineTypeOptionMapper : BaseMapper<OptionDto, DbEngineType, int>
    {
        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<DbEngineType, OptionDto>> EntityToDto()
        {
            return entity => new OptionDto
            {
                Id = entity.Id,

                Display = entity.Name,

            };
        }
    }
}
