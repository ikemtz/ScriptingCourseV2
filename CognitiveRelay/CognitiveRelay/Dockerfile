FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 59828
EXPOSE 44324

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["CognitiveRelay/CognitiveRelay.csproj", "CognitiveRelay/"]
RUN dotnet restore "CognitiveRelay/CognitiveRelay.csproj"
COPY . .
WORKDIR "/src/CognitiveRelay"
RUN dotnet build "CognitiveRelay.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "CognitiveRelay.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CognitiveRelay.dll"]