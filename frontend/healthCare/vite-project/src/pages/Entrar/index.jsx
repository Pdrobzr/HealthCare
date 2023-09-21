import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';

export function Entrar(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const autenticarEmpresa = async (e) => {
        e.preventDefault();
        try {
            const response = await blogFetch.post('/autenticarEmpresa', {
                email: email, senha: senha
            });
            const data = response.data;

            alert(data.message);
        } catch (error) {
            alert("Erro ao logar!, email ou senha inválidos!");
        }
    }

    return(
        <div className='container-total'>
            <div className='parte-esquerda-entrar'>
                <p className='Propaganda-entrar'>+Pacientes</p>
                <p className='Propaganda-entrar'>+Divulgações</p>
                <p className='Propaganda-entrar'>+Agilidade</p>
            </div>
            <div className='parte-direita-entrar'>
                <LogoDescricao title="Bem vindo novamente" description="Divulge o atendimento medico aos pacientes"/>
                <form onSubmit={autenticarEmpresa} className='formulario-entrar'>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" text="Email" name="Email" placeholder="Email"/>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" text="Senha" name="senha" placeholder="Senha"/>
                    <Button type="submit" content="Entrar" name="entrar"/>
                    <Links content="Não tem uma conta? " link=" cadastre-se"/>
                    <Links content="Esqueceu a senha?" link=" recuperar"/>
                </form>
            </div>
        </div>
    );
};
