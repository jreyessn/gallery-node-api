"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
    imagePath: String,
    imagePathComplete: String
});
exports.default = mongoose_1.model('photos', schema);
