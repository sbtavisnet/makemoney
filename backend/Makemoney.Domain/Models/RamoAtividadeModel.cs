using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("ramoatividade")]
    public class RamoAtividadeModel
    {
        [Key]
        [Column("id")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [MaxLength(80, ErrorMessage = "O tamanho maxímo desse campo é de 80 caracteres !!")]
        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("guid")]
        public string Guids { get; set; }

        public RamoAtividadeModel()
        {
            Guids = Guid.NewGuid().ToString(); 
        }

        


    }
}
