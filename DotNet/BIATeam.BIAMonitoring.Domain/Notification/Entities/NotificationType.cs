// <copyright file="NotificationType.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.Notification.Entities
{
    using System.Collections.Generic;
    using BIA.Net.Core.Domain;
    using BIATeam.BIAMonitoring.Domain.Translation.Entities;

    /// <summary>
    /// The NotificationType entity.
    /// </summary>
    public class NotificationType : VersionedTable, IEntity<int>
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the notification codes
        /// e.g: Task, Info, Success, Warning, Error.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the notification codes
        /// e.g: Task, Info, Success, Warning, Error.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Gets or sets the notification type translations.
        /// </summary>
        public virtual ICollection<NotificationTypeTranslation> NotificationTypeTranslations { get; set; }
    }
}