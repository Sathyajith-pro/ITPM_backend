import express from "express";
import suppliermodels from "../models/supplier.js"; // ensure correct path
// import bookingdetailsmodels from "../models/booking.js"; // if used

const router = express.Router();

router.put('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { event, num_participant } = req.body;

        const updatedUser = await suppliermodels.findOneAndUpdate(
            { name },
            { event, num_participant },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        console.error("❌ Error updating user:", error.message);
        res.status(500).json({ error: "An error occurred while updating data" });
    }
});

router.get('/get', async (req, res) => {
    try {
        const booking = await suppliermodels.find();

        if (!booking || booking.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.json(booking);
    } catch (error) {
        console.error("❌ Error fetching data:", error.message);
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
});

router.post("/addsuppliers", async (req, res) => {
    const { userid,name, address, event, num_participant } = req.body;

    try {
        const newDetails = await suppliermodels.create({
            userid,
            name,
            address,
            event,
            num_participant
        });

        res.json({ status: "suppliers added", supplier: newDetails });
    } catch (error) {
        console.error("Error adding suppliers:", error.message);
        res.status(500).json({ error: "Error adding supplier" });
    }
});

router.get('/search', async (req, res) => {
    const { q } = req.query;

    try {
        const results = q
            ? await suppliermodels.find({ name: { $regex: q, $options: 'i' } })
            : await suppliermodels.find();

        res.json(results);
    } catch (error) {
        console.error('Error searching for suppliers:', error);
        res.status(500).json({ error: 'Error searching for suppliers' });
    }
});

router.delete('/items/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const deletedItem = await suppliermodels.findOneAndDelete({ name });

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Error deleting item' });
    }
});

router.get("/get/:name", async (req, res) => {
    try {
        const name = decodeURIComponent(req.params.name);
        const user = await suppliermodels.findOne({ name });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
