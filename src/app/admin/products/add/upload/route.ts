// pages/api/upload.ts
import { ID, storage } from '@/appwrite_server';
import { InputFile } from 'node-appwrite';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BUCKET_ID = "67f0f73300267604857c"; // Replace with your bucket ID

type FileWithProperties = File & {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  type: string;
};

export async function POST(req: Request) {
    try {
      const file = (await req.formData()).get('file');
      if (!file) {
        return Response.json(
          { error: 'No file uploaded' },
          { status: 400 }
        );
      }

      const isValidFile = (f: unknown): f is FileWithProperties =>
        f instanceof File &&
        typeof (f as File).arrayBuffer === 'function' &&
        'name' in f &&
        'type' in f;

      if (!isValidFile(file)) {
        return Response.json(
          { error: 'Invalid file format' },
          { status: 400 }
        );
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
