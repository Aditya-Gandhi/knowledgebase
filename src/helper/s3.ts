import {S3} from "aws-sdk";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
import {Body, GetObjectOutput, ListObjectsOutput, ObjectList} from "aws-sdk/clients/s3";

const config  = require("../../config/config.json");

export class S3Helper {
    private s3: S3;
    constructor() {
        this.s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    public getObjectList(folderName: string): Promise<ObjectList> {
        return new Promise((resolve, reject) => {
            let params: S3.ListObjectsRequest = {
                Bucket: config.bucketName,
                Delimiter: "/",
                Prefix: folderName
            };
            this.s3.listObjects(params, (err: any, data: ListObjectsOutput) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data.Contents);
            });
        });
    }

    public getObject(fileName: string): Promise<Body> {
        return new Promise((resolve, reject) => {
            let params: S3.GetObjectRequest = {
                Bucket: config.bucketName,
                Key: fileName
            };
            this.s3.getObject(params, (err: Error, result: GetObjectOutput) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.Body);
                }
            });
        });
    }

    public uploadFileToS3(fileName: string, data: string): Promise<SendData> {
        let params = {
            Bucket: config.bucketName,
            Key: fileName,
            Body: data
        };
        return new Promise((resolve, reject) => {
            this.s3.upload(params, function(err: Error, data: SendData) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    }
}
