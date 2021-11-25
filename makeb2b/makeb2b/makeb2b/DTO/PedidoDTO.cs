using System.Collections.Generic;

namespace makeb2b.DTO
{

    public class PedidoDTO
    {
        public Cliente cliente { get; set; }
        public List<Produto> produto { get; set; } = new List<Produto>();

        public string formapag { get; set; }
        public float valor { get; set; }
        public float valorpago { get; set; }
        public float taxa { get; set; }
        public string observacao { get; set; }

    }

    public class Cliente
    {
        public string codcli { get; set; }
        public string nomcli { get; set; }
        public string contato { get; set; }
        public string endcli { get; set; }
        public string numendcli { get; set; }
        public string complemnto { get; set; }
        public string baiendcli { get; set; }
        public string cidcli { get; set; }
        public string cepcli { get; set; }
        public string ufcli { get; set; }
        public string endclient { get; set; }
        public string numendclient { get; set; }
        public string compleentrega { get; set; }
        public string baiendclient { get; set; }
        public string cidclient { get; set; }
        public string ufclient { get; set; }
        public string cepclient { get; set; }
        public string cgccpfcli { get; set; }
        public string insestcli { get; set; }
        public string celular { get; set; }
        public string mailcli { get; set; }
        public string dataalteracao { get; set; }
        public string ecommerce { get; set; }
        public int classifica { get; set; }
    }


    public class Produto
    {
        public string codpro { get; set; }
        public string despro { get; set; }
        public float venda { get; set; }
        public string coduni { get; set; }
        public float quantidade { get; set; }
        public float desconto1 { get; set; }
        public string imageulr { get; set; }

    }
}
