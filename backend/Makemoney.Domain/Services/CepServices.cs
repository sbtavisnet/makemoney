using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace makemoney.domain.Services
{
    public class CepServices
    {
        public CepServices()
        { }
        public string cep { get; set; }
        public string logradouro { get; set; }
        public string complemento { get; set; }
        public string bairro { get; set; }
        public string localidade { get; set; }
        public string uf { get; set; }
        public string ibge { get; set; }
    }


    public class CepReposotory
    {

        HttpClient cliente = new HttpClient();


        public CepReposotory()
        {
            cliente.BaseAddress = new Uri("https://viacep.com.br/ws/");
            cliente.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }

        public async Task<CepServices> GetCep(String cep)
        {
            HttpResponseMessage response = await cliente.GetAsync(cep + "/json/");
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<CepServices>(dados);
            }

            return new CepServices();
        }


    }

}
