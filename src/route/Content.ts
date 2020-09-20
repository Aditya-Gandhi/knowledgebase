import {Router} from "express";
import getDbConnection from "../dbManager/DbManager";
import {Db} from "mongodb";
import {Content} from "../model/Content";
import {ObjectId} from "mongodb";
import {upload} from "../App";
import {S3Helper} from "../helper/s3";
import * as fs from "fs";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;

const collection_name = "content";

module.exports = (router: Router) => {
    // @desc To get all the content
    router.get("/allcontent", async (req, res) => {
        const dbConnection: Db =  await getDbConnection();
        dbConnection.collection(collection_name).aggregate([
            {
                $lookup: {
                    "from": "category",
                    "localField": "categoryId",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            {
                $project: {
                    "categoryId": 0
                }
            }
        ]).toArray()
            .then((content: Content[]) => {
                if (!content || content.length === 0) {
                    res.status(204).json({success: false, message: "No content found"});
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Successfully fetched content",
                        content: content
                    });
                }
            })
            .catch((error) => res.status(500).json({ success: false, message: error }));
    });

    // add a new content to the knowledge base
    router.post("/addcontent", upload.single('attachment'), async (req, res) => {
        let attachmentContent = await fs.readFileSync(req.file.path,"utf8");
        if (!req.body.title) {
            res.status(400).json({ success: false, message: "title is required" });
        } else if (!req.body.body) {
            res.status(400).json({ success: false, message: "content body is required" });
        } else {
            const dbConnection =  await getDbConnection();
            const s3: S3Helper = new S3Helper();
            s3.uploadFileToS3(req.file.filename, attachmentContent).then((data: SendData) => {
                let content: Content = {
                    title: req.body.title,
                    body: req.body.body,
                    categoryId: new ObjectId(req.body.categoryId),
                    attachmentUrl: data.Location
                };
                dbConnection.collection(collection_name).insertOne(content)
                    .then((data) => {
                        res.status(200).json({ success: true, message: "Content added successfully!" });
                    })
                    .catch((error) => res.status(500).json({ success: false, message: "Content not added!" + error }));
            }).catch((error) => res.status(500).json({ success: false, message: "Content not added!" + error }));
        }
    });

    return router;
};
