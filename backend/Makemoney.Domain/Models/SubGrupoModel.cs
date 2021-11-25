using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("subgrupo")]
    public class SubGrupoModel
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        //[Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("codigo")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("descricao")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "Campo obrigatório. ( S ou N) !!!")]
        [Column("ativo")]
        public string Ativo{ get; set; }

        [Column("imagem")]
        public string Imagem { get; set; }

        [Required(ErrorMessage = "Campo obrigatório !!")]
        [Column("grupoid")]
        [ForeignKey("Id")]
        public int GrupoId { get; set; }
        //public virtual GrupoModel Grupo { get; set; }

    }


}
