using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("estado")]
    public class EstadoModel
    {
        [Key]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(2, ErrorMessage = "O tamanho maxímo desse campo é de 82 caracteres !!")]
        [Column("uf")]
        public string UF { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("descricao")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("codigoibge")]
        public string CodigoIbge { get; set; }

    }
}
