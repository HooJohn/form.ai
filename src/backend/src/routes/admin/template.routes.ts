import { Router } from 'express';
import { 
  createTemplate, 
  getAllTemplates, 
  updateTemplate, 
  deleteTemplate 
} from '../../controllers/admin/template.controller';
import { protect } from '../../middleware/auth.middleware';
import { isAdmin } from '../../middleware/admin.middleware';

const router = Router();

router.use(protect, isAdmin);

router.route('/')
  .post(createTemplate)
  .get(getAllTemplates);

router.route('/:id')
  .put(updateTemplate)
  .delete(deleteTemplate);

export default router;
