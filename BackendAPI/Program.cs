using Microsoft.EntityFrameworkCore;
using Test;
using BackendAPI.Context;
using BackendAPI.Controllers;
using BackendAPI.Services.Mocks;
using BackendAPI.Services.Interfaces;
using BackendAPI.Services;


var builder = WebApplication.CreateBuilder(args);

var connString = Environment.GetEnvironmentVariable("ConnectionSTrings__Default") ??
builder.Configuration.GetConnectionString("Default");
Console.WriteLine($"Using DB: {connString}");


builder.Services.AddDbContext<MyDBContext>(opt => opt.UseNpgsql(connString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<MessageService.IMessageService, MessageService.MessageService>();


if (builder.Environment.IsDevelopment())
{
    // Når vi er i Development, VIL VI KUN have mock-servicen.
    Console.WriteLine("--> Using Mock User Service");
    builder.Services.AddSingleton<IUserService, MockUserService>(); // Singleton for mock
}
else
{
    // I alle andre tilfælde (produktion osv.), brug den rigtige service.
    Console.WriteLine("--> Using Real User Service");
    builder.Services.AddScoped<IUserService, UserService>();
}



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

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
