# syntax=docker/dockerfile:1

# ----- Build -----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore (relative to context root = BackendAPI/)
COPY BackendAPI.csproj ./
RUN dotnet restore ./BackendAPI.csproj

# Copy rest and publishtest
COPY . .
RUN dotnet publish -c Release -o /app /p:UseAppHost=false

# ----- Runtime -----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "BackendAPI.dll"]
