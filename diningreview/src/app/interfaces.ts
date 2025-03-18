export interface IUser{
    id: number;
    username: string;
    password: string;
    city: string;
    zipcode: number;
    state: string;
    isAdmin: boolean;
    interestPeanutAllergy: boolean;
    interestEggAllergy: boolean;
    interestDairyAllergy: boolean;
}

export interface IRestaurant{
    id: number;
    name: string;
    city: string;
    state: string;
    zipcode: number;
}