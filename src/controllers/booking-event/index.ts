import { Request, Response } from 'express';

import { BookEvent as BookEventRequest, BookingService } from '@/services/booking-service';

export const BookingEventController = async (req: Request<BookEventRequest>, res: Response) => {
    const { body } = req;

    const { eventId, userId } = body;

    try {
        const data = await BookingService.bookEvent({ eventId, userId });

        if (data.message) {
            if (data.message === 'Event not found') {
                return res.status(404).json({ error: data.message });
            }
            if (
                data.message === 'Booking already exists' ||
                data.message === 'No available seats'
            ) {
                return res.status(409).json({ error: data.message });
            }
            return res.status(400).json({ error: data.message });
        }

        return res.status(201).json({
            booking: data.booking,
            message: 'Booking created successfully',
        });
    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
