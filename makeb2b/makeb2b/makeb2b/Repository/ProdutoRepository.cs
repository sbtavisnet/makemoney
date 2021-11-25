using makeb2b.DTO;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class ProdutoRepository
    {
        HttpClient _api = new HttpClient();
        private string _url = CONST.Constants.ROUTER;

        public ProdutoRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }
        public async Task<String> GetProduto(string codpro)
        {

            string aurl = _url + "produtos/" + codpro;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


        public async Task<String> GetProdutos(int APage)
        {

            string aurl = _url + "produtos/page/" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }



        public async Task<String> GetProdutosDescricao(string despro, int APage)
        {

            string aurl = _url + "produtos/descricao/" + despro + "/" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


        public async Task<String> GetProdutosGrupo(string grupo, int APage)
        {


            string aurl = _url + "produtos/grupo/" + grupo + "/" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }




        public async Task<String> GetProdutosSubGrupoDescricao(string grupo,
                                                     string subgrupo,
                                                     string despro,
                                                     int APage)
        {


            string aurl = _url + "produtos/grupo/subgrupo/" + grupo + "/" + subgrupo + "/" + despro + "/" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }



        public async Task<String> GetProdutosSubGrupo(string grupo,
                                                     string subgrupo,
                                                     int APage)
        {


            string aurl = _url + "produtos/grupo/subgrupo/" + grupo + "/" + subgrupo + "/" +  "/" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }



    }
}
