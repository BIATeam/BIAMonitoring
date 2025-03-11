// <copyright file="IHangfireVersionOptionAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Database
{
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIA.Net.Core.Domain.Service;

    /// <summary>
    /// The interface defining the application service for hangfireVersion option.
    /// </summary>
    public interface IHangfireVersionOptionAppService : IOptionAppServiceBase<OptionDto, int>
    {
    }
}
