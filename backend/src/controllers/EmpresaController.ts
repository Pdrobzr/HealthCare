import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import * as dotenv from 'dotenv';
import { sign } from "jsonwebtoken";

dotenv.config();

export class EmpresaController {

    async adicionarEmpresa(req: Request, res: Response) {
        const { nome, email, senha, cnpj, telefone, bairro, endereco } = req.body;

        if (!nome || !email || !senha || !cnpj || !telefone || !bairro || !endereco) {
            return res.status(400).json({ error: 'Insira todas as informações' });
        } else {

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
            });

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
            const { nomeEmpresa } = empresa;

            return res.json({ message: 'Empresa logada com sucesso!', Empresa: { idEmpresa, nomeEmpresa, email }, token });
        }

    }

    async listarEmpresas(req: Request, res: Response) {
        const listarEmpresas = await prisma.empresa.findMany();

        return res.json({ listarEmpresas });
    }

    async selecionarEmpresa(req: Request, res: Response) {
        const id = Number(req.params.id);

        const selecionarEmpresa = await prisma.empresa.findFirst({
            select: {
                idEmpresa: true,
                nomeEmpresa: true,
                emailEmpresa: true,
                enderecoEmpresa: true,
                telefoneEmpresa: true,
                statusEmpresa: true,
                bairro: {
                    select: {
                        nomeBairro: true,
                    }
                },
                DisponibilidadeEspecialidade: {
                    select: {
                        Especialidade: {
                            select: {
                                idEspecialidade: true,
                                nomeEspecialidade: true
                            }
                        },
                        quantidadeEspecialidade: true
                    }
                }

            },
            where: {
                idEmpresa: id,
            }
        });
        
        

        const listarComentarios = await prisma.comentario.findMany({
            where: {
                idEmpresa: id
            }
        });

        return res.json({ selecionarEmpresa, listarComentarios });
    }

    async listarProfissionaisDisponiveis(req: Request, res: Response) {

       const id = Number(req.params.id);

       const listarProfissionaisDisponiveis = await prisma.disponibilidadeEspecialidade.findMany({
            select: {
                        Especialidade: {
                            select: {
                                idEspecialidade: true,
                                nomeEspecialidade: true
                            }
                        },
                        Empresa: {
                            select: {
                                idEmpresa: true,
                            }
                        },
                        quantidadeEspecialidade: true
                    
                
            },

            where: {
                idEmpresa: id
            }
        });
        

        return res.json({ listarProfissionaisDisponiveis});
    }

    async atualizarStatus(req: Request, res: Response) {
        const id = Number(req.params.id);

        const status = Boolean(req.body.status);

        const atualizarStatus = await prisma.empresa.update({
            data: {
                statusEmpresa: status
            },
            where: {
                idEmpresa: id
            }
        });

        return res.json({atualizarStatus});

    }

    async listarEmpresasAbertas(req: Request, res: Response) {
        const listarEmpresasAbertas = await prisma.empresa.findMany({
            include:{
                DisponibilidadeEspecialidade: {
                    include: {
                        Especialidade: {
                            select: {
                                nomeEspecialidade: true
                            }
                        }
                    }
                },
                Comentario: {
                    select: {
                        conteudoComentario: true
                    }
                }
            },
            
            where: {
                statusEmpresa: true
            },

            orderBy: {
                nomeEmpresa: 'asc'
            }
        });

        return res.json({listarEmpresasAbertas});
    }

    async atualizarEmpresa(req: Request, res: Response) {
        const { nome, email, telefone } = req.body;
        const id = Number(req.params.id);

        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Erro ao atualizar!' });
        } else {

            const emailCadastrado = await prisma.empresa.findFirst({
                where: {
                    emailEmpresa: email,
                    NOT: {
                        idEmpresa: id
                    }
                }
            });

            if (emailCadastrado) {
                return res.status(400).json({ error: 'Erro ao atualizar! E-mail já cadastrado!' });
            } else {

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
        }
    }

    async atualizarSenha(req: Request, res: Response) {
        const id = Number(req.params.id);

        const {senhaAntiga, senhaNova} = req.body;

        const buscarSenhaAntiga = await prisma.empresa.findFirst({
            where: {
                idEmpresa: id
            }
        });

        if(!buscarSenhaAntiga) {
            return res.status(400).json({ error: 'Erro ao encontrar empresa!' });
        }

        const validarSenha = await compare(senhaAntiga, buscarSenhaAntiga.senhaEmpresa);

        if(!validarSenha) {
            return res.status(404).json({ error: 'Erro! Senha inválida!'});
        } else {
            const hashSenha = await hash(senhaNova, 8);

            await prisma.empresa.update({
                data: {
                    senhaEmpresa: hashSenha
                },
                where: {
                    idEmpresa: id
                }
            });

            return res.status(200).json({message: 'Senha atualizada com sucesso!'});
        }
        
    }

    async deletarEmpresa(req: Request, res: Response) {
        const id = Number(req.params.id);

        const encontrarEspecialidade = await prisma.disponibilidadeEspecialidade.findFirst({
            where: {
                idEmpresa: id
            }
        });
        if (encontrarEspecialidade) {
            await prisma.disponibilidadeEspecialidade.deleteMany({
                where: {
                    idEmpresa: id
                }
            });
        }

        const encontrarComentariosEmpresa = await prisma.comentario.findFirst({
            where: {
                idEmpresa: id
            }
        });

        if (encontrarComentariosEmpresa) {
            await prisma.comentario.deleteMany({
                where: {
                    idEmpresa: id
                }
            });
        }

        const deletarEmpresa = await prisma.empresa.delete({
            where: {
                idEmpresa: id
            }
        });

        return res.json({ message: 'Empresa deletada com sucesso!', deletarEmpresa });
    }

    async pesquisarEmpresa(req: Request, res: Response) {
        const { pesquisa } = req.body

        const pesquisarEmpresa = await prisma.empresa.findMany({
            where: {
                nomeEmpresa: {
                    contains: pesquisa
                }
            }
        });

        if (pesquisarEmpresa.length < 1) {
            return res.status(404).json({ message: 'Não foi encontrado nenhuma empresa com esse nome!' });
        } else {

            return res.json({ pesquisarEmpresa });
        }
    }

    async listarBairros(req: Request, res: Response) {
        const listarBairros = await prisma.bairros.findMany();

        return res.json({ listarBairros });
    }

    async listarComentarios(req: Request, res: Response) {
        const id = Number(req.params.id);

        const listarComentarios = await prisma.comentario.findMany({
            select: {
                conteudoComentario:true,
                dataPublicacao: true,
                Usuario: {
                    select: {
                        nomeUsuario: true,
                        idUsuario: true,
                    }
                },
            },
            where: {
                idEmpresa: id,
            },
            orderBy: {
                dataPublicacao: 'desc'
            }
        });

        return res.json(listarComentarios);
    }

}
