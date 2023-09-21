import { useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';

export function RegistrarDados(){

    return(
        <div className='container-total'>
            <div className='parte-esquerda'>
                <LogoDescricao title="Registre-se" description="Disponibilize dados aos seus pacientes"/>
                <form action="" className='formulario'>
                    <Input type="text" text="Nome Fantasia" name="nome fantasia" placeholder="Nome Fantasia"/>
                    <Input type="email" text="E-mail" name="e-mail" placeholder="E-mail"/>
                    <Input type="text" text="Endereço" name="endereço" placeholder="ENDEREÇO"/>
                    <div className='div-lado-a-lado'>
                        <div className='input-esquerdo'>
                            <Input className="i-esquerdo" size="150px" type="text" text="Bairro" name="bairro" placeholder="BAIRRO"/>
                        </div>
                        <div className='input-direito'>
                            <Input size="57px" type="number" text="Número" name="numero" placeholder="Nº"/>
                        </div>
                    </div>
                    <Button type="submit" content="PRÓXIMO" name="proximo"/>
                    <Links content="É registrado? " link=" Entrar"/> 
                </form>
            </div>
            <div className='parte-direita'>               
            </div>
        </div>
    );
};
