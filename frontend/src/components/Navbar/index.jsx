import React, { useState } from 'react'
import  Image from "../../img/imgLogo/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import blogFetch from '../../axios/config';
import './styles.css'

const Navbar = () => {

    const navigate = useNavigate();

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const token = localStorage.getItem("token");
    const idEmpresa = localStorage.getItem("Empresa");

    const selecionarEmpresa = async (e) => {
        const response = await blogFetch.get(`/selecionarEmpresa/${idEmpresa}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data.selecionarEmpresa;

        setNomeEmpresa(data.nomeEmpresa);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/entrar');
    }

    useEffect(() => {
            selecionarEmpresa();
    }, []);

    return (
        <>
        <header>
            <div className="parte-esquerda-logo">
                <img className="imagem-logo" src={Image} alt="" />
            </div>
            <div className="parte-direita-logo">
                
                <p>{nomeEmpresa}</p>
                <Link className='link' to={'/alterarDados'}>Editar Dados</Link>
                <p className='logout' onClick={logout}>Sair</p>
            </div>
        </header>
        </>     
    )
}

export default Navbar