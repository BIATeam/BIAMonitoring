// <copyright file="DbEngineTypeOptionAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Database
{
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIA.Net.Core.Domain.RepoContract;
    using BIA.Net.Core.Domain.Service;
    using BIATeam.BIAMonitoring.Domain.Database.Entities;
    using BIATeam.BIAMonitoring.Domain.Database.Mappers;

    /// <summary>
    /// The application service used for dbEngineType option.
    /// </summary>
    public class DbEngineTypeOptionAppService : OptionAppServiceBase<OptionDto, DbEngineType, int, DbEngineTypeOptionMapper>, IDbEngineTypeOptionAppService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DbEngineTypeOptionAppService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public DbEngineTypeOptionAppService(ITGenericRepository<DbEngineType, int> repository)
            : base(repository)
        {
        }
    }
}
