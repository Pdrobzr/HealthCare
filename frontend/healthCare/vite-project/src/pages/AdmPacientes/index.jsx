import './styles.css';
import Imagem from "../../img/imgLogo/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png"
import { useEffect, useState } from 'react';
import blogFetch from '../../axios/config';


export function AdmPaciente() {

    const admin = localStorage.getItem('admin');

    const navigate = useNavigate();

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

    const logout = () => {
        localStorage.clear();
        navigate('/entrarAdmin');
    }

    const deletarUsuario = async (id) => {
        try {
            await blogFetch.delete(`/deletarUsuario/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== id));
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const admin = localStorage.getItem('admin');
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else if(!admin){
            navigate('/especialidadeDisponivel');
        } else {
            listarUsuarios();
        }
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
                    <p className='logout' onClick={logout}>Sair</p>
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
                                {usuarios.map((usuario) => (
                                        <tr key={usuario.idUsuario}>
                                            <td>{usuario.idUsuario}</td>
                                            <td>{usuario.nomeUsuario}</td>
                                            <td>{usuario.emailUsuario}</td>
                                            <td className="td-botoes">
                                                <button className="botao-deletar-disponivel" onClick={() => deletarUsuario(usuario.idUsuario)} ><img className="img-foto" src={fotoDeletar}></img></button>
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