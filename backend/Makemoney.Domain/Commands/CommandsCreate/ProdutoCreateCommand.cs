using Flunt.Notifications;
using Flunt.Validations;
using Makemoney.Domain.Commands.Contracts;
using System;

namespace Makemoney.Domain.Commands.CommandsCreate
{
    public class ProdutoCreateCommand : Notifiable, ICommandResult
    {

        public int Id { get; set; }
        public int IdColigada { get; set; }
        public string Codigo { get; set; }

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

        public void Validate()
        {
            //if (Descricao.Length < 3)
            //   AddNotification("Descricao", "Descrição inválida !!!")   

            AddNotifications(
                new Contract()
                    .Requires()
                    .HasMinLen(Descricao, 3, "Descricao", "Descriçao inválida !!!")
                    .HasLen(Unidade, 2, "Unidade", "Unidade inválida !!!")

               );

        }
    }
}
