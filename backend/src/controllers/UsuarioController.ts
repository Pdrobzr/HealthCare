import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import * as dotenv from 'dotenv';
import { sign } from "jsonwebtoken";

dotenv.config();

export class UsuarioController {

    async listarUsuarios(req: Request, res: Response) {
        const listarUsuarios = await prisma.usuario.findMany();

        res.json({listarUsuarios});
    }

    async adicionarUsuario(req: Request, res: Response) {
        const { nome, email, senha } = req.body;
        
        const hashSenha = await hash(senha, 8);

        const role = "USER";

        const emailRegistrado = await prisma.usuario.findFirst({
            where: {
                emailUsuario: email
            }
        });

        if (emailRegistrado) {
            res.json({ error: 'Erro! Email já cadastrado!' });
        } else {

            const adicionarUsuario = await prisma.usuario.create({
                data: {
                    nomeUsuario: nome,
                    emailUsuario: email,
                    roleUsuario: role,
                    senhaUsuario: hashSenha
                }
            });

            return res.json({ message: 'Usuáro registrado com sucesso!', adicionarUsuario });
        }

    }

    async autenticarUsuario(req: Request, res: Response) {
        const { email, senha } = req.body;
        const secret = process.env.SECRET;

        const emailValido = await prisma.usuario.findFirst({
            
            where: {
                emailUsuario: email
            }
        });

        if (!emailValido) {
            return res.status(404).json({ error: 'Erro ao realizar o login!' });
        } else {

            const validarSenha = await compare(senha, emailValido.senhaUsuario);

            if (validarSenha === false) {
                return res.status(404).json({ error: 'Erro ao realizar o login!' });
            } else {
                const token = sign({ id: emailValido.idUsuario }, secret as string, { expiresIn: "1d" });
                const { idUsuario } = emailValido;

                return res.json({ message: 'Usuário logado com sucesso!', Usuario: { idUsuario, email }, token });
            }
        }
    }

    async autenticarAdmin(req: Request, res: Response) {
        const { email, senha } = req.body;
        const secret = process.env.SECRET;

        const verificarAdmin = await prisma.usuario.findFirst({
            where:{
                emailUsuario: email
            }
        });
        if(!verificarAdmin) {
            res.status(404).json({error: 'Erro! Email ou senha inválidos!'});
        } else {
            const validarSenha = await compare(senha, verificarAdmin.senhaUsuario);
            if(!validarSenha) {
                res.status(404).json({error: 'Erro! Email ou senha inválidos!'});
            } else if(verificarAdmin.roleUsuario !== 'ADMIN') {
                res.status(401).json({error: 'Erro! Usuário não possui autorização!'});
            } else {
                const token = sign({ id: verificarAdmin.idUsuario }, secret as string, { expiresIn: "1d" });
                const { idUsuario, roleUsuario } = verificarAdmin;

                return res.json({ message: 'Admin logado com sucesso!', Usuario: { idUsuario, email, roleUsuario }, token });
            }
        }
        
    }

    async atualizarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);

        const {nome, email} = req.body;

        const atualizarUsuario = await prisma.usuario.update({
            data: {
                nomeUsuario: nome,
                emailUsuario: email
            },
            where: {
                idUsuario: id
            }
        });

        res.json({message: 'Usuário atualizado com sucesso!', atualizarUsuario});
    }

    async deletarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);
        
        const deletarUsuario = await prisma.usuario.delete({
            where: {
                idUsuario: id
            }
        });

        res.json({message: 'Usuário deletado com sucesso!', deletarUsuario});
    }
    
}