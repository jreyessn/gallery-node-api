// Configuración para que el servidor acepte archivos

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname))
	}
})

export default multer({ storage });