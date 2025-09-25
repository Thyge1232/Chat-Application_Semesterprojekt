using Microsoft.EntityFrameworkCore; 
using Npgsql.EntityFrameworkCore.PostgreSQL;
namespace Test;

public class MyDBContext : DbContext
{
    public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
    {
    }

    public DbSet<DbTest> Tests { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<DbTest>().HasData(
            new DbTest { DbTestId = 1, testString = "Test!!!" }
        );
    }

}