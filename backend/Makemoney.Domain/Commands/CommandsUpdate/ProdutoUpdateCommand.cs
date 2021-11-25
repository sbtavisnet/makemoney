using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Makemoney.Domain.Commands.CommandsUpdate
{
    public class ProdutoUpdateCommand
    {
              
        public string Ean { get; set; }

        public string Descricao { get; set; }

        public string DescricaoTexto { get; set; }

        public string Unidade { get; set; }

        public int IdGrupo { get; set; }

        public int IdSubGrupo { get; set; }

        public string Apresentacao { get; set; }

        public string Informacaotecnica { get; set; }

        public double PesoBruto { get; set; }

        public double PesoLiquido { get; set; }

       
        public double Altura { get; set; }

        public double Largura { get; set; }

       
        public double Profundidade { get; set; }

        public double Estoque { get; set; }

        public double PrecoVarejo { get; set; }

        public double PrecoAtacado { get; set; }

        public double FatorVenda { get; set; }

        public string Ativo { get; set; }

      
        public string UnidadeFator { get; set; }

        public string Promocao { get; set; }

        public string Imagem { get; set; }

    }
}
