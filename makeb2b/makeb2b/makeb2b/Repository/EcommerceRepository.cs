using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using makeb2b.DTO;

namespace makeb2b.Repository
{
    public class EcommerceRepository
    {
        HttpClient _api      = new HttpClient();
        private string _url = CONST.Constants.ROUTER;
        public EcommerceRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }


        public async Task<String> DoPedido(PedidoDTO obj)
        {

            string aurl = _url + "pedidos/";
            var data = new StringContent(
                                JsonSerializer.Serialize(obj),
                                Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _api.PostAsync(aurl, data);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }
    }
}
