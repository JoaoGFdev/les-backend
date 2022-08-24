import { Team } from '@prisma/client';

import { prisma } from '@shared/infra/prisma';

import { IAddUserToTeamDTO } from '../../useCases/AddUserToTeam/AddUserToTeamUseCase';
import { ITeamsRepository } from '../ITeamsRepository';
import { ICreateTeamDTO } from '../TeamsDTO';

export class TeamsRepository implements ITeamsRepository {
  private ormRepository = prisma.team;

  public async create({ name, description }: ICreateTeamDTO): Promise<Team> {
    const team = await this.ormRepository.create({
      data: {
        name,
        description,
      },
    });

    return team;
  }

  public async findAll(): Promise<Team[]> {
    const categories = await this.ormRepository.findMany();

    return categories;
  }

  public async findByName(name: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findFirst({
      where: {
        name,
      },
    });

    return team;
  }

  public async findById(id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findUnique({
      where: {
        id,
      },
    });

    return team;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      where: {
        id,
      },
    });
  }

  public async addUser({ userId, teamId }: IAddUserToTeamDTO): Promise<Team> {
    const team = await this.ormRepository.update({
      where: {
        id: teamId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return team;
  }
}
