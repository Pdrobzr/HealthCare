import { useState } from "react";
import './styles.css';
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import  Image from "../../img/imgLogo/logo.png";

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
            
            <div className="container-toal-especialidade">
            <div className="imagem-empresa-escolhe">
            </div>
            <div className="adicionar-especialidade">
                <h1>Adicionar Especialidade</h1>
                <Input type="text" text="Especialidade" name="especialidade" placeholder="Especialidade" />
                <Input type="number" text="Quantidade" name="quantidade" placeholder="Qtd"/>
                <Button/>
            </div>
            <div className="tabela-adicionar-especialidade">
                <table>
                    <th>batata</th>
                </table>
            </div> 
            </div>
        </body>
            
        
        
    )
}

