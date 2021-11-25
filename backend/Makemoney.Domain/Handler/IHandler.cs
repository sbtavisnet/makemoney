using Makemoney.Domain.Commands;
using Makemoney.Domain.Commands.Contracts;


namespace Makemoney.Domain.Handler
{
    public interface IHandler<T> where T : ICommand
    {
      ICommandResult Handle(T command);
    }
}
