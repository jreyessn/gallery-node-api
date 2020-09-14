"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = require("mongoose");
async function startConnection() {
    await mongoose_1.connect('mongodb://54.215.246.194:27017/gallery', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Database conencted");
}
exports.startConnection = startConnection;
