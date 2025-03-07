// <copyright file="RoleId.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Crosscutting.Common.Enum
{
    /// <summary>
    /// The enumeration of all roles.
    /// </summary>
    public enum RoleId
    {
        /// <summary>
        /// The admin role identifier.
        /// </summary>
        Admin = 10001,

        /// <summary>
        /// The admin of the worker service role identifier.
        /// </summary>
        BackAdmin = 10002,

        /// <summary>
        /// The read only on worker service role identifier.
        /// </summary>
        BackReadOnly = 10003,

        /// <summary>
        /// The site admin role identifier.
        /// </summary>
        SiteAdmin = 1,

        // BIAToolKit - Begin RoleId
        // BIAToolKit - End RoleId
    }
}
