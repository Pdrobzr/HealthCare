import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export function Entrar(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const autenticarEmpresa = async (e) => {
        e.preventDefault();
        try {
            const response = await blogFetch.post('/autenticarEmpresa', {
                email: email, senha: senha
            });
            const data = response.data;

            localStorage.setItem("token", data.token);

            localStorage.setItem("Empresa", data.Empresa.idEmpresa);

            Swal.fire({
                icon: 'success',
                text: data.message
              });

              navigate('/especialidadeDisponivel');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao autenticar! Email ou Senha inválidos!'
              });

             
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
                <div className='responsivo'>
                    <LogoDescricao title="Bem vindo novamente" description="Divulge o atendimento medico aos pacientes"/>
                    <form onSubmit={autenticarEmpresa} className='formulario-entrar'>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" text="Email" name="Email" placeholder="Email"/>
                        <input onChange={(e) => setSenha(e.target.value)} type="password" text="Senha" name="senha" placeholder="Senha"/>
                        <Button type="submit" content="Entrar" name="entrar"/>
                        <Links content="Não tem uma conta? " text=" cadastre-se" link="/registrarDados"/>
                        <Links content="Deseja voltar para home?" text=" voltar" link="/"/>
                    </form>
                </div>
            </div>
        </div>
    );
};
