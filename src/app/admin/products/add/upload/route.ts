// pages/api/upload.ts
import { ID, storage } from '@/appwrite_server';

import { headers } from 'next/headers'
import { InputFile } from 'node-appwrite';
import { Stream } from 'stream';
export const config = {
  api: {
    bodyParser: false,
  },
};

const BUCKET_ID = "67f0f73300267604857c"; // Replace with your bucket ID
export async function GET(request: Request) {}
export async function POST(req: Request) {
    const headersList = await headers()
    const referer = headersList.get('referer')
    try {
      const file = (await req.formData()).get('file');
      if (!file) {
        return Response.json(
          { error: 'No file uploaded' },
          { status: 400 }
        );
      }

      const isValidFile = (f: any): f is File =>
        f &&
        typeof f === 'object' &&
        typeof f.name === 'string' &&
        typeof f.size === 'number' &&
        typeof f.lastModified === 'number' &&
        typeof f.type === 'string';
      
      if (!isValidFile(file)) {
        return Response.json({ error: 'Invalid file upload' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const appwriteFile = InputFile.fromBuffer(buffer, file.name);
      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(), // file ID (unique)
        appwriteFile,
      );
      return new Response(`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${uploaded.$id}/view?project=${'67b8c50700125c658601'}`, { 
        status: 200,
        headers: {
            "append":"Content-Type: text/plain"
        }
        });
    //  console.log((await req.formData()));
  } catch (err) {
    console.error(err);
    return new Response(String(err), { 
        status: 400,
        headers: {
            "append":"Content-Type: text/plain"
        }
        });
  }
}
