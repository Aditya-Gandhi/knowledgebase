import express, {Express, Request, Response, Router} from "express";
import bodyParser from "body-parser";
import * as path from "path";

const multer = require('multer')
const guidGenerator = require('uuid/v1');
require('./helper/configPassport'); // Configure passport js for google login
const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, './uploads/');
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const guid = guidGenerator();
        callback(null, guid + '_' + file.originalname);
    }
});

export const upload = multer({
    storage: storage
});

const app: Express = express();
const baseDir = path.resolve();

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

// ROUTERS
const auth: Router = require("./route/Auth")(router);
const category: Router = require("./route/Category")(router);
const content: Router = require("./route/Content")(router);

// USE ROUTER
app.use("/auth", auth);
app.use("/category", category);
app.use("/content", content);

// STATIC FOLDER
app.use(express.static(path.join(baseDir, "public")));

// USE ANGULAR AS FRONTEND
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(baseDir, "public", "index.html"));
});

export default app;
