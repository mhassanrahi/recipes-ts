import { Router } from 'express';
import * as recipesController from '../controllers/recipesController';

const router = Router();

router.post('/', recipesController.create);
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);
router.patch('/:id', recipesController.update);
router.delete('/:id', recipesController.remove);

export default router;
