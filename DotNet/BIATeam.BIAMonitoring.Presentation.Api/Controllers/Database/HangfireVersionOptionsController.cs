// <copyright file="HangfireVersionOptionsController.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Presentation.Api.Controllers.Database
{
    using System.Threading.Tasks;
    using BIA.Net.Presentation.Api.Controllers.Base;
    using BIATeam.BIAMonitoring.Application.Database;
    using BIATeam.BIAMonitoring.Crosscutting.Common;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// The API controller used to manage hangfireVersion options.
    /// </summary>
    public class HangfireVersionOptionsController : BiaControllerBase
    {
        /// <summary>
        /// The hangfireVersion application service.
        /// </summary>
        private readonly IHangfireVersionOptionAppService hangfireVersionOptionService;

        /// <summary>
        /// Initializes a new instance of the <see cref="HangfireVersionOptionsController"/> class.
        /// </summary>
        /// <param name="hangfireVersionOptionService">The hangfireVersion application service.</param>
        public HangfireVersionOptionsController(IHangfireVersionOptionAppService hangfireVersionOptionService)
        {
            this.hangfireVersionOptionService = hangfireVersionOptionService;
        }

        /// <summary>
        /// Gets all option that I can see.
        /// </summary>
        /// /// <returns>The list of hangfireVersions.</returns>
        [HttpGet("allOptions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Options)]
        public async Task<IActionResult> GetAllOptions()
        {
            var results = await this.hangfireVersionOptionService.GetAllOptionsAsync();
            return this.Ok(results);
        }
    }
}
