import { Request, Response } from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

// argumentos con el tipo de datos de Request y Response.
// Retorna un response basado en promesa

async function index(req: Request, res: Response) : Promise <Response> {
	let result = await Photo.find();

	result = result.map(item => {
		item.imagePathComplete = req.protocol + '://' + req.hostname + ':3001' + '/' +item.imagePath;

		return item;
	})

	return res.json(result);

}

async function create(req: Request, res: Response) : Promise <Response> {
	
	const { title, description } = req.body;

	// validar que el archivo sea requerido. En caso de que sea opcional, el path será un null

	const { path } = req.file? req.file : { path: null };

	const newPhoto = {
		title, 
		description,
		imagePath: path
	}

	const photo = new Photo(newPhoto)

	await photo.save()

	return res.json({
		message: 'Imagen guardada correctamente',
		photo
	})

}

// Aun no actualiza. Verificar

async function update(req: Request, res: Response) : Promise <Response> {
	
	console.log(req.params, req.body)

	const { id }  = req.params;
	const { title, description } = req.body;

	// el tercer parametro new, es para retornar el documento actualizado y no el anterior

	const updated = await Photo.findByIdAndUpdate(id, { 
		title,
		description
	}, 
	{ 
		new: true 
	})

	return res.json({
		message: 'Imagen actualizada correctamente',
		photo: updated
	})
}

async function show(req: Request, res: Response) : Promise <Response> {
	const { id }  = req.params;
	let item: any  = await Photo.findById(id);

	item.imagePathComplete = req.protocol + '://' + req.hostname + ':3001' + '/' +item.imagePath;

	return res.json(item);
}


async function destroy(req: Request, res: Response) : Promise <Response> {
	const { id }  = req.params;
	
	const photo = await Photo.findByIdAndRemove(id);

	// si existe la foto, se elimina el archivo
	// en caso de que el archivo no exista en el directorio, se omitiría (comprobar con otro modulo import)

	if(photo){
		await fs.unlink(path.resolve(photo.imagePath))
	}

	return res.json({
		message: 'Imagen removida',
		photo
	});
}

export default {
	index,
	create,
	update,
	show,
	destroy
} 