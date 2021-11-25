using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("cnae")]
    public class CNAEModel
    {
        [Key]
        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("codigo")]
        public string codigo { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("descricao")]
        public string Descricao { get; set; }
        
        [Column("guid")]
        public string Guids { get; set; }
        
        public CNAEModel()
        {
            Guids = Guid.NewGuid().ToString();
        }



    }

}
