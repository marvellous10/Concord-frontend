import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const config = useRuntimeConfig()

const s3Client = new S3Client({
    region: config.public.AWS_S3_REGION,
    credentials: {
        accessKeyId: config.public.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: config.public.AWS_S3_SECRET_ACCESS_KEY
    },
});

export const uploadFileToS3 = async (file: File, bucketName: string, key: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: file,
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params))
        return data
    } catch (err) {
        console.error('Error uploading file to s3: ', err)
        throw err;
    }
};

export const getFileUrl = async (bucketName: string, key: string) => {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const expirationdate = 6 * 24 * 60 * 60;

        const url = await getSignedUrl(s3Client, command, { expiresIn: expirationdate })
        return url
    } catch (err) {
        console.error('Error getting presigned url: ', err)
        throw err
    }
} 