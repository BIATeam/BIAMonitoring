// <copyright file="DbEngineTypeMapper.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Database.Mappers
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIATeam.BIAMonitoring.Domain.Database.Entities;
    using BIATeam.BIAMonitoring.Domain.Dto.Database;

    /// <summary>
    /// The mapper used for DbEngineType.
    /// </summary>
    public class DbEngineTypeMapper : BaseMapper<DbEngineTypeDto, DbEngineType, int>
    {
        /// <inheritdoc/>
        public override ExpressionCollection<DbEngineType> ExpressionCollection
        {
            // It is not necessary to implement this function if you to not use the mapper for filtered list. In BIADemo it is use only for Calc SpreadSheet.
            get
            {
                return new ExpressionCollection<DbEngineType>
                {
                    { HeaderName.Id, x => x.Id },
                    { HeaderName.Name, x => x.Name },
                };
            }
        }

        /// <inheritdoc/>
        public override void DtoToEntity(DbEngineTypeDto dto, DbEngineType entity)
        {
            entity ??= new DbEngineType();

            entity.Id = dto.Id;
            entity.Name = dto.Name;
        }

        /// <inheritdoc/>
        public override Expression<Func<DbEngineType, DbEngineTypeDto>> EntityToDto()
        {
            return entity => new DbEngineTypeDto
            {
                Id = entity.Id,
                Name = entity.Name,
            };
        }

        /// <inheritdoc/>
        public override Func<DbEngineTypeDto, object[]> DtoToRecord(List<string> headerNames = null)
        {
            return x => (new object[]
            {
                CSVNumber(x.Id),
                CSVString(x.Name),
            });
        }

        /// <summary>
        /// Header Names.
        /// </summary>
        private struct HeaderName
        {
            /// <summary>
            /// Header Name Id.
            /// </summary>
            public const string Id = "id";

            /// <summary>
            /// Header Name Name.
            /// </summary>
            public const string Name = "name";
        }
    }
}