import { useEffect, useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export function RegistrarDados() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState(0);
    const [cnpj, setCnpj] = useState(0);
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState();

    const [bairros, setBairros] = useState([]);

    const listarBairros = async () => {
        const response = await blogFetch.get('/listarBairros');
        const data = response.data;
        setBairros(data.listarBairros);
    }


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
            } if(!validarNumeroTelefone(telefone)){
                Swal.fire({
                    icon: 'error',
                    text: 'Numero de celular inválido!'
                });
                return;
            } 
                const response = await blogFetch.post('/adicionarEmpresa', {
                    nome: nome,
                    email: email,
                    senha: senha,
                    cnpj: cnpj,
                    telefone: telefone,
                    bairro: bairro,
                    endereco: endereco
                });

                const data = response.data;

                Swal.fire({
                    icon: 'success',
                    text: data.message
                });

                navigate('/entrar');
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao cadastrar!'
            })

        }
    }

    useEffect(() => {
        listarBairros();
    }, [])

    return (
        <div className='container-total'>
            <div className='parte-esquerda'>
                <LogoDescricao title="Registre-se" description="" />
                <form onSubmit={registrarEmpresa} className='formulario'>
                    <label htmlFor="nome fantasia">Nome Fantasia</label>
                    <input type="text" onChange={(e) => setNome(e.target.value)} text="Nome Fantasia" name="nome fantasia" placeholder="Nome Fantasia" />
                    <label htmlFor="e-mail">E-mail</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} text="E-mail" name="e-mail" placeholder="E-mail" />
                    <label htmlFor="cnpj">CNPJ</label>
                    <input type="number" onChange={(e) => setCnpj(e.target.value)} text="Cnpj" name="cnpj" placeholder="CNPJ" />
                    <label htmlFor="telefone">Telefone</label>
                    <input type="number" onChange={(e) => setTelefone(Number(e.target.value))} text="telefone" name="telefone" placeholder="Telefone" />
                    <label htmlFor="senha">Senha</label>
                    <input type="password" onChange={(e) => setSenha(e.target.value)} text="Senha" name="senha" placeholder="Senha" />
                    <div className='div-lado-a-lado'>

                        <div className='input-esquerdo'>
                            <label htmlFor="bairro">Bairro</label>
                            <select className='input-bairro' name='bairro' onChange={(e) => setBairro(Number(e.target.value))}>
                                {<option value="" disabled selected hidden>Canto do Forte</option>}
                                <option disabled>Selecionar bairro</option>
                                {bairros.map(bairros => (
                                    <option key={bairros.idBairro} value={bairros.idBairro}>
                                        {bairros.nomeBairro}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='input-direito'>
                            <label htmlFor="endereço">Endereço</label>
                            <input className="input-endereco" type="text" text="endereço" name="endereço" placeholder="Endereço" onChange={(e) => setEndereco(e.target.value)} />
                        </div>
                    </div>
                    <Button type="submit" content="Registrar" name="Registrar" />
                    <Links content="É registrado? " text=" Entrar" link="/entrar" />
                </form>
            </div>
            <div className='parte-direita'>
            </div>
        </div>
    );
};
