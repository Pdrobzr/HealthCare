import './styles.css';
import  Imagem from "../../img/imgLogo/logo.png";
import { Link } from 'react-router-dom';
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png"

export function AdmEmpresa(){
    return(
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
                    <h1 className="titulo-tabela-adm">Lista de Empresas</h1>
                    <div className="tabela-adm">
                        <table className="tabela-adm-style">
                            <thead className="thead-adm">
                                <tr>
                                    <th>ID</th>
                                    <th>Empresa</th>
                                    <th>Email</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>bluemed</td>
                                    <td>bluemed@hotmail.com</td>
                                    <td className="td-botoes">
                                        <button className="botao-deletar-disponivel" ><img className="img-foto" src={fotoDeletar}></img></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </body>
    );
};

