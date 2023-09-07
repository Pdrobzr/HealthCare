import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import * as dotenv from 'dotenv';
import { sign } from "jsonwebtoken";

dotenv.config();

export class EmpresaController {

    async adicionarEmpresa(req: Request, res: Response) {
        const { nome, email, senha, cnpj, telefone, bairro, endereco } = req.body;

        const hashSenha = await hash(senha, 8);

        const cpnjRegistrado = await prisma.empresa.findFirst({
            where: {
                OR: [
                    {
                        emailEmpresa: email
                    },
                    {
                        cpnjEmpresa: cnpj
                    }
                ]
            }
        })

        if (cpnjRegistrado) {
            res.json({ error: 'Erro! CNPJ ou email já cadastrados!' });
        } else {

            const adicionarEmpresa = await prisma.empresa.create({
                data: {
                    nomeEmpresa: nome,
                    emailEmpresa: email,
                    senhaEmpresa: hashSenha,
                    cpnjEmpresa: cnpj,
                    telefoneEmpresa: telefone,
                    bairrosId: bairro,
                    enderecoEmpresa: endereco
                }
            });

            res.json({ message: 'Empresa adicionada com sucesso!', adicionarEmpresa });
        }
    }

    async autenticarEmpresa(req: Request, res: Response) {
        const { email, senha } = req.body;
        const secret = process.env.SECRET;

        const empresa = await prisma.empresa.findFirst({
            where: {
                emailEmpresa: email
            }
        });

        if(!empresa){
            return res.status(400).json({ error: 'Erro ao realizar o login!' });
        }

        const senhaValida = await compare(senha, empresa.senhaEmpresa);

        if(senhaValida === false) {
            return res.status(400).json({ error: 'Erro ao realizar o login!' });
        } else {
            
            const token = sign({id: empresa.idEmpresa}, secret as string, {expiresIn:"1d"});
            const { idEmpresa } = empresa;

            return res.json({ message: 'Empresa logada com sucesso!', Empresa: { idEmpresa, email }, token });
        }

    }
}