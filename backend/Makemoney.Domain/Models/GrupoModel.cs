using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makemoney.Domain.Models
{
    [Table("grupo")]
    public class GrupoModel
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
                
        [Column("ordem")]
        public int Ordem { get; set; }

        [Required(ErrorMessage = "Campo obrigatório. ( S ou N) !!!")]
        [Column("ativo")]
        public string Ativo{ get; set; }

        [Column("imagem")]
        public string Imagem { get; set; }

        [ForeignKey("GrupoId")]
        public virtual ICollection<SubGrupoModel> SubGrupos { get; set; } = new List<SubGrupoModel>();

    }


}
