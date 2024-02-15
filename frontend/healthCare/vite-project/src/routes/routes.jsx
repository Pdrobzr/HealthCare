import React from "react";
import {Routes , Route, BrowserRouter } from "react-router-dom";

import { Entrar } from "../pages/Entrar";
import { RegistrarDados } from "../pages/RegistrarDados"
import { RecuperarSenha } from "../pages/RecuperarSenha"
import { EspecialidadeDisponivel } from "../pages/EspecialidadeDisponivel"
import { AlterarDados } from "../pages/AlterarDados";
import { AlterarEspecialidade } from "../pages/AlterarEspecialidade";
import { HomePage } from "../pages/HomePage";
import { EntrarAdmin } from "../pages/EntrarAdmin";
import { AdmEmpresa } from "../pages/AdmEmpresas";
import { AdmPaciente } from "../pages/AdmPacientes";
import { AlterarSenha } from "../pages/AlterarSenha";

export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path="/"/>
                <Route element={<Entrar/>} path="/entrar"/>
                <Route element={<AlterarDados/>} path="/alterarDados"/>
                <Route element={<RegistrarDados/>} path="registrarDados"/>
                <Route element={<RecuperarSenha/>} path="recuperarSenha"/>
                <Route element={<EspecialidadeDisponivel/>} path="especialidadeDisponivel"/>
                <Route element={<AlterarEspecialidade/>} path="alterarEspecialidade/:id"/>
                <Route element={<EntrarAdmin/>} path="entrarAdmin"/>
                <Route element={<AdmEmpresa/>} path="admEmpresa"/>
                <Route element={<AdmPaciente/>} path="admPaciente"/>
                <Route element={<AlterarSenha/>} path="alterarSenha" />
            </Routes>
        </BrowserRouter>
    )
}