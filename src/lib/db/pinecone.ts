import { PineconeClient } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

let pinecone: PineconeClient | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
      environment: 'us-east-1-aws', // Adjust the environment as needed
    });
  }
  return pinecone;
};
export async function loadS3IntoPinecone(file_key: string ) {
    const file_name = await downloadFromS3(file_key);
    console.log('File downloaded from S3:', file_name);
    
    if (!file_name) {
        throw new Error('Failed to download file from S3');
    }
    const loader = new PDFLoader(file_name);
    console.log(loader);
    const pages = await loader.load();
    console.log(pages);
    
    return pages;
}