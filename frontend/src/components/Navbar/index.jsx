import  { useState } from 'react'
import  Image from "../../img/imgLogo/logoHealthCare 2.png";
import  iconImageConfig from "../../img/imagemFundo/iconConfig.png";
import  iconImageExit from "../../img/imagemFundo/iconExit.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import blogFetch from '../../axios/config';
import './styles.css'

const Navbar = () => {

    const navigate = useNavigate();

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const token = localStorage.getItem("token");
    const idEmpresa = localStorage.getItem("Empresa");

    const selecionarEmpresa = async () => {
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
                
                <strong>{nomeEmpresa}</strong>
                <Link className='link' to={'/alterarDados'}><img src={iconImageConfig}/></Link>
                <p className='logout' onClick={logout}><img src={iconImageExit} /></p>
            </div>
        </header>
        </>     
    )
}

export default Navbar