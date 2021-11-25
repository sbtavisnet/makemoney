using makeb2b.DTO;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class VendaRepository
    {
        HttpClient _api = new HttpClient();
        private string _url = CONST.Constants.ROUTER;


        public VendaRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }


        public async Task<String> GetVendaUltimosPedidos(string codigo)
        {

            string aurl = _url + "pedidos/" + codigo;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }




        public async Task<String> GetPedidoItens(int id)
        {

            string aurl = _url + "pedidos/itens/" + id;
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
