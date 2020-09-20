import {Router} from "express";
import getDbConnection from "../dbManager/DbManager";
import {Db} from "mongodb";
import {Category} from "../model/Category";

const collection_name = "category";

module.exports = (router: Router) => {
    // @desc To get all categories
    // @query specific category name
    //      @param name="category_name"
    router.get("/all", async (req, res) => {
        const dbConnection: Db =  await getDbConnection();
        if (req.query.name) {
            dbConnection.collection(collection_name).findOne({name: req.query.name})
                .then((category: Category) => {
                    if (!category) {
                        res.status(204).json({success: false, message: "category not found"});
                    } else {
                        res.status(200).json({
                            success: true,
                            message: "successfully fetched category",
                            category: category
                        });
                    }
                })
                .catch((error) => res.status(500).json({ success: false, message: error }));
        } else {
            dbConnection.collection(collection_name).find({}).toArray()
                .then((category: Category[]) => {
                    if (!category || category.length === 0) {
                        res.status(204).json({success: false, message: "category not found"});
                    } else {
                        res.status(200).json({
                            success: true,
                            message: "successfully fetched category",
                            category: category
                        });
                    }
                })
                .catch((error) => res.status(500).json({ success: false, message: error }));
        }
    });

    router.post("/add", async (req, res) => {
        if (!req.body.name) {
            res.status(400).json({success: false, message: "name is required"});
        } else {
            const dbConnection = await getDbConnection();
            let category: Category = {
                name: req.body.name
            }
            dbConnection.collection(collection_name).insertOne(category)
                .then((data) => {
                    res.status(200).json({success: true, message: "category added successfully!"});
                })
                .catch((error) => res.status(500).json({success: false, message: "category not added!" + error}));
        }
    });

    return router;
};
