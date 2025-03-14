// <copyright file="IDbEngineTypeAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Database
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Domain.Authentication;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Service;
    using BIATeam.BIAMonitoring.Domain.Dto.Database;
    using BIATeam.BIAMonitoring.Domain.Database.Entities;

    /// <summary>
    /// The interface defining the application service for dbEngineType.
    /// </summary>
    public interface IDbEngineTypeAppService : ICrudAppServiceBase<DbEngineTypeDto, DbEngineType, int, PagingFilterFormatDto>
    {
    }
}
