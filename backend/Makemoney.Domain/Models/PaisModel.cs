using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("pais")]
    public class PaisModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("descricao")]
        public string Descricao { get; set; }
        
        [Column("codigo")]
        public string Codigo { get; set; }
        


    }

}
