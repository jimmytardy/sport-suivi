export interface IUserPayload {
    firstname: string
    lastname: string
    email: string
    password: string
}

export interface IUserSubscriptionItem {
    _id: string
    name: string
    status: string
}
export interface IUser extends Omit<IUserPayload, 'password'>, IUserPayload {
    _id: string
    createdAt: Date
}
