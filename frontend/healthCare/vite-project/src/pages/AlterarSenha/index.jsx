import { useEffect, useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export function AlterarSenha() {

    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const idEmpresa = localStorage.getItem("Empresa");

    const [senhaAntiga, setSenhaAntiga] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [confimarSenhaNova, setConfirmarSenhaNova] = useState();

    const selecionarEmpresa = async () => {
        const response = await blogFetch.get(`/selecionarEmpresa/${idEmpresa}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data.selecionarEmpresa;

        setNomePlaceholder(data.nomeEmpresa);
        setEmailPlaceholder(data.emailEmpresa);
        setTelefonePlaceholder(data.telefoneEmpresa);
    }

    const atualizarSenha = async (e) => {
        e.preventDefault();

        try {

            


        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao atualizar!'
            })
        }
    }


    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            selecionarEmpresa();
        }
    }, []);



    return (
        <>
            <div className='container-total'>

                <div className='parte-esquerda'>
                    <LogoDescricao title="Atualizar Senha" description="" />
                    <form onSubmit={atualizarSenha} className='formulario'>
                        <label htmlFor="nome fantasia">Senha Antiga</label>
                        <input type="text" onChange={(e) => setSenhaAntiga(e.target.value)} value={senhaAntiga} placeholder='Digite a senha antiga...' />
                        <label htmlFor="e-mail">Senha nova</label>
                        <input type="email" onChange={(e) => setSenhaNova(e.target.value)} value={senhaNova} placeholder="Digite a nova senha..." />
                        <label htmlFor="telefone">Confirmar senha</label>
                        <input type="number" onChange={(e) => setConfirmarSenhaNova(e.target.value)} value={confimarSenhaNova} placeholder="Confimar nova senha..." />
                        <Button type="submit" content="Alterar" name="Editar" />

                    </form>
                    <Links content="Deseja continuar com essa senha? " text=" voltar" link="/especialidadeDisponivel" />
                </div>
                <div className='parte-direita'>
                </div>
            </div>
        </>
    );
};
