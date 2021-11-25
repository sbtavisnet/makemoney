using Makemoney.Domain.Shared;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("produto")]
    public class ProdutoModel : Entity
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("idcoligada")]
        public int IdColigada { get; set; }

        [Column("codigo")]
        public string Codigo { get; set; }


        [Column("ean")]
        public string Ean { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }


        [Column("descricaotexto")]
        public string DescricaoTexto { get; set; }

        [Column("unidade")]
        public string Unidade { get; set; }

        [Column("idgrupo")]
        public int IdGrupo { get; set; }


        [Column("idsubgrupo")]
        public int IdSubGrupo { get; set; }


        [Column("apresentacao")]
        public string Apresentacao { get; set; }

        [Column("informacaotecnica")]
        public string Informacaotecnica{ get; set; }

        [Column("pesobruto")]
        public double PesoBruto { get; set; }

        [Column("pesoliquido")]
        public double PesoLiquido { get; set; }

        [Column("altura")]
        public double Altura { get; set; }

        [Column("largura")]
        public double Largura { get; set; }

        [Column("profundidade")]
        public double Profundidade { get; set; }

        [Column("estoque")]
        public double Estoque { get; set; }

        [Column("precovarejo")]
        public double PrecoVarejo { get; set; }

        [Column("precoatacado")]
        public double PrecoAtacado { get; set; }

        [Column("fatorvenda")]
        public double FatorVenda{ get; set; }

        [Column("ativo")]
        public string Ativo { get; set; }

        [Column("unidadefator")]
        public string UnidadeFator { get; set; }

        [Column("promocao")]
        public string Promocao { get; set; }
        
        [Column("imagem")]
        public string Imagem { get; set; }
                
        [Column("datacad")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DataCadastro { get; set; }


    }
}
