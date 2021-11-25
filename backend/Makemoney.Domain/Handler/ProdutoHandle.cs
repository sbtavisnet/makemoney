using Flunt.Notifications;
using Makemoney.Domain.Commands.CommandsUpdate;
using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Makemoney.Domain.Shared.Libraries;
using Makemoney.Domain.ViewModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Handler
{
    public class ProdutoHandler : Notifiable
    {
        private readonly IProdutoRepository _repository;
       // List<string> mensagem = new List<string>();

        public ProdutoHandler(IProdutoRepository repository) {
            _repository = repository;
        }


        public async Task<ResultViewModel> Insert(ProdutoModel obj)
        {
            obj.Ativo = "S";
            obj.Promocao = "N";
            
            obj.DataCadastro = DateTime.Today;

            if (AvisnetUtil.IsEmptyOrNull(obj.DescricaoTexto))
            {
                obj.DescricaoTexto = obj.Descricao; 
            }
            obj.PrecoAtacado = obj.PrecoVarejo;
            if (AvisnetUtil.IsEmptyOrNull(obj.UnidadeFator))
                obj.UnidadeFator = obj.Unidade;

            obj.Codigo = await _repository.CodigoAutoinc(obj.Codigo);
            if (AvisnetUtil.IsEmptyOrNull(obj.Ean))
                obj.Ean = obj.Codigo;
            
            await _repository.Insert(obj);

            return ResultViewModel.Mensagem(true, "Sucesso", obj);
        }


        public async Task<ResultViewModel> Update(int id, ProdutoModel obj)
        {

            if (id != obj.Id)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);
            }

            if (id > 0)
            {

               
                var model =  await _repository.FindById(id);
                
                model.Ean = obj.Ean;
                model.Descricao = obj.Descricao;
                model.DescricaoTexto = obj.DescricaoTexto;
                model.Unidade = obj.Unidade;
                model.IdGrupo = obj.IdGrupo;
                model.IdSubGrupo = obj.IdSubGrupo;
                model.Apresentacao = obj.Apresentacao;
                model.Informacaotecnica = obj.Informacaotecnica;
                model.PesoBruto = obj.PesoBruto;
                model.PesoLiquido = obj.PesoLiquido;
                model.Altura = obj.Altura;
                model.Largura = obj.Largura;
                model.Profundidade = obj.Profundidade;
                model.Estoque = obj.Estoque;
                model.PrecoVarejo = obj.PrecoVarejo;
                model.PrecoAtacado = obj.PrecoVarejo;
                model.FatorVenda = obj.FatorVenda;
                model.Ativo = obj.Ativo;
                model.UnidadeFator = obj.UnidadeFator;
                model.Promocao = obj.Promocao;
                model.Imagem = obj.Imagem;

                if (AvisnetUtil.IsEmptyOrNull(obj.UnidadeFator))
                    obj.UnidadeFator = obj.Unidade;


                //mensagem.Clear();
                //mensagem.Add("Favor informar o EAN do produto !!!");

                //return ResultViewModel.Mensagem(false, mensagem[0] , null);


                await _repository.Update(id, model);
                return ResultViewModel.Mensagem(true, "Registro alterado com sucesso !!!", obj);
            }
            return ResultViewModel.Mensagem(false, "Erro ao atualizar registro !!!", obj);


        }


        public ResultViewModel Delete(int id)
        {
            if (id > 0)
            {
                var obj = _repository.Delete(id);
                if (obj.Result == null)
                    return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", null);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }



    }
}
