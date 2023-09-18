import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class EspecialidadeController {

    async listarEspecialidades(req: Request, res: Response) {
        const listarEspecialidades = prisma.especialidade.findMany();

        res.json({listarEspecialidades});
    }

    async listarEspecialidadesDisponiveis(req: Request, res: Response) {

        const idEmpresa = Number(req.params.idEmpresa);

        const listarEspecialidadesDisponiveis = prisma.disponibilidadeEspecialidade.findMany({
            where: {
                idEmpresa
            }
        });

        res.json({listarEspecialidadesDisponiveis});
    }

    async adicionarEspecialidade(req: Request, res: Response) {
        const idEmpresa = Number(req.params.idEmpresa);
        const idEspecialidade = Number(req.params.idEspecialidade);
        const {qtEspecialidade} = req.body;

        const adicionarEspecialidade = await prisma.disponibilidadeEspecialidade.create({
            data: {
                quantidadeEspecialidade: qtEspecialidade,
                idEmpresa: idEmpresa,
                idEspecialidade: idEspecialidade
            },
        });

        res.json({message: 'Especialidade adicionada com sucesso!', adicionarEspecialidade});
    }

    async alterarDisponibilidadeEspecialidade(req: Request, res: Response) {
        const idDisponibilidade = Number(req.params.idDisponibilidade);
        const {qtEspecialidade} = req.body;

        const alterarDisponibilidade = await prisma.disponibilidadeEspecialidade.update({
            data:{
               quantidadeEspecialidade: qtEspecialidade, 
            },
            where: {
                idDisponibilidade: idDisponibilidade
            }
        });

        res.json({message: 'Quantidade alterada com sucesso!', alterarDisponibilidade});
    }

    async deletarEspecialidade(req: Request, res: Response) {
        const idDisponibilidade = Number(req.params.idDisponibilidade);

        const deletarEspecialidade = await prisma.disponibilidadeEspecialidade.delete({
            where: {
                idDisponibilidade
            }
        });

        res.json({message: 'Especialidade deletada com sucesso!', deletarEspecialidade});
    }
}