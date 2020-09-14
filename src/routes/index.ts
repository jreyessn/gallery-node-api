import { Router } from 'express';

const router = Router();

import PhotoController from '../controllers/PhotoController';
import multer from '../libs/multer';

router.route('/photos')
	  .get(PhotoController.index)
	  .post(multer.single('image'), PhotoController.create)

router.route('/photos/:id')
	  .get(PhotoController.show)
	  .delete(PhotoController.destroy)
	  .put(PhotoController.update);

export default router;