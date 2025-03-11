// <copyright file="IDbEngineTypeOptionAppService.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Application.Database
{
    using BIA.Net.Core.Application.Services;
    using BIA.Net.Core.Domain.Dto.Option;
    using BIA.Net.Core.Domain.Service;

    /// <summary>
    /// The interface defining the application service for dbEngineType option.
    /// </summary>
    public interface IDbEngineTypeOptionAppService : IOptionAppServiceBase<OptionDto, int>
    {
    }
}
