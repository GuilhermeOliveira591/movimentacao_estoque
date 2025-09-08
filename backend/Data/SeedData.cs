
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Desafio.Estoque.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Desafio.Estoque.Api.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                
                if (context.Produtos.Any())
                {
                    
                }

                var seedJson = File.ReadAllText("seed.json");
                var produtos = JsonSerializer.Deserialize<List<Produto>>(seedJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (produtos != null)
                {
                    context.Produtos.AddRange(produtos);
                    context.SaveChanges();
                }
            }
        }
    }
}
