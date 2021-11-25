using Makemoney.Domain.Models;
using System.Net;
using System.Net.Mail;

namespace Makemoney.Domain.Libraries.Email
{
    public class ContatoEmail
    {
        private Contato contato;

        public ContatoEmail(Contato contato)
        {
            this.contato = contato;
        }

        public static void EnviarContatoPorEmail(Contato contato)
        {
            /*
             * SMTP -> Servidor que vai enviar a mensagem.
             */
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("sbtlutero@gmail.com", "Sbt@1505");
            smtp.EnableSsl = true;

            string corpoMsg = string.Format("<h2>Contato - iLutero</h2>" +
                "<b>Nome: </b> {0} <br />" +
                "<b>E-mail: </b> {1} <br />" +
                "<b>Mensagem: </b> {2} <br />" +
                "<br /> E-mail enviado automaticamente do App iLutero.",
                contato.nome,
                contato.email,
                contato.mensagem
            );


            /*
             * MailMessage -> Construir a mensagem
             */
            MailMessage mensagem = new MailMessage();
            mensagem.From = new MailAddress("sbtilutero@gmail.com");
            mensagem.To.Add(contato.email);

            mensagem.Subject = "Recuperação de Senha: " + contato.email;
            mensagem.Body = corpoMsg;
            mensagem.IsBodyHtml = true;

            //Enviar Mensagem via SMTP
            smtp.Send(mensagem);
        }
    }
    
}


// video mostrando como ativar a conta no google para envio de e-mail via smtp
// https://www.youtube.com/watch?v=uyy-RJk8YRo

