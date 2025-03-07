// <copyright file="Program.cs" company="BIATeam">
// Copyright (c) BIATeam. All rights reserved.
// </copyright>

namespace BIATeam.BIAMonitoring.DeployDB
{
    using System;
    using System.Threading.Tasks;
    using BIATeam.BIAMonitoring.Application.Job;
    using BIATeam.BIAMonitoring.Crosscutting.Common;
    using BIATeam.BIAMonitoring.Infrastructure.Data;
    using Hangfire;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using NLog;
    using NLog.Extensions.Hosting;
    using NLog.Extensions.Logging;

    /// <summary>
    /// The base program class.
    /// </summary>
    public static class Program
    {
        /// <summary>
        /// The main method that start the project.
        /// </summary>
        /// <param name="args">The command line arguments.</param>
        /// <returns>Task.</returns>
        public static async Task Main(string[] args)
        {
            await new HostBuilder()
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                    config.AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable(Constants.Application.Environment)}.json", optional: true, reloadOnChange: true);
                    config.AddEnvironmentVariables();
                })
                .ConfigureServices((hostingContext, services) =>
                {
                    IConfiguration configuration = hostingContext.Configuration;

                    services.AddDbContext<DataContext>(options =>
                    {
                        options.UseSqlServer(configuration.GetConnectionString("BIAMonitoringDatabase"));
                    });
                    services.AddHostedService<DeployDBService>();

                    // Comment those lines if you do not use hangfire
                    services.AddHangfireServer(hfOptions =>
                    {
                        hfOptions.ServerName = "DeployHangfireDB";
                        hfOptions.Queues = new string[] { "Deploy" };
                    });
                    services.AddHangfire(config =>
                    {
                        config.UseSqlServerStorage(configuration.GetConnectionString("BIAMonitoringDatabase"));

                        // Initialize here the recuring jobs
                        string projectName = configuration["Project:Name"];
                        RecurringJob.AddOrUpdate<WakeUpTask>($"{projectName}.{typeof(WakeUpTask).Name}", t => t.Run(), configuration["Tasks:WakeUp:CRON"]);
                        RecurringJob.AddOrUpdate<SynchronizeUserTask>($"{projectName}.{typeof(SynchronizeUserTask).Name}", t => t.Run(), configuration["Tasks:SynchronizeUser:CRON"]);
                    });
                })
                .ConfigureLogging((hostingContext, logging) =>
                {
                    IConfiguration configuration = hostingContext.Configuration;
                    LogManager.Configuration = new NLogLoggingConfiguration(configuration.GetSection("NLog"));
                    LogManager.GetCurrentClassLogger().Info($"{Constants.Application.Environment}: {Environment.GetEnvironmentVariable(Constants.Application.Environment)}");
                })
                .UseNLog()
                .RunConsoleAsync();
        }
    }
}
