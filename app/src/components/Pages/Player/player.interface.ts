import { ITeam } from "../Team/team.interface";

export interface IPlayerPayload {
    firstname: string;
    lastname: string;
    birthday?: Date;
    teamsIds: string[];
    email: string;
}

export interface IPlayer extends Omit<IPlayerPayload, 'teamsIds'> {
    _id: string;
    teamsIds: ITeam[]
}

export const getFullName = (user: IPlayerPayload | IPlayer) => (user.firstname + ' ' + user.lastname.toUpperCase())