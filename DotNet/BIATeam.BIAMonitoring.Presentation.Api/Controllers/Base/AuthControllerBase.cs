// <copyright file="AuthControllerBase.cs" company="BIATeam">
// Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Presentation.Api.Controllers.Base
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// Auth Controller Base.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Authorize(Policy = "BiaAuthorizationPolicy")]
    public abstract class AuthControllerBase : ControllerBase
    {
    }
}
