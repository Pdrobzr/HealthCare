import { useEffect, useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export function AlterarDados() {

    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const idEmpresa = localStorage.getItem("Empresa");

    const [nomePlaceholder, setNomePlaceholder] = useState("");
    const [emailPlaceholder, setEmailPlaceholder] = useState("");
    const [telefonePlaceholder, setTelefonePlaceholder] = useState();

    const selecionarEmpresa = async (e) => {
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

    const atualizarEmpresa = async (e) => {
        e.preventDefault();

        try {
            const response = await blogFetch.put(`/atualizarEmpresa/${idEmpresa}`, {
                nome: nomePlaceholder,
                email: emailPlaceholder,
                telefone: telefonePlaceholder,
            });

            const data = response.data;

            Swal.fire({
                icon: 'success',
                text: data.message
            });


        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao cadastrar!'
            })
        }
    }

    const deletarEmpresa = async () => {
        try {
            Swal.fire({
                title: 'Tem certeza que deseja apagar perfil da empresa?',
                text: "Perfil apagados não podem ser recuperados!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Deletar'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const response = await blogFetch.delete(`/deletarEmpresa/${idEmpresa}`);
                  const data = response.data;
                  Swal.fire(data.message, '', 'success');
                  localStorage.clear();
                  navigate('/entrar');
                } 
              })
        } catch (error) {
            
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
                <LogoDescricao title="Atualizar Dados" description="" />
                <form onSubmit={atualizarEmpresa} className='formulario'>
                    <label htmlFor="nome fantasia">Nome Fantasia</label>
                    <input type="text" onChange={(e) => setNomePlaceholder(e.target.value)} defaultValue={nomePlaceholder} name="nome fantasia" />
                    <label htmlFor="e-mail">E-mail</label>
                    <input type="email" onChange={(e) => setEmailPlaceholder(e.target.value)} defaultValue={emailPlaceholder} text="E-mail" name="e-mail" />
                    <label htmlFor="telefone">Telefone</label>
                    <input type="number" onChange={(e) => setTelefonePlaceholder(Number(e.target.value))} defaultValue={telefonePlaceholder} text="telefone" name="telefone" />
                    <Button type="submit" content="Editar" name="Editar" />
                    
                </form>
                <button className='delete' onClick={deletarEmpresa}>DELETAR EMPRESA</button>
                <Links content="Deseja continuar com esses dados? " text=" voltar" link="/especialidadeDisponivel" />
            </div>
            <div className='parte-direita'>
            </div>
        </div>
        </>
    );
};
