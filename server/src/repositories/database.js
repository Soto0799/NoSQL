import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();// Carga las variables de entorno desde el archivo .env

const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // URI de conexión a MongoDB, por defecto apunta a localhost
const DB_NAME = process.env.DEFAULT_DB_NAME || 'test'; // Nombre de la base de datos por defecto

// Función para conectar a MongoDB y devolver una instancia de MongoClient
export async function connect() {
    const client = new MongoClient(mongoDbUri);
    await client.connect();// Conexión asíncrona a la base de datos
    return client;// Devuelve el cliente de MongoDB
}

// Función para obtener una colección de la base de datos
export async function collection(collectionName) {
    const client = await connect();// Conecta con la base de datos
    const db = client.db(DB_NAME);  // Selecciona la base de datos
    const collection = await db.collection(collectionName);// Obtiene la colección
    return collection; // Devuelve la colección
}