export type IType = 'message' | 'warning' | 'info' | 'error'

export interface IMessageOptions {
    id?:string,
    message?:string,
    type?:IType,
    duration?:number,
    center?:boolean,
    onClose?:()=>void,
    offset?:number
}

export type IMessageparams = IMessageOptions | string