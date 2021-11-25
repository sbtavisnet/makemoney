using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class GrupoRepository
    {
        HttpClient _api = new HttpClient();
        private string _url = CONST.Constants.ROUTER;

        public object JsonConvert { get; private set; }

        public GrupoRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }
        public async Task<String> GetGrupos()
       {

            string aurl = _url + "grupos";
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }

        public async Task<String> GetGrupo(string AGrupo)
        {
            string aurl = _url + "grupos/"+AGrupo;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }

        public async Task<String> GetGrupoSubGrupo(string AGrupo)
        {

            string aurl = _url + "grupos/subgrupo/"+AGrupo;
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
