import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { AuthMiddleware } from "./middlewares/auth";
import { UsuarioController } from "./controllers/UsuarioController";
import { EspecialidadeController } from "./controllers/EspecialidadeController";

const empresaController = new EmpresaController();
const usuarioController = new UsuarioController();
const especialidadeController = new EspecialidadeController();

export const router = Router();

// ROTAS DE EMPRESA
router.post('/adicionarEmpresa', empresaController.adicionarEmpresa);
router.get('/listarEmpresas', empresaController.listarEmpresas);
router.get('/selecionarEmpresa/:id', AuthMiddleware, empresaController.selecionarEmpresa);
router.post('/autenticarEmpresa', empresaController.autenticarEmpresa);
router.put('/atualizarEmpresa/:id', empresaController.atualizarEmpresa);
router.delete('/deletarEmpresa/:id', empresaController.deletarEmpresa);
router.post('/pesquisarEmpresa', AuthMiddleware, empresaController.pesquisarEmpresa);

// ROTAS DE BAIRROS
router.get('/listarBairros', empresaController.listarBairros);

// ROTAS DE USUARIO
router.get('/listarUsuarios', AuthMiddleware, usuarioController.listarUsuarios);
router.post('/adicionarUsuario', usuarioController.adicionarUsuario);
router.post('/autenticarUsuario', usuarioController.autenticarUsuario);
router.put('/atualizarUsuario/:id', usuarioController.atualizarUsuario);
router.delete('/deletarUsuario/:id', AuthMiddleware, usuarioController.deletarUsuario);

// ROTAS DE ESPECIALIDADES 
router.get('/listarEspecialidades', especialidadeController.listarEspecialidades);
router.get('/listarEspecialidades/:idEmpresa', especialidadeController.listarEspecialidadesEmpresas);
router.post('/adicionarEspecialidade/:idEmpresa/:idEspecialidade', especialidadeController.adicionarEspecialidade);
router.put('/informarEspecialidade/:idDisponibilidade', AuthMiddleware, especialidadeController.informarDisponibilidade);
router.delete('/deletarEspecialidade/:idDisponibilidade', especialidadeController.deletarEspecialidade);