import './styles.css';
import Imagem from "../../img/imgLogo/logo.png";
import { Link } from 'react-router-dom';
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png"
import { useEffect, useState } from 'react';
import blogFetch from '../../axios/config';


export function AdmPaciente() {

    const [usuarios, setUsuarios] = useState([]);

    const listarUsuarios = async () => {
        try {
            const response = await blogFetch.get('/listarUsuarios');
            const data = response.data;
            setUsuarios(data.listarUsuarios);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarUsuarios();
    }, []);


    return (
        <body className="body-adm">
            <header>
                <div className="parte-esquerda-logo">
                    <img className="imagem-logo" src={Imagem} alt="" />
                </div>
                <div className="parte-direita-logo">
                    <Link className='link' to={'/admEmpresa'}>Empresas</Link>
                    <Link className='link' to={'/admPaciente'}>Pacientes</Link>
                    <p>nome do ADM</p>
                    <p className='logout'>Sair</p>
                </div>
            </header>
            <main className="container-total-adm">
                <div className="responsivo-adm">
                    <h1 className="titulo-tabela-adm">Lista de Pacientes</h1>
                    <div className="tabela-adm">
                        <table className="tabela-adm-style">
                            <thead className="thead-adm">
                                <tr>
                                    <th>ID</th>
                                    <th>Paciente</th>
                                    <th>Email</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.length == 0 ? <p>Carregando...</p> :
                                    usuarios.map((usuario) => (
                                        <tr key={usuario.idUsuario}>
                                            <td>{usuario.idUsuario}</td>
                                            <td>{usuario.nomeUsuario}</td>
                                            <td>{usuario.emailUsuario}</td>
                                            <td className="td-botoes">
                                                <button className="botao-deletar-disponivel" ><img className="img-foto" src={fotoDeletar}></img></button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </body>
    );
};