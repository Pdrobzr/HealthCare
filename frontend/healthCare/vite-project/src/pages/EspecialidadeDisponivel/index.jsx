import { useState } from "react";
import './styles.css';
import  Image from "../../img/imgLogo/logo.png";
import  ImagemBotao from "../../img/imagemFundo/botao-editar.png";

export function EspecialidadeDisponivel(){

    return(
        
        <body>
            <header>
                <div className="parte-esquerda-logo">
                    <img className="imagem-logo" src={Image} alt="" />
                </div>
                <div className="parte-direita-logo">
                    <p>nomeEmpresa</p>
                </div>
            </header> 
            
            <div className="container-total-especialidade">
                <div className="imagem-empresa-escolhe">
                    <button type="submit" className="botao-imagem" > 
                        <img className="botao-alterar-imagem"src={ImagemBotao}/>
                    </button>
                </div>
                <div className="adicionar-especialidade">
                    <h1 className="titulo-adicionar-especialidade">Adicionar Especialidade</h1>
                    <div className="centralizando-inputs">
                        <div className="inputs-centralizados">
                            <label className="label-especialidade"htmlFor="escolha-especialidade">Especialidade</label>
                            <select className='escolha-especialidade'>
                                <option value="" disabled selected hidden>Especialidade</option>
                                <option disabled>Selecionar especialidade</option>
                            </select>
                        </div>
                        <div className="inputs-centralizados">
                            <label htmlFor="input-quantidade">Quantidade</label>
                            <input className="input-quantidade" type="number" placeholder="Qtd"/>
                        </div>
                        <div className="inputs-centralizados">
                            <button className="botao-especialidade">Adicionar</button>
                        </div>
                        
                    </div>
                </div>
                <div className="tabela-adicionar-especialidade">
                    <table class="styled-table">
                        
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>Disponiveis</th>
                                <th>OFF/ON</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr class="active-row">
                                <td>Ortopedista</td>
                                <td>4</td>
                                <td>XX</td>
                            </tr>
                            <tr class="active-row">
                                <td>Ortopedista</td>
                                <td>4</td>
                                <td>XX</td>
                            </tr>
                            <tr class="active-row">
                                <td>Ortopedista</td>
                                <td>4</td>
                                <td>XX</td>
                            </tr>
                        </tbody>
                    </table>
                </div> 
            </div>
        </body>
            
        
        
    )
}

