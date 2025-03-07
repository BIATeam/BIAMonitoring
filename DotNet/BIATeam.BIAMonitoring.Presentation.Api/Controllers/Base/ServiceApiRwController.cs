// <copyright file="ServiceApiRwController.cs" company="BIATeam">
// Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Presentation.Api.Controllers.Base
{
    using BIA.Net.Presentation.Api.Controllers.Base;
    using Microsoft.AspNetCore.Authorization;

    /// <summary>
    /// Service Api Rw Controller.
    /// </summary>
    [Authorize(Policy = "ServiceApiRW")]
    public abstract class ServiceApiRwController : AuthControllerBase
    {
    }
}
