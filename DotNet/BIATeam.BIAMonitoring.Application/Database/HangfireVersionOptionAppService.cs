// <copyright file="HangfireVersionOptionAppService.cs" company="TheBIADevCompany">
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
    /// The application service used for hangfireVersion option.
    /// </summary>
    public class HangfireVersionOptionAppService : OptionAppServiceBase<OptionDto, HangfireVersion, int, HangfireVersionOptionMapper>, IHangfireVersionOptionAppService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="HangfireVersionOptionAppService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public HangfireVersionOptionAppService(ITGenericRepository<HangfireVersion, int> repository)
            : base(repository)
        {
        }
    }
}
