import { Button } from '../ui/button'
import {DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function DialogAlterarContaEmpresa(){
    return(
        <DialogContent className="text-slate-600">
          <DialogHeader>
            <DialogTitle>Perfil da Empresa</DialogTitle>
            <DialogDescription>
              Atualize as informações do seu estabelecimento visíveis aos seus clientes
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className='space-y-2 py-3'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='senhaAntiga' className='text-right'>Senha antiga</Label>
                <Input type='password' id='senhaAntiga' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]' />
              </div>
            
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right' htmlFor='senhaNova'>Senha nova</Label>
                <Input type='password' id='senhaNova' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'/>
              </div>

              <div className='grid grid-cols-4 items-center gap-2'>
                <Label htmlFor='confirmarSenhar' className='text-right'>Confirmar senha</Label>
                <Input id='confirmarSenhar' type='password' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'/>
              </div>
            </div>

            <DialogFooter>
                <Button className="bg-red-600 max-w-[170px] hover:bg-[#ff3535]">Deletar empresa</Button>
                <DialogDescription>
                  <DialogClose asChild>
                    <Button className="border-2 border-solid border-[rgba(184,185,190,1)] bg-white color text-black hover:border hover:bg-transparent hover:border-solid hover:border-[black]">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button className="bg-emerald-500 ml-2 hover:bg-[#06e84a]">Salvar</Button>
                </DialogDescription>
            </DialogFooter>
          </form>
        </DialogContent>
    )
}
