import { Router } from 'express';
import { validateSimulateRequest } from '../validators/request-validator';
import { handleSimulate } from '../controllers/simulate.controller';

const router = Router();

router.post('/simulate', validateSimulateRequest, handleSimulate);

export default router;