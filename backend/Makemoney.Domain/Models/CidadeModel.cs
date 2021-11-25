using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("cidade")]
    public class CidadeModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("uf")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string UF { get; set; }

        [Column("codigoibge")]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        public string CodigoIbge { get; set; }

        [Column("guid")]
        public string Guids { get; set; }

        public  CidadeModel()
        {
            Guids = Guid.NewGuid().ToString(); 
        }

        


    }
}
