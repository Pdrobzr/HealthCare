import blogFetch from "@/axios/config";
import Navbar from "@/components/Navbar";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import './style.css'
import ContextNome from "../../components/Context/ContextName";

export function Metricas() {

    const empresa = localStorage.getItem("Empresa");

    const [comentarios, setComentarios] = useState([]);
    const listarComentarios = async () => {
        const response = await blogFetch.get(`/listarComentarios/${empresa}`);
        const data = response.data;
        console.log(data)
        setComentarios(data);
    }

    useEffect(() => {
        listarComentarios();
    }, []);

    return (
        <body className="body-adm">
            <Navbar />
            <main className="container-total-adm">
                
                <div className="responsivo-disponivell">
                    <h1 className="titulo-adicionar-especialidade-disponivel-adm">
                        Comentarios
                    </h1>
                    <div className="totalComentarios">
                        <hr />
                        <div className="dadosEmpresa">
                        
                            <div className="imagemComentario">B</div>
                            <div>   
                                <p className="nomeEmpresa">Blue Med</p>
                                <p className="quantidadeComentarios">comentarios ({comentarios.length})</p>
                            </div>
                            
                        </div>
                        <hr />
                        <ScrollArea className="h-[350px] mt-8 rounded-md">
                            {comentarios.map((todosComentarios) => (
                                <div key={todosComentarios.Usuario.idUsuario} className="">
                                    <div className="containerUsuarioWeb">
                                        <div className="imagemComentario">{todosComentarios.Usuario.nomeUsuario.charAt(0).toUpperCase()}</div>
                                        <div className="nomeData">
                                            <p>{todosComentarios.Usuario.nomeUsuario}</p>
                                            <p className="dataComentario">{todosComentarios.dataPublicacao.slice(0,10)}</p>
                                        </div>
                                    </div>
                                    <div className="comentariosWeb">
                                        <p>{todosComentarios.conteudoComentario}</p>
                                    </div>
                                </div>
                            )
                            )}
                        </ScrollArea>
                    </div>
                </div>
            </main>
        </body>
    )
}

