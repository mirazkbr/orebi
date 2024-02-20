const merchantSchema = require("../models/merchantSchema");
const userSchema = require("../models/userSchema");

async function merchantController(req, res) {
    try {
        const { storeName, storeEmail, storeTelephone, storeAddress, owner } = req.body;
        if (!storeName || !storeEmail) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if the email is already in use by another account
        const existingMerchant = await merchantSchema.findOne({ storeEmail });
        if (existingMerchant) {
            console.log('Merchant already exists!');
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Creating a new merchant instance
        const newMerchant = new merchantSchema({
            storeName,
            storeEmail,
            storeTelephone,
            storeAddress,
            owner
        });

        // Saving the new merchant to the database
        await newMerchant.save();

        // Sending a success response to the client
        console.log('Merchant created successfully');

        // Updating user role after the merchant is saved
        const updateUserRole = await userSchema.findByIdAndUpdate(
            { _id: owner },
            { role: "merchant" },
            { new: true }
        );

        console.log('User role updated successfully');
        res.status(200).send(req.body);

    } catch (error) {
        // Handling any errors that occur during the save operation
        console.error('Error saving merchant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = merchantController;
