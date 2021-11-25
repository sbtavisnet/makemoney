namespace Makemoney.Domain.Commands
{
    class GenericCommandResults : ICommandResult
    {
        public GenericCommandResults(){ }

        public GenericCommandResults(bool success, string mensagem, object data)
        {
            Success = success;
            Mensagem = mensagem;
            Data = data;
        }

        public bool Success { get; set; }
        public string Mensagem { get; set; }
        public object Data { get; set; }
    }
}
