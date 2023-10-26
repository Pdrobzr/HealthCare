import { useEffect, useState } from "react";
import './styles.css';
import ImagemBotao from "../../img/imagemFundo/botao-editar.png";
import Navbar from "../../components/Navbar";
import blogFetch from "../../axios/config";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export function AlterarEspecialidade() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [especialidade, setEspecialidade] = useState();
    const [quantidade, setQuantidade] = useState();

    const selecionarDisponibilidade = async (id) => {
        const response = await blogFetch.get(`/selecionarDisponibilidade/${id}`);
        const data = response.data;

        setEspecialidade(data.selecionarDisponibilidade.Especialidade.nomeEspecialidade);
        setQuantidade(data.selecionarDisponibilidade.quantidadeEspecialidade);

    }

    const editarEspecialidade = async (e) => {
        e.preventDefault();
        try {
            await blogFetch.put(`/informarEspecialidade/${id}`, {
                quantidade: quantidade
            });

            navigate('/especialidadeDisponivel');
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao editar!'
            });
        }

    }

    useEffect(() => {
        if (localStorage.length == 0) {
            navigate('/entrar');
        } else {
            selecionarDisponibilidade(id)
        }
    }, []);

    return (
            <body className="body-disponivel">
                <Navbar />
                <div className="container-total-especialidade">
                    <div className="responsivo-disponivel">
                        <div className="imagem-empresa-escolhe">
                            <button type="submit" className="botao-imagem" >
                                <img className="botao-alterar-imagem" src={ImagemBotao} />
                            </button>
                        </div>
                        <div className="adicionar-especialidade">
                            <form onSubmit={editarEspecialidade}>
                                <h1 className="titulo-editar-especialidade">Editar Quantidade</h1>
                                <div className="centralizando-inputs">
                                    <div className="inputs-centralizados">
                                        <label className="label-especialidade" htmlFor="escolha-especialidade">Especialidade</label>
                                        <select className='escolha-especialidade' value={especialidade}>
                                            <option>{especialidade}</option>
                                        </select>
                                    </div>
                                    <div className="inputs-centralizados">
                                        <label htmlFor="input-quantidade">Quantidade</label>
                                        <input defaultValue={quantidade} className="input-quantidade" type="number" placeholder="Qtd" onChange={(e) => setQuantidade(Number(e.target.value))} />
                                    </div>
                                    <div className="inputs-centralizados">
                                        <button type="submit" className="botao-editarEspecialidade">Editar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
    )
}

