import React from "react";
import {Routes , Route, BrowserRouter } from "react-router-dom";

import { Entrar } from "../pages/Entrar";
import { RegistrarPrimeiro } from "../pages/RegistrarPrimeiro"
import { RegistrarSegundo } from "../pages/RegistrarSegundo"
import { RecuperarSenha } from "../pages/RecuperarSenha"
import { EspecialidadeDisponivel } from "../pages/EspecialidadeDisponivel"
import ListarEmpresas from "../pages/ListarEmpresas/ListarEmpresas";


export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Entrar/>} path="/entrar"/>
                <Route element={<ListarEmpresas/>} path="/listarEmpresas/"/>
                <Route element={<RegistrarPrimeiro/>} path="/registrarPrimeiro"/>
                <Route element={<RegistrarSegundo/>} path="registrarSegundo"/>
                <Route element={<RecuperarSenha/>} path="recuperarSenha"/>
                <Route element={<EspecialidadeDisponivel/>} path="especialidadeDisponivel"/>
            </Routes>
        </BrowserRouter>
    )
}