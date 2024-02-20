// Importing the category and subcategory schema models
const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

// Controller function to create a new category
async function CreateCategoryController(req, res) {
    try {
        // Destructuring values from the request body
        const { name, description } = req.body;

        // Check if category with the same name already exists
        const duplicateCheck = await categorySchema.findOne({ name });

        // If a category with the same name is found, return an error response
        if (duplicateCheck) {
            console.log('Category already exists!');
            return res.status(400).json({ error: 'Category already exists' });
        }

        // Creating a new category instance
        const newCategory = new categorySchema({
            name,
            description
        });

        // Saving the new category to the database
        const result = await newCategory.save();
        res.json(result);
    } catch (error) {
        // Handling any errors that occur during the save operation
        console.error('Error saving category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Controller function to create a new subcategory
async function CreateSubCategoryController(req, res) {
    try {
        // Destructuring values from the request body
        const { name, description, category } = req.body;

        // Check if subcategory with the same name already exists
        const duplicatesubcatCheck = await subCategorySchema.findOne({ name });

        // If a subcategory with the same name is found, return an error response
        if (duplicatesubcatCheck) {
            console.log('Subcategory already exists!');
            return res.status(400).json({ error: 'Subcategory already exists' });
        }

        // Creating a new subcategory instance
        const newSubCategory = new subCategorySchema({
            name,
            description,
            category
        });

        // Saving the new subcategory to the database
        const result = await newSubCategory.save();

        // Updating the parent category to include the new subcategory
        await categorySchema.findOneAndUpdate(
            {_id: newSubCategory.category},
            {$push: {subCategory: newSubCategory._id}},
            {new: true}
        );
        res.json(result);
    } catch (error) {
        // Handling any errors that occur during the save operation
        console.error('Error saving subcategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// CATEGORY STATUS update
async function categoryStatusController(req, res) {
    try {
        const { status, name } = req.body;

        // Checking the status value and updating the category accordingly
        if (status === "rejected" || status === "waiting") {
            // Setting isActive to false and updating the status
            await categorySchema.findOneAndUpdate(
                { name },
                { $set: { isActive: false, status } },
                { new: true }
            );
            res.json({ success: "success" });
        } else if (status === "approved") {
            // Setting isActive to true and updating the status
            await categorySchema.findOneAndUpdate(
                { name },
                { $set: { isActive: true, status } },
                { new: true }
            );
            res.json({ success: "success" });
        } else {
            // Handling an invalid status value
            res.status(400).json({ error: "Invalid status" });
        }
    } catch (error) {
        // Handling any errors that occur during the update operation
        console.error('Error in categoryStatusController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// SUBCATEGORY STATUS update
async function subCategoryStatusController(req, res) {
    try {
        const { status, name } = req.body;

        // Checking the status value and updating the subcategory accordingly
        if (status === "rejected" || status === "waiting") {
            // Setting isActive to false and updating the status
            await subCategorySchema.findOneAndUpdate(
                { name },
                { $set: { isActive: false, status } },
                { new: true }
            );
            res.json({ success: "success" });
        } else if (status === "approved") {
            // Setting isActive to true and updating the status
            await subCategorySchema.findOneAndUpdate(
                { name },
                { $set: { isActive: true, status } },
                { new: true }
            );
            res.json({ success: "success" });
        } else {
            // Handling an invalid status value
            res.status(400).json({ error: "Invalid status" });
        }
    } catch (error) {
        // Handling any errors that occur during the update operation
        console.error('Error in subCategoryStatusController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Exporting the controller functions for use in other parts of the application
module.exports = {
    CreateCategoryController,
    CreateSubCategoryController,
    categoryStatusController,
    subCategoryStatusController
};
