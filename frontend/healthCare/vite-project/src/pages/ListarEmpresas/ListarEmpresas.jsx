import React, { useEffect, useState } from 'react'
import blogFetch from '../../axios/config';

const ListarEmpresas = () => {

    const [empresas, setEmpresas] = useState([]);

    async function fetchEmpresas() {
        const response = await blogFetch.get('/listarEmpresas');
        const data = response.data;

        setEmpresas(data.listarEmpresas);
    }

    useEffect(() => {
        fetchEmpresas();
    }, [])

    return (
        <div>
            {empresas.map((empresa) => (
                <div key={empresa.idEmpresa}>
                    <h1>Nome: {empresa.nomeEmpresa}</h1>
                    <h1>Endereço: {empresa.emailEmpresa}</h1>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListarEmpresas