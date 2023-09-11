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
            return res.status(400).json({ error: 'Erro! CNPJ ou email já cadastrados!' });
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

            return res.json({ message: 'Empresa adicionada com sucesso!', adicionarEmpresa });
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

        if (!empresa) {
            return res.status(400).json({ error: 'Erro ao realizar o login!' });
        }

        const senhaValida = await compare(senha, empresa.senhaEmpresa);

        if (senhaValida === false) {
            return res.status(400).json({ error: 'Erro ao realizar o login!' });
        } else {

            const token = sign({ id: empresa.idEmpresa }, secret as string, { expiresIn: "1d" });
            const { idEmpresa } = empresa;

            return res.json({ message: 'Empresa logada com sucesso!', Empresa: { idEmpresa, email }, token });
        }

    }

    async listarEmpresas(req: Request, res: Response) {
        const listarEmpresas = await prisma.empresa.findMany({
            select: {
                idEmpresa: true,
                nomeEmpresa: true,
                emailEmpresa: true,
                enderecoEmpresa: true,
                bairro: {
                    select: {
                        nomeBairro: true
                    }
                }
            }
        });

        return res.json({ listarEmpresas });
    }

    async selecionarEmpresa(req: Request, res: Response) {
        const id = Number(req.params.id);

        const selecionarEmpresa = await prisma.empresa.findFirst({
            select: {
                nomeEmpresa: true,
                enderecoEmpresa: true,
                bairro: {
                    select: {
                        nomeBairro: true,
                    }
                }
            },
            where: {
                idEmpresa: id,
            }
        });

        return res.json({ selecionarEmpresa });
    }

    async atualizarEmpresa(req: Request, res: Response) {
        const { nome, email, telefone } = req.body;
        const id = Number(req.params.id);

        const atualizarEmpresa = await prisma.empresa.update({
            data: {
                nomeEmpresa: nome,
                emailEmpresa: email,
                telefoneEmpresa: telefone,
            },
            where: {
                idEmpresa: id
            }
        });

        return res.json({ message: 'Informações atualizadas com sucesso!', atualizarEmpresa });
    }

    async deletarEmpresa(req: Request, res: Response) {
        const id = Number(req.params.id);

        const deletarEmpresa = await prisma.empresa.delete({
            where: {
                idEmpresa: id
            }
        });

        return res.json({ message: 'Empresa deletada com sucesso!', deletarEmpresa });
    }

}
