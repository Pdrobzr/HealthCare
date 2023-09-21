import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';

export function Entrar(){

    return(
        <div className='container-total'>
            <div className='parte-esquerda-entrar'>
                <p className='Propaganda-entrar'>+Pacientes</p>
                <p className='Propaganda-entrar'>+Divulgações</p>
                <p className='Propaganda-entrar'>+Agilidade</p>
            </div>
            <div className='parte-direita-entrar'>
                <LogoDescricao title="Bem vindo novamente" description="Divulge o atendimento medico aos pacientes"/>
                <form action="" className='formulario-entrar'>
                    <Input type="text" text="CNPJ" name="cnpj" placeholder="CNPJ"/>
                    <Input type="password" text="Senha" name="senha" placeholder="Senha"/>
                    <Button type="submit" content="Entrar" name="entrar"/>
                    <Links content="Não tem uma conta? " link=" cadastre-se"/>
                    <Links content="Esqueceu a senha?" link=" recuperar"/>
                </form>
            </div>
        </div>
    );
};
