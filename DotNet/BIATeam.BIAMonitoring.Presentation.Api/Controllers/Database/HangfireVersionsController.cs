// <copyright file="HangfireVersionsController.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>
#define UseHubForClientInHangfireVersion
namespace BIATeam.BIAMonitoring.Presentation.Api.Controllers.Database
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
#if UseHubForClientInHangfireVersion
    using BIA.Net.Core.Application.Services;
#endif
    using BIA.Net.Core.Common;
    using BIA.Net.Core.Common.Exceptions;
    using BIA.Net.Core.Domain.Dto.Base;
    using BIA.Net.Presentation.Api.Controllers.Base;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using BIATeam.BIAMonitoring.Application.Database;
    using BIATeam.BIAMonitoring.Crosscutting.Common;
    using BIATeam.BIAMonitoring.Domain.Dto.Database;

    /// <summary>
    /// The API controller used to manage HangfireVersions.
    /// </summary>
#if !UseHubForClientInHangfireVersion
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Minor Code Smell", "S1481:Unused local variables should be removed", Justification = "UseHubForClientInHangfireVersion not set")]
#endif
    public class HangfireVersionsController : BiaControllerBase
    {
        /// <summary>
        /// The hangfireVersion application service.
        /// </summary>
        private readonly IHangfireVersionAppService hangfireVersionService;

        /// <summary>
        /// The BIA claims principal service.
        /// </summary>
        private readonly IBiaClaimsPrincipalService biaClaimsPrincipalService;

#if UseHubForClientInHangfireVersion
        private readonly IClientForHubService clientForHubService;
#endif

#if UseHubForClientInHangfireVersion
        /// <summary>
        /// Initializes a new instance of the <see cref="HangfireVersionsController" /> class.
        /// </summary>
        /// <param name="hangfireVersionService">The hangfireVersion application service.</param>
        /// <param name="clientForHubService">The hub for client.</param>
        /// <param name="biaClaimsPrincipalService">The BIA claims principal service.</param>
        public HangfireVersionsController(
            IHangfireVersionAppService hangfireVersionService,
            IClientForHubService clientForHubService,
            IBiaClaimsPrincipalService biaClaimsPrincipalService)
#else
        /// <summary>
        /// Initializes a new instance of the <see cref="HangfireVersionsController" /> class.
        /// </summary>
        /// <param name="hangfireVersionService">The hangfireVersion application service.</param>
        /// <param name="biaClaimsPrincipalService">The BIA claims principal service.</param>
        public HangfireVersionsController(
            IHangfireVersionAppService hangfireVersionService,
            IBiaClaimsPrincipalService biaClaimsPrincipalService)
#endif
        {
#if UseHubForClientInHangfireVersion
            this.clientForHubService = clientForHubService;
#endif
            this.hangfireVersionService = hangfireVersionService;
            this.biaClaimsPrincipalService = biaClaimsPrincipalService;
        }

        /// <summary>
        /// Get all hangfireVersions with filters.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <returns>The list of hangfireVersions.</returns>
        [HttpPost("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.ListAccess)]
        public async Task<IActionResult> GetAll([FromBody] PagingFilterFormatDto filters)
        {
            var (results, total) = await this.hangfireVersionService.GetRangeAsync(filters);
            this.HttpContext.Response.Headers.Append(BiaConstants.HttpHeaders.TotalCount, total.ToString());
            return this.Ok(results);
        }

        /// <summary>
        /// Get a hangfireVersion by its identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The hangfireVersion.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Read)]
        public async Task<IActionResult> Get(int id)
        {
            if (id == 0)
            {
                return this.BadRequest();
            }

            try
            {
                var dto = await this.hangfireVersionService.GetAsync(id);
                return this.Ok(dto);
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Add a hangfireVersion.
        /// </summary>
        /// <param name="dto">The hangfireVersion DTO.</param>
        /// <returns>The result of the creation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Create)]
        public async Task<IActionResult> Add([FromBody] HangfireVersionDto dto)
        {
            try
            {
                var createdDto = await this.hangfireVersionService.AddAsync(dto);
#if UseHubForClientInHangfireVersion
#endif
                return this.CreatedAtAction("Get", new { id = createdDto.Id }, createdDto);
            }
            catch (ArgumentNullException)
            {
                return this.ValidationProblem();
            }
        }

        /// <summary>
        /// Update a hangfireVersion.
        /// </summary>
        /// <param name="id">The hangfireVersion identifier.</param>
        /// <param name="dto">The hangfireVersion DTO.</param>
        /// <returns>The result of the update.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Update)]
        public async Task<IActionResult> Update(int id, [FromBody] HangfireVersionDto dto)
        {
            if (id == 0 || dto == null || dto.Id != id)
            {
                return this.BadRequest();
            }

            try
            {
                var updatedDto = await this.hangfireVersionService.UpdateAsync(dto);
#if UseHubForClientInHangfireVersion
#endif
                return this.Ok(updatedDto);
            }
            catch (ArgumentNullException)
            {
                return this.ValidationProblem();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Remove a hangfireVersion.
        /// </summary>
        /// <param name="id">The hangfireVersion identifier.</param>
        /// <returns>The result of the remove.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Delete)]
        public async Task<IActionResult> Remove(int id)
        {
            if (id == 0)
            {
                return this.BadRequest();
            }

            try
            {
                var deletedDto = await this.hangfireVersionService.RemoveAsync(id);
#if UseHubForClientInHangfireVersion
#endif
                return this.Ok();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Removes the specified hangfireVersion ids.
        /// </summary>
        /// <param name="ids">The hangfireVersion ids.</param>
        /// <returns>The result of the remove.</returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Delete)]
        public async Task<IActionResult> Remove([FromQuery] List<int> ids)
        {
            if (ids?.Any() != true)
            {
                return this.BadRequest();
            }

            try
            {
                var deletedDtos = await this.hangfireVersionService.RemoveAsync(ids);

#if UseHubForClientInHangfireVersion
#endif
                return this.Ok();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Save all hangfireVersions according to their state (added, updated or removed).
        /// </summary>
        /// <param name="dtos">The list of hangfireVersions.</param>
        /// <returns>The status code.</returns>
        [HttpPost("save")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.HangfireVersions.Save)]
        public async Task<IActionResult> Save(IEnumerable<HangfireVersionDto> dtos)
        {
            var dtoList = dtos.ToList();
            if (!dtoList.Any())
            {
                return this.BadRequest();
            }

            try
            {
                var savedDtos = await this.hangfireVersionService.SaveSafeAsync(
                    dtos: dtoList,
                    principal: this.biaClaimsPrincipalService.GetBiaClaimsPrincipal(),
                    rightAdd: Rights.HangfireVersions.Create,
                    rightUpdate: Rights.HangfireVersions.Update,
                    rightDelete: Rights.HangfireVersions.Delete);
#if UseHubForClientInHangfireVersion
#endif
                return this.Ok();
            }
            catch (ArgumentNullException)
            {
                return this.ValidationProblem();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Generates a csv file according to the filters.
        /// </summary>
        /// <param name="filters">filters ( <see cref="PagingFilterFormatDto"/>).</param>
        /// <returns>a csv file.</returns>
        [HttpPost("csv")]
        [Authorize(Roles = Rights.HangfireVersions.ListAccess)]
        public virtual async Task<IActionResult> GetFile([FromBody] PagingFilterFormatDto filters)
        {
            byte[] buffer = await this.hangfireVersionService.GetCsvAsync(filters);
            return this.File(buffer, BiaConstants.Csv.ContentType + ";charset=utf-8", $"HangfireVersions{BiaConstants.Csv.Extension}");
        }
    }
}
