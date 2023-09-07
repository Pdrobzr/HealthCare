import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";

export class EmpresaController {

    async adicionarEmpresa(req: Request, res: Response) {
        const { nome, email, senha, cnpj, telefone, bairro, endereco } = req.body;

        const hashSenha = await hash(senha, 8);

        const cpnjRegistrado = await prisma.empresa.findFirst({
            where: {
                cpnjEmpresa: cnpj
            }
        })

        if (cpnjRegistrado) {
            res.json({ error: 'Erro! CNPJ já cadastrado!' });
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
}