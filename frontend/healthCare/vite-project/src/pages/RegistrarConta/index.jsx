import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';

export function RegistrarConta(){

    return(
        <div className='container-total'>
           
            <div className='parte-esquerda'>
                <LogoDescricao title="Registre-se" description="Registre-se e divulge disponibilidades aos seus pacientes"/>
                <form action="" className='formulario'>
                
                <Input type="text" text="CNPJ" name="cnpj" placeholder="CNPJ"/>
                <Input type="email" text="E-mail" name="e-mail" placeholder="E-mail"/>
                <Input type="password" text="Senha" name="senha" placeholder="Senha"/>
                <Button type="submit" content="PRÓXIMO" name="proximo"/>
                <Links content="É registrado? " link=" Entrar"/>
                    
                </form>
            </div>
            <div className='parte-direita'>
                            
            </div>

        </div>
    );
};
