import { Geo } from "types/geo"
export type Address = {
    street : string,
    suite : string,
    city : string,
    zipcode : string,
    geo : Geo
}