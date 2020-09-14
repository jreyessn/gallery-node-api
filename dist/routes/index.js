"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const PhotoController_1 = __importDefault(require("../controllers/PhotoController"));
const multer_1 = __importDefault(require("../libs/multer"));
router.route('/photos')
    .get(PhotoController_1.default.index)
    .post(multer_1.default.single('image'), PhotoController_1.default.create);
router.route('/photos/:id')
    .get(PhotoController_1.default.show)
    .delete(PhotoController_1.default.destroy)
    .put(PhotoController_1.default.update);
exports.default = router;
