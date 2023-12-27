import {config} from "dotenv";
config();
export const PORT = 8080

export const HOST = `http://localhost:${PORT}`

export const MERCADOPAGO_TOKEN = process.env.MERCADOPAGO_TOKEN;

console.log(MERCADOPAGO_TOKEN)