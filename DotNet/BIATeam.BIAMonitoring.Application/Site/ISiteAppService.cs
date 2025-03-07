// <copyright file="ISiteAppService.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Site
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Core.Domain.Service;
    using BIATeam.BIAMonitoring.Domain.Dto.Site;
    using BIATeam.BIAMonitoring.Domain.Site.Entities;

    /// <summary>
    /// The interface defining the application service for site.
    /// </summary>
    public interface ISiteAppService : ICrudAppServiceBase<SiteDto, Site, int, PagingFilterFormatDto>
    {
    }
}