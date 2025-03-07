// <copyright file="UserOptionMapper.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.User.Mappers
{
    using System;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// The mapper used for user option.
    /// </summary>
    public class UserOptionMapper : BaseMapper<OptionDto, User, int>
    {
        /// <inheritdoc cref="BaseMapper{TDto,TEntity}.EntityToDto"/>
        public override Expression<Func<User, OptionDto>> EntityToDto()
        {
            return entity => new OptionDto
            {
                Id = entity.Id,
                Display = entity.Display(),
            };
        }
    }
}