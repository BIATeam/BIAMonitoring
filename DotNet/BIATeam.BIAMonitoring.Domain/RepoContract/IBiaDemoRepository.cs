// <copyright file="IBiaDemoRepository.cs" company="BIATeam">
// Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.Domain.RepoContract
{
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.RepoContract;

    /// <summary>
    /// Interface for implementations of repositories using BIA Demo database configuration.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TKey">Entity key type.</typeparam>
    public interface IBiaDemoRepository<TEntity, TKey> : ITGenericRepository<TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
    }
}
