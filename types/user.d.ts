import { Address } from "types/address"
import { Company } from "types/company"
export type User = {
    id : number,
    name : string,
    userName : string,
    email : string,
    address : Address
    phone : string,
    website : string,
    company: Company
}