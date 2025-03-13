// <copyright file="HangfireVersionMapper.cs" company="BIATeam">
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
    /// The mapper used for HangfireVersion.
    /// </summary>
    public class HangfireVersionMapper : BaseMapper<HangfireVersionDto, HangfireVersion, int>
    {
        /// <inheritdoc/>
        public override ExpressionCollection<HangfireVersion> ExpressionCollection
        {
            // It is not necessary to implement this function if you to not use the mapper for filtered list. In BIADemo it is use only for Calc SpreadSheet.
            get
            {
                return new ExpressionCollection<HangfireVersion>
                {
                    { HeaderName.Id, x => x.Id },
                    { HeaderName.Version, x => x.Version },
                };
            }
        }

        /// <inheritdoc/>
        public override void DtoToEntity(HangfireVersionDto dto, HangfireVersion entity)
        {
            entity ??= new HangfireVersion();

            entity.Id = dto.Id;
            entity.Version = dto.Version;
        }

        /// <inheritdoc/>
        public override Expression<Func<HangfireVersion, HangfireVersionDto>> EntityToDto()
        {
            return entity => new HangfireVersionDto
            {
                Id = entity.Id,
                Version = entity.Version,
            };
        }

        /// <inheritdoc/>
        public override Func<HangfireVersionDto, object[]> DtoToRecord(List<string> headerNames = null)
        {
            return x => (new object[]
            {
                CSVNumber(x.Id),
                CSVString(x.Version),
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
            /// Header Name Version.
            /// </summary>
            public const string Version = "version";
        }
    }
}