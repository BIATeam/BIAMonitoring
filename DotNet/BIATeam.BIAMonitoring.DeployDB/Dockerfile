#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Url Red Hat container:
#https://catalog.redhat.com/software/containers/search

#.NET Runtime Only
FROM registry.access.redhat.com/ubi8/dotnet-80-runtime@sha256:bcca46f2b836ebcb0d552aac3e455f7131907e64627b2d5711cfbb4ef381e9b6 AS base
WORKDIR /app
#USER root
#COPY /ca-certificates/ca-bundle.crt /etc/pki/ca-trust/source/anchors/ca-bundle.crt
#RUN update-ca-trust
#RUN chmod a+rx /etc/pki/ca-trust/source/anchors/ca-bundle.crt
#USER 1001

#.NET SDK
FROM registry.access.redhat.com/ubi8/dotnet-80@sha256:d2fc25735545ed3649a094cc36f78cfaebed2d0744a456cae9a33909025ac4da AS build
WORKDIR /src
#USER root
#COPY /ca-certificates/ca-bundle.crt /etc/pki/ca-trust/source/anchors/ca-bundle.crt
#RUN update-ca-trust

COPY ["nuget.config", "."]
COPY ["BIATeam.BIADemo.DeployDB/BIATeam.BIADemo.DeployDB.csproj", "BIATeam.BIADemo.DeployDB/"]
COPY ["BIATeam.BIADemo.Application/BIATeam.BIADemo.Application.csproj", "BIATeam.BIADemo.Application/"]
COPY ["BIATeam.BIADemo.Crosscutting.Common/BIATeam.BIADemo.Crosscutting.Common.csproj", "BIATeam.BIADemo.Crosscutting.Common/"]
COPY ["BIAPackage/BIA.Net.Core.Common/BIA.Net.Core.Common.csproj", "BIAPackage/BIA.Net.Core.Common/"]
COPY ["BIATeam.BIADemo.Domain.Dto/BIATeam.BIADemo.Domain.Dto.csproj", "BIATeam.BIADemo.Domain.Dto/"]
COPY ["BIAPackage/BIA.Net.Core.Domain.Dto/BIA.Net.Core.Domain.Dto.csproj", "BIAPackage/BIA.Net.Core.Domain.Dto/"]
COPY ["BIATeam.BIADemo.Domain/BIATeam.BIADemo.Domain.csproj", "BIATeam.BIADemo.Domain/"]
COPY ["BIAPackage/BIA.Net.Core.Domain/BIA.Net.Core.Domain.csproj", "BIAPackage/BIA.Net.Core.Domain/"]
COPY ["BIAPackage/BIA.Net.Core.Application/BIA.Net.Core.Application.csproj", "BIAPackage/BIA.Net.Core.Application/"]
COPY ["BIATeam.BIADemo.Infrastructure.Data/BIATeam.BIADemo.Infrastructure.Data.csproj", "BIATeam.BIADemo.Infrastructure.Data/"]
COPY ["BIAPackage/BIA.Net.Core.Infrastructure.Data/BIA.Net.Core.Infrastructure.Data.csproj", "BIAPackage/BIA.Net.Core.Infrastructure.Data/"]
RUN dotnet restore "BIATeam.BIADemo.DeployDB/BIATeam.BIADemo.DeployDB.csproj"
COPY . .
WORKDIR "/src/BIATeam.BIADemo.DeployDB"
RUN dotnet build "BIATeam.BIADemo.DeployDB.csproj" -c Release -o /app/build /p:RunAnalyzers=false

FROM build AS publish
RUN dotnet publish "BIATeam.BIADemo.DeployDB.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BIATeam.BIADemo.DeployDB.dll"]