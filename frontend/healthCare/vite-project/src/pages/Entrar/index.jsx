import { useState } from 'react';
import './styles.css';
import Image from '../../img/imgLogo/logo.png'


export function Entrar(){

    return(
        <div className='container-total'>
            <div className='parte-esquerda'>

            </div>
            <div className='parte-direita'>
                
                <div className='parte-superior'>
                    <img className='logo' src={Image} alt="" />
                    <h2>Bem vindo de volta</h2>
                    <p className='descricao'>Divulge o atendimento medico aos seus pacientes</p>
                
                </div>
                <form action="" className='formulario'>
                    <label htmlFor="Email">Email</label>
                    <input type="Email" placeholder='CNPJ'/>
                    
                    <label htmlFor="password">Senha</label>
                    <input type="password" placeholder='Senha'/>
                    
                    <button >Entrar</button>
                </form>
                <div className='parte-inferior'>

                </div>
            </div>
        </div>
    )
}