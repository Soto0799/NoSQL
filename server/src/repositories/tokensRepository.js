import { collection } from "./database.js";

export const createToken = async (token) => {
    //{
    //  id: string
    //  username: string
    //  creationDate: date
    //  expirationDate: date
    //}
    const tokens = await collection("tokens");
    const result = await tokens.insertOne(token);
    return result;
}

export const fetchToken = async (id) => {
    const tokens = await collection("tokens");
    const result = await tokens.findOne({ id: id });
    return result;
}