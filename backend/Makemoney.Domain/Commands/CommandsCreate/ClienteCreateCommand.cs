using Flunt.Notifications;
using Flunt.Validations;
using Makemoney.Domain.Commands.Contracts;
using System;
using System.ComponentModel.DataAnnotations;


namespace Makemoney.Domain.Commands.CommandsCreate
{
    public class ClienteCreateCommand : Notifiable, ICommand
    {
        public ClienteCreateCommand()
        {

            //Guids = Guid.NewGuid().ToString();
            Ativo = "S";
            DtInsert = new DateTime();
            DtUpdate = DtInsert;

        }

        public int Coligada { get; set; }

        public string Razao { get; set; }
        public string Fantasia { get; set; }
        public string PF { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string CidadeId { get; set; }
        public string UF { get; set; }
        public string Distrito { get; set; }
        // entrega
        public string RuaEntrega { get; set; }
        public string NumeroEntrega { get; set; }
        public string ComplementoEntrega { get; set; }
        public string BairroEntrega { get; set; }
        public string CidadeEntrega { get; set; }
        public string CidadeEntregaId { get; set; }
        public string UFEntrega { get; set; }
        public string DistritoEntrega { get; set; }
        public string CNPJ { get; set; }
        public string Inscricao { get; set; }
        public string Fone { get; set; }
        public string Celular1 { get; set; }
        public string Celular2 { get; set; }
        public string Email { get; set; }
        public string EmailNfe { get; set; }
        public string EmailFinanceiro { get; set; }
        public string Identidade { get; set; }
        [System.ComponentModel.DataAnnotations.DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtNascimento { get; set; }
        public string Sexo { get; set; }
        public string Ativo { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtFundacao { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtInsert { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtUpdate { get; set; }
        public int RamoId { get; set; }
        public int PaisCodigo { get; set; }        
        public int CNAEId { get; set; }

        public void Validate()
        {
            AddNotifications(
             new Contract()
                 .Requires()
                 .HasMinLen(Razao, 3, "Razao", "Campo inválido !!!")
              
         );
        }
    }
}
