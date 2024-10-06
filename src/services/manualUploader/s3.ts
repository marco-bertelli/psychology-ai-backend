import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import config from '../../config';
import fs from 'fs';


const { accessKeyId, secretAccessKey, s3BucketName } = config;

const s3Options = {
    accessKeyId,
    secretAccessKey,
    s3BucketName,
    region: 'eu-west-1'
};

export const uploadFile = async (originalFilePath: string, wishedName: string) => {
    const filePath = wishedName || `${new Date().getTime()}_${originalFilePath}`;

    const s3Client = generateS3Client(s3Options);

    const params = {
        ACL: 'public-read' as ObjectCannedACL,
        Bucket: s3BucketName,
        Key: filePath,
        Body: fs.readFileSync(originalFilePath),
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };

    await s3Client.send(new PutObjectCommand(params));

    fs.unlinkSync(originalFilePath);

    return {
        Location: `https://${s3BucketName}.s3.amazonaws.com/${filePath}`
    };
};

function generateS3Client(s3Options: any) {
    return new S3Client({
        credentials: {
            accessKeyId: s3Options.accessKeyId,
            secretAccessKey: s3Options.secretAccessKey,
        },
        region: s3Options.region,
    });
}
