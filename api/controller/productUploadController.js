const productSchema = require("../models/productSchema");
const userSchema = require("../models/userSchema");

async function secureProductController(req, res, next) {
    const { authorization } = req.headers;
    const userid = authorization.split('@')[1];
    const userPassword = authorization.split('@')[2];
    console.log(userid, userPassword);
    try {
        const user = await userSchema.findOne({ _id: userid });

        if (user) {
            if (userPassword === "1234") {
                if (user.role === "merchant") {
                    console.log(user.role);
                    return next();
                } else {
                    return res.status(401).json({ error: 'Unauthorized: User is not a merchant' });
                }
            } else {
                return res.status(401).json({ error: 'Unauthorized: Password not matched' });
            }
        } else {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

    } catch (error) {
        console.error('Error in secureProductController:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}




async function productUploadController(req, res) {
    try {
        const { name, description, price, category, brand, quantity, imageUrl } = req.body;
        const duplicateCheck = await productSchema.findOne({ name });
        if (duplicateCheck) {
            console.log('Product already exists!');
            return res.status(400).json({ error: 'Product already exists' });
        }
        const product = new productSchema({
            name,
            description,
            price,
            category,
            brand,
            quantity,
            imageUrl
        })
        // Save the new product to the database and return it as a response
        await product.save()
        res.json(product);
    }
    catch (error) {
        console.error('Error in productController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {secureProductController, productUploadController}