import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import * as dotenv from 'dotenv';
import { sign } from "jsonwebtoken";

dotenv.config();

export class UsuarioController {

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

            res.json({ message: 'Usuáro adicionada com sucesso!', adicionarUsuario });
        }

        } 
}