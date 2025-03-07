// <copyright file="UserExtensions.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.User
{
    using BIATeam.BIAMonitoring.Domain.User.Entities;

    /// <summary>
    /// Extension for User.
    /// </summary>
    public static class UserExtensions
    {
        /// <summary>
        ///  Return the user format for display.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>The formated display.</returns>
        public static string Display(this User user)
        {
            string display = null;

            if (user != null)
            {
                display = $"{user.LastName} {user.FirstName} ({user.Login})";
            }

            return display;
        }

        /// <summary>
        ///  Return the user short format to display in list ....
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>The formated display.</returns>
        public static string DisplayShort(this User user)
        {
            string display = null;

            if (user != null)
            {
                display = $"{user.LastName} {user.FirstName}";
            }

            return display;
        }
    }
}