import {ObjectId} from "mongodb";

export interface Content {
    _id?: string;
    title: string;
    body: string;
    categoryId: ObjectId;
    attachmentUrl: string;
}
