using Microsoft.EntityFrameworkCore;
using Test;
using BackendAPI.Controllers;
var builder = WebApplication.CreateBuilder(args);

var connString = Environment.GetEnvironmentVariable("ConnectionSTrings__Default") ??
builder.Configuration.GetConnectionString("Default");
Console.WriteLine($"Using DB: {connString}");


builder.Services.AddDbContext<MyDBContext>(opt => opt.UseNpgsql(connString));
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<TestController>();


// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
