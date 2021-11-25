using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("cliente")]
    public class ClienteModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("coligada")]
        public int Coligada { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [MinLength(3, ErrorMessage = "O tamanho minímo desse campo é de 3 caracteres !!")]
        [Column("razao")]
        public string Razao { get; set; }

        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [Column("fantasia")]
        public string Fantasia { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("pf")]
        public string PF { get; set; }

        [Column("rua")]
        public string Rua { get; set; }

        [Column("numero")]
        public string Numero { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }

        [Column("bairro")]
        public string Bairro { get; set; }

        [Column("cidade")]
        public string Cidade { get; set; }

        [Column("cidadeid")]
        public string CidadeId { get; set; }

        [Column("uf")]
        public string UF { get; set; }

        [Column("distrito")]
        public string Distrito { get; set; }

        // entrega

        [Column("ruaentrega")]
        public string RuaEntrega { get; set; }

        [Column("numeroentrega")]
        public string NumeroEntrega { get; set; }

        [Column("complementoentrega")]
        public string ComplementoEntrega { get; set; }

        [Column("bairroentrega")]
        public string BairroEntrega { get; set; }

        [Column("cidadeentrega")]
        public string CidadeEntrega { get; set; }

        [Column("cidadeentregaid")]
        public string CidadeEntregaId { get; set; }

        [Column("ufentrega")]
        public string UFEntrega { get; set; }

        [Column("distritoentrega")]
        public string DistritoEntrega { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("cnpj")]
        public string CNPJ { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("inscricao")]
        public string Inscricao { get; set; }

        [Column("fone")]
        public string Fone { get; set; }

        [Column("celular1")]
        public string Celular1 { get; set; }

        [Column("celular2")]
        public string Celular2 { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("emailnfe")]
        public string EmailNfe { get; set; }

        [Column("emailfinanceiro")]
        public string EmailFinanceiro { get; set; }

        [Column("identidade")]
        public string Identidade { get; set; }

        [Column("dtNascimento")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtNascimento { get; set; }

        [Column("Sexo")]
        public string Sexo { get; set; }

        [Column("ativo")]
        public string Ativo { get; set; }

        [Column("dtfundacao")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtFundacao { get; set; }

        [Column("dtinsert")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtInsert { get; set; }

        [Column("dtUpdate")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DtUpdate { get; set; }


        [Column("ramoid")]
        public int RamoId { get; set; }

        [Column("paiscodigo")]
        public int PaisCodigo { get; set; }

        [Column("cnaeid")]
        public int CNAEId { get; set; }
              

        [Column("guid")]
        public string Guids { get; set; }

        public ClienteModel()
        {
           Guids = Guid.NewGuid().ToString();
           Ativo = "S";
           DtInsert = new DateTime();

        }

    }
}
