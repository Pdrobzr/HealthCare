import React from "react";
import {Routes , Route, BrowserRouter } from "react-router-dom";

import { Entrar } from "../pages/Entrar";
import { RegistrarDados } from "../pages/RegistrarDados"
import { RecuperarSenha } from "../pages/RecuperarSenha"
import { EspecialidadeDisponivel } from "../pages/EspecialidadeDisponivel"
import ListarEmpresas from "../pages/ListarEmpresas/ListarEmpresas";
import { AlterarDados } from "../pages/AlterarDados";

export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Entrar/>} path="/entrar"/>
                <Route element={<ListarEmpresas/>} path="/listarEmpresas/"/>
                <Route element={<AlterarDados/>} path="/alterarDados"/>
                <Route element={<RegistrarDados/>} path="registrarDados"/>
                <Route element={<RecuperarSenha/>} path="recuperarSenha"/>
                <Route element={<EspecialidadeDisponivel/>} path="especialidadeDisponivel"/>
            </Routes>
        </BrowserRouter>
    )
}