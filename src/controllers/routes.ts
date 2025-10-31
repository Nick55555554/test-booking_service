import { Router } from 'express';

import { BookingEventController } from './booking-event';

const router = Router();

router.post('/api/booking/reserve', BookingEventController);

export default router;
