const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");


// GET ALL CATEGORY
async function getallcategoryController(req, res) {
    try {
        console.log("GET ALL CATEGORY");
        const getCategory = await categorySchema.find({}).populate('subCategory');
        res.send(getCategory);
    } catch (error) {
        console.error('Error in getallcategoryController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// GET ALL sub CATEGORY
async function getallsubcategoryController(req, res) {
    try {
        console.log("GET ALL sub CATEGORY");
        const getSubCategory = await subCategorySchema.find({});
        res.send(getSubCategory);
    } catch (error) {
        console.error('Error in getallsubcategoryController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getallcategoryController,
    getallsubcategoryController
};