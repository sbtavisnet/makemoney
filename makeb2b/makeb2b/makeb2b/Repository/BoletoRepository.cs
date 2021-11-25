using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class BoletoRepository
    {
        HttpClient _api      = new HttpClient();
        private string _url = CONST.Constants.ROUTER;
        public BoletoRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }


        public async Task<String> DoEmailBoleto(string codemp, int id)
        {

            string aurl = _url + "boletos/email/"+codemp+"/"+id;
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
