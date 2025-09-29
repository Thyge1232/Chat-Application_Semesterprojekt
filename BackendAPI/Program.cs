using Microsoft.EntityFrameworkCore;
using Test;
using BackendAPI.Context;
using BackendAPI.Controllers;
using BackendAPI.Services.Mocks;
using BackendAPI.Services.Interfaces;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;



var builder = WebApplication.CreateBuilder(args);

var connString = Environment.GetEnvironmentVariable("ConnectionSTrings__Default") ??
builder.Configuration.GetConnectionString("Default");
Console.WriteLine($"Using DB: {connString}");


builder.Services.AddDbContext<MyDBContext>(opt => opt.UseNpgsql(connString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<MessageService.IMessageService, MessageService.MessageService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IUserService, UserService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Secret"] 
             ?? throw new InvalidOperationException("JWT secret mangler i konfigurationen");
var keyBytes = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // kun til udvikling
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});


// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Kør KUN migrations, hvis IKKE er i development-mode 
if (!app.Environment.IsDevelopment())
{

    await using (var scope = app.Services.CreateAsyncScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<MyDBContext>();
        await db.Database.MigrateAsync();
    }
}
app.UseSwagger();
app.UseSwaggerUI();


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
