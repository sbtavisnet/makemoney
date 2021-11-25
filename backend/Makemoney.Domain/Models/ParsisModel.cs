using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("parsis")]
    public class ParsisModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [MinLength(3, ErrorMessage = "O tamanho minímo desse campo é de 3 caracteres !!")]
        [Column("razao")]
        public string Razao { get; set; }

        [Column("fantasia")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [MinLength(3, ErrorMessage = "O tamanho minímo desse campo é de 3 caracteres !!")]
        public string Fantasia { get; set; }

        [Column("cep")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MinLength(8, ErrorMessage = "O tamanho desse campo é de 8 caracteres !!")]
        public string Cep { get; set; }

        [Column("Endereco")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string Endereco { get; set; }

        [Column("numero")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string Numero { get; set; }

        [Column("complemento")]
        public string Complemento { get; set; }
        
        [Column("bairro")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string Bairro { get; set; }
        
        [Column("cidade")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string Cidade { get; set; }

        [Column("uf")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string UF { get; set; }

        [Column("cnpj")]
        public string CNPJ { get; set; }

        [Column("ie")]
        public string IE { get; set; }

        [Column("fone")]
        public string Fone { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Range(0, int.MaxValue, ErrorMessage = "Ramo de atividade inválido !!")]
        [Column("ramoatividade")]
        public int Ramoatividade { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(8, ErrorMessage = "O tamanho maxímo desse campo é de 8 caracteres !!")]
        [MinLength(8, ErrorMessage = "O tamanho minímo desse campo é de 8 caracteres !!")]
        [Column("codigoibge")]
        public string Codigoibge { get; set; }

        [Column("regime")]
        public int Regime { get; set; }

        [Column("ativo")]
        public string Ativo { get; set; }

    }
}
