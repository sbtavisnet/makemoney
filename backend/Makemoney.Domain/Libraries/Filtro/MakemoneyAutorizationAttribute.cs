using Microsoft.AspNetCore.Mvc.Filters;
using System;


namespace Makemoney.Domain.Libraries.Filtro
{
    public class MakemoneyAutorizationAttribute : Attribute, Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter
    {

        //LoginIgreja _loginIgreja;
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            
            //_loginIgreja = (LoginIgreja) context.HttpContext.RequestServices.GetService(typeof(LoginIgreja));
            //Igreja igreja = _loginIgreja.GetIgreja();
            //if (igreja == null)
            //{
            //    context.Result = new ContentResult() { Content = "Acesso negado." };
            //}
        }

    }
}
