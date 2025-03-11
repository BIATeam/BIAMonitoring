// <copyright file="DbEngineTypeOptionsController.cs" company="TheBIADevCompany">
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
    /// The API controller used to manage dbEngineType options.
    /// </summary>
    public class DbEngineTypeOptionsController : BiaControllerBase
    {
        /// <summary>
        /// The dbEngineType application service.
        /// </summary>
        private readonly IDbEngineTypeOptionAppService dbEngineTypeOptionService;

        /// <summary>
        /// Initializes a new instance of the <see cref="DbEngineTypeOptionsController"/> class.
        /// </summary>
        /// <param name="dbEngineTypeOptionService">The dbEngineType application service.</param>
        public DbEngineTypeOptionsController(IDbEngineTypeOptionAppService dbEngineTypeOptionService)
        {
            this.dbEngineTypeOptionService = dbEngineTypeOptionService;
        }

        /// <summary>
        /// Gets all option that I can see.
        /// </summary>
        /// /// <returns>The list of dbEngingeTypes.</returns>
        [HttpGet("allOptions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngingeTypes.Options)]
        public async Task<IActionResult> GetAllOptions()
        {
            var results = await this.dbEngineTypeOptionService.GetAllOptionsAsync();
            return this.Ok(results);
        }
    }
}
