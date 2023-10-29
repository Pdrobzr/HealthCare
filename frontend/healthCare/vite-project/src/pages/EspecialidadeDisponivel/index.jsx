import { useEffect, useState } from "react";
import './styles.css';
import Navbar from "../../components/Navbar";
import blogFetch from "../../axios/config";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import  ImagemBotao from "../../img/imagemFundo/botao-editar.png";
import fotoDeletar from "../../img/imagemFundo/fotoDeletar.png";
import fotoEditar from "../../img/imagemFundo/fotoEditar.png";

export function EspecialidadeDisponivel() {

    const navigate = useNavigate();

    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);
    const [especialidade, setEspecialidade] = useState();
    const [quantidade, setQuantidade] = useState(0);

    const idEmpresa = localStorage.getItem("Empresa");

    const listarEspecialidades = async () => {
        const response = await blogFetch.get('/listarEspecialidades');
        const data = response.data;
   
        setEspecialidades(data.listarEspecialidades);
           
    }

    const listarEspecialidadesDisponiveis = async () => {
        const response = await blogFetch.get(`/listarEspecialidades/${idEmpresa}`);
        const data = response.data;

        setEspecialidadesDisponiveis(data.listarEspecialidadesEmpresas);

    }

    const adicionarEspecialidade = async (e) => {
        e.preventDefault();
        try {
            await blogFetch.post(`/adicionarEspecialidade/${idEmpresa}/${especialidade}`, {
                quantidade: quantidade
            });

            setEspecialidade('');
            setQuantidade(0);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao adicionar!'
              });
        }

        listarEspecialidadesDisponiveis();

    }

    const deletarEspecialidade = async (id) => {
        await blogFetch.delete(`/deletarEspecialidade/${id}`);

        setEspecialidadesDisponiveis(especialidadesDisponiveis.filter(especialidade => especialidade.idDisponibilidade !== id));
    }

    const redirecionarEspecialidade = (id) => {
        navigate(`/alterarEspecialidade/${id}`);
    }

    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            listarEspecialidades();
            listarEspecialidadesDisponiveis();
        }
    }, []);

    return(
        <body className="body-disponivel">
            <Navbar />
            <div className="container-total-especialidade-disponivel">
                <div className="responsivo-disponivel">
                    <div className="imagem-empresa-escolhe-disponivel">
                        <button type="submit" className="botao-imagem-disponivel" > 
                            <img className="botao-alterar-imagem-disponivel"src={ImagemBotao}/>
                        </button>
                    </div>
                    <div className="adicionar-especialidade-disponivel">
                        <form onSubmit={adicionarEspecialidade}>
                            <h1 className="titulo-adicionar-especialidade-disponivel">Adicionar Especialidade</h1>
                            <div className="centralizando-inputs-disponivel">
                                <div className="inputs-centralizados-disponivel">
                                    <label className="label-especialidade-disponivel" htmlFor="escolha-especialidade">Especialidade</label>
                                    <select className='escolha-especialidade-disponivel' value={especialidade} onChange={(e) => setEspecialidade(Number(e.target.value))}>
                                        <option>Selecionar especialidade</option>
                                        {especialidades.map(especialidade => (
                                            <option key={especialidade.idEspecialidade} value={especialidade.idEspecialidade}>
                                                {especialidade.nomeEspecialidade}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="inputs-centralizados-disponivel">
                                    <label className="input-quantidade-disponivel-label" htmlFor="input-quantidade-disponivel">Quantidade</label>
                                    <input className="input-quantidade-disponivel" type="number" value={quantidade} placeholder="Qtd" onChange={(e) => setQuantidade(Number(e.target.value))}/>
                                </div>
                                <div className="inputs-centralizados-disponivel">
                                    <button type="submit" className="botao-especialidade-disponivel">Adicionar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="tabela-adicionar-especialidade-disponivel">
                        <table className="styled-table-disponivel">
                            <thead>
                                <tr>
                                    <th>Especialidade</th>
                                    <th>Disponiveis</th>
                                    <th>Ações</th>
                                    <th>
                                        <label class="switch-disponivel">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                        </label>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {especialidadesDisponiveis.map(especialidadeEmpresa =>  (
                                    <tr className="active-row-disponivel" key={especialidadeEmpresa.idDisponibilidade}>
                                    <td>{especialidadeEmpresa.Especialidade.nomeEspecialidade}</td>
                                    <td>{especialidadeEmpresa.quantidadeEspecialidade}</td>
                                    <td className="td-botoes">
                                        <button className="botao-editar-disponivel" onClick={() => redirecionarEspecialidade(especialidadeEmpresa.idDisponibilidade)}><img className="img-foto" src={fotoEditar}></img></button>
                                        <button className="botao-deletar-disponivel" onClick={() => deletarEspecialidade(especialidadeEmpresa.idDisponibilidade)}><img className="img-foto" src={fotoDeletar}></img></button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>
        </body>
    )
}

