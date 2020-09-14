"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = __importDefault(require("../models/Photo"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// argumentos con el tipo de datos de Request y Response.
// Retorna un response basado en promesa
async function index(req, res) {
    let result = await Photo_1.default.find();
    result = result.map(item => {
        item.imagePathComplete = req.protocol + '://' + req.hostname + ':3000' + '/' + item.imagePath;
        return item;
    });
    return res.json(result);
}
async function create(req, res) {
    const { title, description } = req.body;
    // validar que el archivo sea requerido. En caso de que sea opcional, el path será un null
    const { path } = req.file ? req.file : { path: null };
    const newPhoto = {
        title,
        description,
        imagePath: path
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    return res.json({
        message: 'Imagen guardada correctamente',
        photo
    });
}
// Aun no actualiza. Verificar
async function update(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    // el tercer parametro new, es para retornar el documento actualizado y no el anterior
    const updated = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    }, {
        new: true
    });
    return res.json({
        message: 'Imagen actualizada correctamente',
        photo: updated
    });
}
async function show(req, res) {
    const { id } = req.params;
    const item = await Photo_1.default.findById(id);
    return res.json(item);
}
async function destroy(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findByIdAndRemove(id);
    // si existe la foto, se elimina el archivo
    // en caso de que el archivo no exista en el directorio, se omitiría (comprobar con otro modulo import)
    if (photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({
        message: 'Imagen removida',
        photo
    });
}
exports.default = {
    index,
    create,
    update,
    show,
    destroy
};
