import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import blogFetch from '@/axios/config'

export function DialogAlterarContaEmpresa({fechouDialog}) {

  const navigate = useNavigate();

  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confimarSenhaNova, setConfirmarSenhaNova] = useState("");

  const { id } = useParams();

  const atualizarSenha = async (e) => {
    e.preventDefault();

    try {
      if (senhaNova != confimarSenhaNova) {
        Swal.fire({
          icon: 'error',
          text: 'Erro! As duas senhas não conferem!'
        });

        return
      } else {
        const token = localStorage.getItem("token");

        const response = await blogFetch.put(`/atualizarSenha/${id}`, {
          senhaAntiga: senhaAntiga,
          senhaNova: senhaNova
        }, {
          headers: {
            Authorization: `Bearer ${token}`
        }
        });

        const data = response.data;

        Swal.fire({
          icon: 'success',
          text: data.message
        });

        navigate('/especialidadeDisponivel');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Erro ao alterar senha!'
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.length == 0) {
      navigate('/entrar');
    }
  }, []);

  return (
    <DialogContent className="text-slate-600">
      <DialogHeader>
        <DialogTitle>Perfil da Empresa</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis aos seus clientes
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={atualizarSenha}>
        <div className='space-y-2 py-3'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='senhaAntiga' className='text-right'>Senha antiga</Label>
            <Input
              onChange={(e) => setSenhaAntiga(e.target.value)}
              type='password' id='senhaAntiga' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right' htmlFor='senhaNova'>Senha nova</Label>
            <Input
              onChange={(e) => setSenhaNova(e.target.value)}
              type='password' id='senhaNova' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-2'>
            <Label htmlFor='confirmarSenhar' className='text-right'>Confirmar senha</Label>
            <Input
              onChange={(e) => setConfirmarSenhaNova(e.target.value)}
              id='confirmarSenhar' type='password' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'
            />
          </div>
        </div>

        <DialogFooter>
          <DialogDescription>
            <DialogClose asChild>
              <Button className="border-2 border-solid border-[rgba(184,185,190,1)] bg-white color text-black hover:border hover:bg-transparent hover:border-solid hover:border-[black]">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={() => fechouDialog(false)}
              type="submit"
              className="bg-emerald-500 ml-2 hover:bg-[#06e84a]">Salvar</Button>
          </DialogDescription>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
