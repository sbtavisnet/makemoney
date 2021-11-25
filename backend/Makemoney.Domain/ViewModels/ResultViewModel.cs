using System;
using System.Threading.Tasks;

namespace Makemoney.Domain.ViewModels
{
    public class ResultViewModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public object Data { get; set; }


        public static ResultViewModel Mensagem(bool success, string mensagem, object obj)
        {
            return new ResultViewModel
            {
                Success = success,
                Message = mensagem,
                Data = obj
            };

        }




    }

}
