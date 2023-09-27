import { useEffect, useState } from "react";
import './styles.css';
import  ImagemBotao from "../../img/imagemFundo/botao-editar.png";
import Navbar from "../../components/Navbar";
import blogFetch from "../../axios/config";

export function EspecialidadeDisponivel(){

    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);
    const [especialidade, setEspecialidade] = useState();
    const [quantidade, setQuantidade] = useState();

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
        const response = await blogFetch.post(`/adicionarEspecialidade/${idEmpresa}/${especialidade}`, {
            quantidade: quantidade
        });

        const data = response.data;

        
    }

    const deletarEspecialidade = async (id) => {
        const response = await blogFetch.delete(`/deletarEspecialidade/${id}`);
    }

    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            listarEspecialidades();
            listarEspecialidadesDisponiveis();
        }
    }, [especialidadesDisponiveis]);

    return(
        <div>
        <body>
            <Navbar />
            
            <div className="container-total-especialidade">
                <div className="imagem-empresa-escolhe">
                    <button type="submit" className="botao-imagem" > 
                        <img className="botao-alterar-imagem"src={ImagemBotao}/>
                    </button>
                </div>
                <div className="adicionar-especialidade">
                <form onSubmit={adicionarEspecialidade}>
                    <h1 className="titulo-adicionar-especialidade">Adicionar Especialidade</h1>
                    <div className="centralizando-inputs">
                        <div className="inputs-centralizados">
                            
                            <label className="label-especialidade"htmlFor="escolha-especialidade">Especialidade</label>
                            <select className='escolha-especialidade' name='bairro' onChange={(e) => setEspecialidade(Number(e.target.value))}>
                                    <option disabled>Selecionar especialidade</option>
                                {especialidades.map(especialidade => (
                                    <option key={especialidade.idEspecialidade} value={especialidade.idEspecialidade}>
                                        {especialidade.nomeEspecialidade}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="inputs-centralizados">
                            <label htmlFor="input-quantidade">Quantidade</label>
                            <input className="input-quantidade" type="number" placeholder="Qtd" onChange={(e) => setQuantidade(Number(e.target.value))}/>
                        </div>
                        <div className="inputs-centralizados">
                            <button type="submit" className="botao-especialidade">Adicionar</button>
                        </div>
                        
                    </div>
                    </form>
                </div>
                <div className="tabela-adicionar-especialidade">
                    <table className="styled-table">
                        
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>Disponiveis</th>
                                <th>OFF/ON</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {especialidadesDisponiveis.map(especialidadeEmpresa =>  (
                                <tr className="active-row" key={especialidadeEmpresa.idDisponibilidade}>
                                <td>{especialidadeEmpresa.Especialidade.nomeEspecialidade}</td>
                                <td>{especialidadeEmpresa.quantidadeEspecialidade}</td>
                                <td>
                                    <button className="botao-editar"></button>
                                    <button className="botao-deletar" onClick={() => deletarEspecialidade(especialidadeEmpresa.idDisponibilidade)}></button>
                                </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div> 
            </div>
        </body>
            
        </div>
        
    )
}

