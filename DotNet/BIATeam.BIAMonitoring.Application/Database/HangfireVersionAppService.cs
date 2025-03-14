// <copyright file="HangfireVersionAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Database
{
    using System.Collections.Generic;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Common.Exceptions;
    using BIA.Net.Core.Domain.Authentication;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Dto.User;
    using BIA.Net.Core.Domain.RepoContract;
    using BIA.Net.Core.Domain.Service;
    using BIA.Net.Core.Domain.Specification;
    using Microsoft.AspNetCore.Http;
    using BIATeam.BIAMonitoring.Crosscutting.Common.Enum;
    using BIATeam.BIAMonitoring.Domain.Dto.Database;
    using BIATeam.BIAMonitoring.Domain.Database.Entities;
    using BIATeam.BIAMonitoring.Domain.Database.Mappers;

    /// <summary>
    /// The application service used for hangfireVersion.
    /// </summary>
    public class HangfireVersionAppService : CrudAppServiceBase<HangfireVersionDto, HangfireVersion, int, PagingFilterFormatDto, HangfireVersionMapper>, IHangfireVersionAppService
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="HangfireVersionAppService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        /// <param name="principal">The claims principal.</param>
        public HangfireVersionAppService(ITGenericRepository<HangfireVersion, int> repository, IPrincipal principal)
            : base(repository)
        {
        }
    }
}
