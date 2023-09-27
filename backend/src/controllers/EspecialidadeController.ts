import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class EspecialidadeController {

    async listarEspecialidades(req: Request, res: Response) {
        const listarEspecialidades = await prisma.especialidade.findMany();

        res.json({ listarEspecialidades });
    }

    async listarEspecialidadesEmpresas(req: Request, res: Response) {

        const idEmpresa = Number(req.params.idEmpresa);

        const listarEspecialidadesEmpresas = await prisma.disponibilidadeEspecialidade.findMany({
            select: {
                idDisponibilidade: true,
                idEmpresa: true,
                quantidadeEspecialidade: true,
                Empresa: {
                    select: { nomeEmpresa: true }
                },
                Especialidade: {
                    select: {nomeEspecialidade: true}
                }
            },
            where: {
                idEmpresa
            },
            orderBy: {
                Especialidade: {
                    nomeEspecialidade: 'asc'
                }
            }
        })

        res.json({ listarEspecialidadesEmpresas });
    }

    async adicionarEspecialidade(req: Request, res: Response) {
        const idEmpresa = Number(req.params.idEmpresa);
        const idEspecialidade = Number(req.params.idEspecialidade);
        const { quantidade } = req.body;

        const verificarEspecialidadeExistente = await prisma.disponibilidadeEspecialidade.findFirst({
            where: {
                idEmpresa,
                idEspecialidade
            }
        });

        if (verificarEspecialidadeExistente) {
            res.status(400).json({ error: 'Erro! Especialidade já adicionada!' });
        } else {

            const adicionarEspecialidade = await prisma.disponibilidadeEspecialidade.create({
                data: {
                    quantidadeEspecialidade: quantidade,
                    idEmpresa,
                    idEspecialidade
                },
            });

            res.json({ message: 'Especialidade adicionada com sucesso!', adicionarEspecialidade });
        }
    }

    async informarDisponibilidade(req: Request, res: Response) {
        const idDisponibilidade = Number(req.params.idDisponibilidade);
        const { quantidade } = req.body;

        const alterarDisponibilidade = await prisma.disponibilidadeEspecialidade.update({
            data: {
                quantidadeEspecialidade: quantidade,
            },
            where: {
                idDisponibilidade: idDisponibilidade
            }
        });

        res.json({ message: 'Quantidade alterada com sucesso!', alterarDisponibilidade });
    }

    async deletarEspecialidade(req: Request, res: Response) {
        const idDisponibilidade = Number(req.params.idDisponibilidade);

        const deletarEspecialidade = await prisma.disponibilidadeEspecialidade.delete({
            where: {
                idDisponibilidade
            }
        });

        res.json({ message: 'Especialidade deletada com sucesso!', deletarEspecialidade });
    }
}