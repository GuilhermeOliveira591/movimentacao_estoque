using Desafio.Estoque.Api.Data;
using Desafio.Estoque.Api.Models;
using Desafio.Estoque.Api.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Desafio.Estoque.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimentacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovimentacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/movimentacoes
        [HttpGet]
        public async Task<IActionResult> GetMovimentacoes([FromQuery] int? codigoProduto)
        {
            var query = _context.Movimentacoes.AsQueryable();

            if (codigoProduto.HasValue)
            {
                query = query.Where(m => m.CodigoProduto == codigoProduto.Value);
            }

            var movimentacoes = await query.OrderByDescending(m => m.Data).ToListAsync();
            return Ok(movimentacoes);
        }

        // POST: api/movimentacoes
        [HttpPost]
        public async Task<IActionResult> CreateMovimentacao([FromBody] CreateMovimentacaoDto movimentacaoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var produto = await _context.Produtos.FindAsync(movimentacaoDto.CodigoProduto);
            if (produto == null)
            {
                return NotFound("Produto não encontrado.");
            }

            var movimentacao = new Movimentacao
            {
                Descricao = movimentacaoDto.Descricao,
                CodigoProduto = movimentacaoDto.CodigoProduto,
                Data = DateTime.UtcNow,
                Quantidade = movimentacaoDto.Quantidade
            };

            produto.Estoque += movimentacao.Quantidade;

            _context.Movimentacoes.Add(movimentacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovimentacoes), new { id = movimentacao.Id }, movimentacao);
        }

        // POST: api/movimentacoes/estornar/5
        [HttpPost("estornar/{id}")]
        public async Task<IActionResult> EstornarMovimentacao(int id)
        {
            var movimentacaoOriginal = await _context.Movimentacoes.FindAsync(id);
            if (movimentacaoOriginal == null)
            {
                return NotFound("Movimentação original não encontrada.");
            }

            var produto = await _context.Produtos.FindAsync(movimentacaoOriginal.CodigoProduto);
            if (produto == null)
            {
                return NotFound("Produto associado à movimentação não encontrado.");
            }

            var estorno = new Movimentacao
            {
                Descricao = $"Estorno de: {movimentacaoOriginal.Descricao}",
                CodigoProduto = movimentacaoOriginal.CodigoProduto,
                Data = DateTime.UtcNow,
                Quantidade = -movimentacaoOriginal.Quantidade
            };

            produto.Estoque += estorno.Quantidade;

            _context.Movimentacoes.Add(estorno);
            await _context.SaveChangesAsync();

            return Ok(estorno);
        }
    }
}