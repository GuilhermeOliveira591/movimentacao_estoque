
using System.ComponentModel.DataAnnotations;

namespace Desafio.Estoque.Api.Models.DTOs
{
    public class CreateMovimentacaoDto
    {
        [Required]
        public string? Descricao { get; set; }

        [Required]
        public int CodigoProduto { get; set; }

        [Required]
        public int Quantidade { get; set; }
    }
}
