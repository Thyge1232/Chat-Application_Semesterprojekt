using Microsoft.EntityFrameworkCore;
using Test;

var builder = WebApplication.CreateBuilder(args);

var connString = Environment.GetEnvironmentVariable("CONNECTIONSTRINGS__DEFAULT");


builder.Services.AddDbContext<MyDBContext>(opt => opt.UseNpgsql(connString));
// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
