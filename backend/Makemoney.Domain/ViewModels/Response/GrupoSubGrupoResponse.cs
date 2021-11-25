
using System.Collections.Generic;

namespace Makemoney.Domain.ViewModels.Response
{
    public class GrupoResponse
    {


        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public int Ordem { get; set; }
        public string Ativo { get; set; }
        public string Imagem { get; set; }

        public ICollection<SubGrupoResponse> SubGrupos { get; set; }




    }


    public class SubGrupoResponse
    {
        public int Id { get; set; }
        public int GrupoId { get; set; }
        public string Codigo { get; set; }
        public string Descricao { get; set; }

    }

}
