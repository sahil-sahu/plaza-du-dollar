import { Client, Account, Databases, Storage } from 'node-appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b8c50700125c658601')
    .setKey("standard_fe7495e59a19e91750062766be4a27bda168e3a7fcc8004ed2c1fe99a644e3bc0c2453e8999ede16b5c08f1a57b0a2da2544bbdfe816a2f70e0ccf03bf6fc75ecf9dc2434ad932a2e064b770a16f3fc9bdcc95487984a9f9b2384a35f366042319530ef9de309ab71320c53757abfa1efa56179c20cac136bcb162ead6931b0a"); // Replace with your project ID
// console.log("server")    
export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export { ID } from 'node-appwrite';
