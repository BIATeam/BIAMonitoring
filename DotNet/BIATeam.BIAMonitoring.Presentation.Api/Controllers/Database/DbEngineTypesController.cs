// <copyright file="DbEngineTypesController.cs" company="TheBIADevCompany">
//     Copyright (c) TheBIADevCompany. All rights reserved.
// </copyright>
#define UseHubForClientInDbEngineType
namespace BIATeam.BIAMonitoring.Presentation.Api.Controllers.Database
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
#if UseHubForClientInDbEngineType
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
    /// The API controller used to manage DbEngineTypes.
    /// </summary>
#if !UseHubForClientInDbEngineType
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Minor Code Smell", "S1481:Unused local variables should be removed", Justification = "UseHubForClientInDbEngineType not set")]
#endif
    public class DbEngineTypesController : BiaControllerBase
    {
        /// <summary>
        /// The dbEngineType application service.
        /// </summary>
        private readonly IDbEngineTypeAppService dbEngineTypeService;

        /// <summary>
        /// The BIA claims principal service.
        /// </summary>
        private readonly IBiaClaimsPrincipalService biaClaimsPrincipalService;

#if UseHubForClientInDbEngineType
        private readonly IClientForHubService clientForHubService;
#endif

#if UseHubForClientInDbEngineType
        /// <summary>
        /// Initializes a new instance of the <see cref="DbEngineTypesController" /> class.
        /// </summary>
        /// <param name="dbEngineTypeService">The dbEngineType application service.</param>
        /// <param name="clientForHubService">The hub for client.</param>
        /// <param name="biaClaimsPrincipalService">The BIA claims principal service.</param>
        public DbEngineTypesController(
            IDbEngineTypeAppService dbEngineTypeService,
            IClientForHubService clientForHubService,
            IBiaClaimsPrincipalService biaClaimsPrincipalService)
#else
        /// <summary>
        /// Initializes a new instance of the <see cref="DbEngineTypesController" /> class.
        /// </summary>
        /// <param name="dbEngineTypeService">The dbEngineType application service.</param>
        /// <param name="biaClaimsPrincipalService">The BIA claims principal service.</param>
        public DbEngineTypesController(
            IDbEngineTypeAppService dbEngineTypeService,
            IBiaClaimsPrincipalService biaClaimsPrincipalService)
#endif
        {
#if UseHubForClientInDbEngineType
            this.clientForHubService = clientForHubService;
#endif
            this.dbEngineTypeService = dbEngineTypeService;
            this.biaClaimsPrincipalService = biaClaimsPrincipalService;
        }

        /// <summary>
        /// Get all dbEngineTypes with filters.
        /// </summary>
        /// <param name="filters">The filters.</param>
        /// <returns>The list of dbEngineTypes.</returns>
        [HttpPost("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.ListAccess)]
        public async Task<IActionResult> GetAll([FromBody] PagingFilterFormatDto filters)
        {
            var (results, total) = await this.dbEngineTypeService.GetRangeAsync(filters);
            this.HttpContext.Response.Headers.Append(BiaConstants.HttpHeaders.TotalCount, total.ToString());
            return this.Ok(results);
        }

        /// <summary>
        /// Get a dbEngineType by its identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>The dbEngineType.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Read)]
        public async Task<IActionResult> Get(int id)
        {
            if (id == 0)
            {
                return this.BadRequest();
            }

            try
            {
                var dto = await this.dbEngineTypeService.GetAsync(id);
                return this.Ok(dto);
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Add a dbEngineType.
        /// </summary>
        /// <param name="dto">The dbEngineType DTO.</param>
        /// <returns>The result of the creation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Create)]
        public async Task<IActionResult> Add([FromBody] DbEngineTypeDto dto)
        {
            try
            {
                var createdDto = await this.dbEngineTypeService.AddAsync(dto);
#if UseHubForClientInDbEngineType
#endif
                return this.CreatedAtAction("Get", new { id = createdDto.Id }, createdDto);
            }
            catch (ArgumentNullException)
            {
                return this.ValidationProblem();
            }
        }

        /// <summary>
        /// Update a dbEngineType.
        /// </summary>
        /// <param name="id">The dbEngineType identifier.</param>
        /// <param name="dto">The dbEngineType DTO.</param>
        /// <returns>The result of the update.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Update)]
        public async Task<IActionResult> Update(int id, [FromBody] DbEngineTypeDto dto)
        {
            if (id == 0 || dto == null || dto.Id != id)
            {
                return this.BadRequest();
            }

            try
            {
                var updatedDto = await this.dbEngineTypeService.UpdateAsync(dto);
#if UseHubForClientInDbEngineType
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
        /// Remove a dbEngineType.
        /// </summary>
        /// <param name="id">The dbEngineType identifier.</param>
        /// <returns>The result of the remove.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Delete)]
        public async Task<IActionResult> Remove(int id)
        {
            if (id == 0)
            {
                return this.BadRequest();
            }

            try
            {
                var deletedDto = await this.dbEngineTypeService.RemoveAsync(id);
#if UseHubForClientInDbEngineType
#endif
                return this.Ok();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Removes the specified dbEngineType ids.
        /// </summary>
        /// <param name="ids">The dbEngineType ids.</param>
        /// <returns>The result of the remove.</returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Delete)]
        public async Task<IActionResult> Remove([FromQuery] List<int> ids)
        {
            if (ids?.Any() != true)
            {
                return this.BadRequest();
            }

            try
            {
                var deletedDtos = await this.dbEngineTypeService.RemoveAsync(ids);

#if UseHubForClientInDbEngineType
#endif
                return this.Ok();
            }
            catch (ElementNotFoundException)
            {
                return this.NotFound();
            }
        }

        /// <summary>
        /// Save all dbEngineTypes according to their state (added, updated or removed).
        /// </summary>
        /// <param name="dtos">The list of dbEngineTypes.</param>
        /// <returns>The status code.</returns>
        [HttpPost("save")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Authorize(Roles = Rights.DbEngineTypes.Save)]
        public async Task<IActionResult> Save(IEnumerable<DbEngineTypeDto> dtos)
        {
            var dtoList = dtos.ToList();
            if (!dtoList.Any())
            {
                return this.BadRequest();
            }

            try
            {
                var savedDtos = await this.dbEngineTypeService.SaveSafeAsync(
                    dtos: dtoList,
                    principal: this.biaClaimsPrincipalService.GetBiaClaimsPrincipal(),
                    rightAdd: Rights.DbEngineTypes.Create,
                    rightUpdate: Rights.DbEngineTypes.Update,
                    rightDelete: Rights.DbEngineTypes.Delete);
#if UseHubForClientInDbEngineType
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
        [Authorize(Roles = Rights.DbEngineTypes.ListAccess)]
        public virtual async Task<IActionResult> GetFile([FromBody] PagingFilterFormatDto filters)
        {
            byte[] buffer = await this.dbEngineTypeService.GetCsvAsync(filters);
            return this.File(buffer, BiaConstants.Csv.ContentType + ";charset=utf-8", $"DbEngineTypes{BiaConstants.Csv.Extension}");
        }
    }
}
