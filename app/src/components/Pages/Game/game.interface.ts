export interface IGamePayload {
    name: string;
    date: Date;
    video?: string;
    teamId: string
}

export interface IGameType extends IGamePayload {
    _id: string;
}