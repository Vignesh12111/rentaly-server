
const EquipmentModel = require("../models/equipment.model");

// Create a Equipment
const createEquipment = async(req, res) => {
    try{
        const { name, rate, category, location, admin } = req.body;
        if(!name || !rate || !category || !location || !admin){
            return res.json({ msg: "All data are Requiered" })
        }
        const response = await EquipmentModel.create({...req.body})
        res.json({ msg: "Equipment Created!", data: response, status: 200 })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }

}

// Get a Equipments
const getEquipments = async(req, res) => {
    try{
        const data = await EquipmentModel.find({ isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Get all equipments of an admin
const getEquipmentsByAdminMail = async(req, res) => {
    try{
        const { adminMail } = req.params;
        const data = await EquipmentModel.find({ admin: adminMail, isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Get equipment by admin mail and url
const getEquipmentByMailAndUrl = async(req, res) => {
    try{
        const { adminMail, url } = req.params;
        const data = await EquipmentModel.findOne({ admin: adminMail, url: url, isDeleted: false });
        await EquipmentModel.updateOne({ admin: adminMail, url: url, isDeleted: false }, { $inc: { impressions: 1 } } );
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Get equipments size
const getEquipmentsSizeByAdminMail = async(req, res) => {
    try{
        const { adminMail } = req.params;
        const length = await EquipmentModel.countDocuments({ admin: adminMail, isDeleted: false })
        res.json(length)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Get an Admin Equipment By Dynamic Url
const getAdminEquipmentById = async(req, res) => {
    try{
        const data = await EquipmentModel.findOne({ _id: req.params?.id, isDeleted: false })
        res.json(data)
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Update a Equipment
const updateEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.updateOne({ _id: req.params?.url, isDeleted: false }, { $set: req.body })
        res.json({ msg: "Equipment Updated!", data, status: 200 })
    }catch(err){
        console.log(err?.message);
        res.json({ msg: "Server Error", error: err?.message })
    }
}


// Soft Delete a Equipment
const softDeleteEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.updateOne({ _id: req?.params?.url }, { isDeleted: true })
        res.json({ msg: "Document Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

// Delete all Equipment
const deleteAllEquipment = async(req, res) => {
    try{
        const data = await EquipmentModel.deleteMany()
        res.json({ msg: "Db Deleted!" })
    }catch(err){
        res.json({ msg: "Server Error", error: err?.message })
    }
}

module.exports = {
    createEquipment,
    getEquipments,
    getEquipmentsSizeByAdminMail,
    getAdminEquipmentById,
    getEquipmentsByAdminMail,
    getEquipmentByMailAndUrl,
    deleteAllEquipment,
    softDeleteEquipment,
    updateEquipment
}