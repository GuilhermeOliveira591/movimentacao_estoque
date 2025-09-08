using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Desafio.Estoque.Api.Models
{
    public class Movimentacao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string? Descricao { get; set; }

        public int CodigoProduto { get; set; }

        [ForeignKey("CodigoProduto")]
        public Produto? Produto { get; set; }

        public DateTime Data { get; set; }

        public int Quantidade { get; set; }
    }
}