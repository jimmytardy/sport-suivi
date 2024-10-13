export interface IActionTypePayload {
    name: string;
    phase: string;
}

export interface IActionType extends IActionTypePayload {
    _id: string;
}