import aws, { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multerConfig from '../utils/multerConfig'; 
import mimeTypes  from 'mime-types';


dotenv.config();


class S3Storage {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'sa-east-1',
        });
    }

    async saveFile(filename: string): Promise<void> {
        const originalPath = path.resolve(multerConfig.directory, filename);
   
        const ContentType = mimeTypes.lookup(originalPath);

        if(!ContentType) {
            throw new Error("Arquivo não encontrado!");
        }

        const fileContent = await fs.promises.readFile(originalPath);

        this.client.putObject({
            Bucket: 'exames-healthcare',
            Key: filename,
            Body: fileContent,
            ContentType
        })
        .promise();

        await fs.promises.unlink(originalPath);
    }
}

export default S3Storage;