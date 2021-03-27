import {Router} from 'express';
import * as clubsController from '../controllers/clubs-controller';

const router = Router();

router.get('', clubsController.getClubs);
router.post('/create', clubsController.createClub);
router.get('/:clubId', clubsController.getClubById);
router.delete('/:clubId', clubsController.deleteClubById);
router.put('/:clubId', clubsController.updateClubById);


export default router;