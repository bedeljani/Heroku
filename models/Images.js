const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    finalImg = {
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
     }
})

module.exports = Image = mongoose.model("image", ImageSchema);