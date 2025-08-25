import { Client, Account, Databases, Storage } from 'node-appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b8c50700125c658601')
    .setKey(process.env.APPWRITE_KEY ||""); // Replace with your project ID
// console.log("server")    
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export { ID } from 'node-appwrite';
