// <copyright file="INotificationQueryCustomizer.cs" company="BIATeam">
//     Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.RepoContract
{
    using BIA.Net.Core.Domain.RepoContract.QueryCustomizer;
    using BIATeam.BIAMonitoring.Domain.Notification.Entities;

    /// <summary>
    /// interface use to customize the request on Member entity.
    /// </summary>
    public interface INotificationQueryCustomizer : IQueryCustomizer<Notification>
    {
    }
}
