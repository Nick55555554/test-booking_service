import express from 'express';
import request from 'supertest';

import { BookingEventController } from '@/controllers/booking-event';
import { BookingService } from '@/services/booking-service';

jest.mock('@/services/booking-service');

const app = express();
app.use(express.json());

app.post('/api/booking/reserve', BookingEventController);

describe('BookingEventController Integration Test', () => {
    const mockBookEvent = BookingService.bookEvent as jest.MockedFunction<
        typeof BookingService.bookEvent
    >;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 201 when booking is successful', async () => {
        const mockBooking = {
            id: 1,
            event_id: 1,
            user_id: 123,
            created_at: new Date(Date.now()),
        };

        mockBookEvent.mockResolvedValue({ booking: mockBooking });

        const response = await request(app).post('/api/booking/reserve').send({
            eventId: 1,
            userId: 123,
        });

        expect(response.status).toBe(201);

        expect(response.body.booking).toMatchObject({
            id: 1,
            event_id: 1,
            user_id: 123,
        });
        expect(response.body.message).toBe('Booking created successfully');
        expect(mockBookEvent).toHaveBeenCalledWith({
            eventId: 1,
            userId: 123,
        });
    });

    it('should return 404 when event not found', async () => {
        mockBookEvent.mockResolvedValue({ message: 'Event not found' });

        const response = await request(app).post('/api/booking/reserve').send({
            eventId: 999,
            userId: 123,
        });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: 'Event not found',
        });
    });

    it('should return 500 when service throws error', async () => {
        mockBookEvent.mockRejectedValue(new Error('Database error'));

        const response = await request(app).post('/api/booking/reserve').send({
            eventId: 1,
            userId: 123,
        });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal server error');
    });
});
