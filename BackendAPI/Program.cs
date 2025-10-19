using Microsoft.EntityFrameworkCore;
using BackendAPI.Context;
using BackendAPI.Repositories.Interfaces;
using BackendAPI.Repositories.Implementations;
using BackendAPI.Services.Interfaces;
using BackendAPI.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);///123

var connString = Environment.GetEnvironmentVariable("ConnectionStrings__Default") ??
builder.Configuration.GetConnectionString("Default");
Console.WriteLine($"Using DB: {connString}");

builder.Services.AddDbContext<MyDBContext>(opt => opt.UseNpgsql(connString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registrer dine services
builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IConversationRepository, ConversationRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<MessageService.IMessageService, MessageService.MessageService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IAuthService, AuthService>();

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

// Generate password 
var hasher = new PasswordHasher();
var hash = hasher.HashPassword("alice123");
Console.WriteLine("Hash for alice123: " + hash);

// Add services to the container.
builder.Services.AddControllers();


// NYT: Definer CORS-politik
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDBContext>();
    await db.Database.MigrateAsync();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// NYT: Aktiver CORS-middleware
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }