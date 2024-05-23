import { Role } from "../role.model";

export class DetailUser{
    userId : number;
    full_name : string;
    user_name : string;
    email : string;
    sex: string
    phone_number: string
    address: string
    active: number;
    role : Role;
}