import { useEffect, useState } from 'react';
import './styles.css';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import imagemVoltar from '../../img/imagemFundo/Voltar.png'
import { LogoDescricao } from '../../components/LogoDescricao';

export function RegistrarDados() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confimarSenha, setConfirmarSenha] = useState("");
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');

    const [mudarParteEndereco, setMudarParteEndereco] = useState(false)

    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");


    function validarCNPJ(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;

    }



    function validarNumeroTelefone(telefone) {
        const regex = /^[1-9]{2}9?[0-9]{8}$/;

        if (regex.test(telefone)) {
            return true;
        } else {
            return false;
        }
    }

    const registrarEmpresa = async (e) => {
        e.preventDefault();

        try {
            if (!validarCNPJ(cnpj)) {
                Swal.fire({
                    icon: 'error',
                    text: 'CNPJ inválido!'
                });
                return;
            } if (!validarNumeroTelefone(telefone)) {
                Swal.fire({
                    icon: 'error',
                    text: 'Numero de celular inválido!'
                });
                return;
            } if (senha != confimarSenha) {
                Swal.fire({
                    icon: 'error',
                    text: 'Digite a mesma senha nos dois campos!'
                });
                return;
            }
            const key = import.meta.env.VITE_REACT_APP_KEY;

            const response = await blogFetch.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${key}`);

            const data = response.data;

            const { results } = data;

            const informacoes = results[0].geometry.location;

            const latitude = informacoes.lat.toString();
            const longitude = informacoes.lng.toString();


            if (latitude && longitude) {
                await blogFetch.post('/adicionarEmpresa', {
                    nome: nome,
                    email: email,
                    senha: senha,
                    cnpj: cnpj,
                    telefone: telefone,
                    bairro: bairro,
                    endereco: endereco,
                    cep: cep,
                    complemento: complemento,
                    latitude: latitude,
                    longitude: longitude
                });

                Swal.fire({
                    icon: 'success',
                    text: 'Empresa adicionada com sucesso!'
                });

                navigate('/entrar');

            }


        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao cadastrar!'
            })

        }
    }


    const checkCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
                setBairro(data.bairro)
                setEndereco(data.logradouro)
            })
    }

    return (
        <div className='container-total'>
            <div className='parte-esquerda'>
                <LogoDescricao title='Registre-se' />
                <form onSubmit={registrarEmpresa} className='formulario'>
                    {!mudarParteEndereco ?
                        (<div className='formulario'>
                            <label htmlFor="nome fantasia">Nome Fantasia</label>
                            <input value={nome} type="text" onChange={(e) => setNome(e.target.value)} text="Nome Fantasia" name="nome fantasia" placeholder="Nome Fantasia" />
                            <label htmlFor="e-mail">E-mail</label>
                            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} text="E-mail" name="e-mail" placeholder="E-mail" />
                            <label htmlFor="cnpj">CNPJ</label>
                            <input value={cnpj} type="number" onChange={(e) => setCnpj(e.target.value)} text="Cnpj" name="cnpj" placeholder="CNPJ" />
                            <label htmlFor="telefone">Telefone</label>
                            <input value={telefone} type="number" onChange={(e) => setTelefone(e.target.value)} text="telefone" name="telefone" placeholder="Telefone" />
                            <label htmlFor="senha">Senha</label>
                            <input value={senha} type="password" onChange={(e) => setSenha(e.target.value)} text="Senha" name="senha" placeholder="Senha" />
                            <label htmlFor="senha">Confirmar senha</label>
                            <input value={confimarSenha} type="password" onChange={(e) => setConfirmarSenha(e.target.value)} text="Senha" name="senha" placeholder="Confirmar senha" />
                            <button onClick={() => setMudarParteEndereco(true)} >Continuar</button>
                        </div>) :
                        (<div className='formulario'>
                            <button onClick={() => setMudarParteEndereco(false)} className='botao-voltar'>
                                <img style={{ width: 29 }} src={imagemVoltar} alt="" />
                            </button>
                            <label htmlFor="cep">CEP</label>
                            <input onBlur={checkCep} value={cep} onChange={(e) => setCep(e.target.value)} type='number' text="cep" name="cep" placeholder="CEP" />

                            <label htmlFor="endereço">Endereço</label>
                            <input value={endereco} onChange={(e) => setEndereco(e.target.value)} type="text" text="endereço" name="endereço" placeholder="Endereço" />

                            <label htmlFor="bairro">Bairro</label>
                            <input value={bairro} type="text" className='input-bairro' name='bairro' onChange={(e) => setBairro(e.target.value)} placeholder='Bairro' />

                            <label htmlFor="complemento">Complemento</label>
                            <input value={complemento} onChange={(e) => setComplemento(e.target.value)} type="text" text="complemento" name="complemento" placeholder="Complemento" />
                            <Button type="submit" content="Registrar" name="Registrar" />
                        </div>)
                    }
                    <Links content="É registrado? " text=" Entrar" link="/entrar" />
                </form>
            </div>
            <div className='parte-direita'>
            </div>
        </div>
    );
};
