import { useEffect, useState } from 'react';
import './styles.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button'
import { Links } from '../../components/linksBaixoBotao';
import { LogoDescricao } from '../../components/LogoDescricao';
import blogFetch from '../../axios/config';
import Swal from 'sweetalert2'

export function RegistrarDados() {

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

    const registrarEmpresa = async (e) => {
        e.preventDefault();

        try {
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

            alert(data.message);
        } catch (error) {
            alert("Erro ao registrar!");
        }

        console.log(nome, email, senha, telefone, cnpj, endereco, bairro);
    }

    useEffect(() => {
        listarBairros();
    }, [])

    return (
        <div className='container-total'>
            <div className='parte-esquerda'>
                <LogoDescricao title="Registre-se" description="Disponibilize dados aos seus pacientes" />
                <form onSubmit={registrarEmpresa} className='formulario'>
                    <input type="text" onChange={(e) => setNome(e.target.value)} text="Nome Fantasia" name="nome fantasia" placeholder="Nome Fantasia" />
                    <input type="email" onChange={(e) => setEmail(e.target.value)} text="E-mail" name="e-mail" placeholder="E-mail" />
                    <input type="number" onChange={(e) => setCnpj(e.target.value)} text="Cnpj" name="cnpj" placeholder="Cnpj" />
                    <input type="number" onChange={(e) => setTelefone(Number(e.target.value))} text="Telefone" name="telefone" placeholder="Telefone" />
                    <input type="password" onChange={(e) => setSenha(e.target.value)} text="Senha" name="senha" placeholder="Senha" />
                    <div className='div-lado-a-lado'>
                        <div className='input-esquerdo'>
                            <select onChange={(e) => setBairro(Number(e.target.value))}>
                                {/* <option selected disabled>Selecionar bairro</option> */}
                                {bairros.map(bairros => (
                                    <option key={bairros.idBairro} value={bairros.idBairro}>
                                        {bairros.nomeBairro}
                                    </option>
                                ))}
                            </select>
                            <input type="text" text="Endereço" name="endereço" placeholder="Endereço" onChange={(e) => setEndereco(e.target.value)} />
                        </div>
                    </div>
                    <Button type="submit" content="Registrar" name="Registrar" />
                    <Links content="É registrado? " link=" Entrar" />
                </form>
            </div>
            <div className='parte-direita'>
            </div>
        </div>
    );
};
