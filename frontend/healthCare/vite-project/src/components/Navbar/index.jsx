import React, { useState } from 'react'
import  Image from "../../img/imgLogo/logo.png";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import blogFetch from '../../axios/config';

const Navbar = () => {

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

    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            selecionarEmpresa();
        }
    }, []);

    return (
        <>
        <header>
            <div className="parte-esquerda-logo">
                <img className="imagem-logo" src={Image} alt="" />
            </div>
            <div className="parte-direita-logo">
                <div>
                <p>{nomeEmpresa}</p>
                <Link to={'/alterarDados'}>Editar Dados</Link>
                </div>
            </div>
        </header>
        </>     
    )
}

export default Navbar