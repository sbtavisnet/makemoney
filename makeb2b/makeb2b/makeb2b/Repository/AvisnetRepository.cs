using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class AvisnetRepository
    {
        HttpClient _api      = new HttpClient();
        private string _url = CONST.Constants.ROUTER;
        public AvisnetRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }


        public async Task<String> GetAvisnet()
        {

            string aurl = _url + "avisnet";
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
