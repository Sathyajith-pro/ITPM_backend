import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    num_participant: {
        type: Number,
        required: true
    }
});

// The collection name will be 'suppliermodels' (lowercased and pluralized)
const SupplierModel = mongoose.model('suppliermodel', supplierSchema);

// ✅ ES Module export
export default SupplierModel;
