// <copyright file="QueryCustomMode.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.RepoContract
{
    /// <summary>
    /// Custom mode for the query.
    /// </summary>
    public static class QueryCustomMode
    {
        /// <summary>
        /// Mode Update the view of type user.
        /// </summary>
        public const string ModeUpdateViewUsers = "UpdateViewUsers";

        /// <summary>
        /// Mode Update the view of type site.
        /// </summary>
        public const string ModeUpdateViewTeams = "UpdateViewTeams";

        /// <summary>
        /// Mode Update the view of type site.
        /// </summary>
        public const string ModeUpdateViewTeamsAndUsers = "UpdateViewTeamsAndUsers";
    }
}
