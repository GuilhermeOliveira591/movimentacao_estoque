using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Desafio.Estoque.Api.Models
{
    public class Produto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CodigoProduto { get; set; }
        public string? DescricaoProduto { get; set; }
        public int Estoque { get; set; }
    }
}