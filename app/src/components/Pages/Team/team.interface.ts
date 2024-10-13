export interface ITeamPayload {
    name: string
    description: string
    sport: string
}

export interface ITeam extends ITeamPayload {
    _id: string
}