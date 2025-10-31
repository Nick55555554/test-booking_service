import { BookingModel, EventModel } from '@/db/models/';
import { Booking } from '@/typings/booking';

export interface BookEvent {
    eventId: number;
    userId: number;
}

export class BookingService {
    static async bookEvent({
        eventId,
        userId,
    }: BookEvent): Promise<{ booking?: Booking; message?: string }> {
        try {
            console.log('Looking for event:', eventId);
            const event = await EventModel.query().findById(eventId);
            console.log('Event found:', event);
            if (!event) {
                return { message: 'Event not found' };
            }

            console.log('Checking existing booking...');
            const existingBooking = await BookingModel.exists(eventId, userId);
            if (existingBooking) {
                return { message: 'Booking already exists' };
            }

            console.log('Checking available seats...');
            const canBook = await event.canBook();
            if (!canBook) {
                return { message: 'No available seats' };
            }

            console.log('Creating booking...');
            const booking = await BookingModel.query().insert({
                event_id: eventId,
                user_id: userId,
            });

            return { booking };
        } catch (error) {
            console.error('Real error in bookEvent:', error); // ← вот где реальная ошибка!
            throw new Error(`Error with booking event: ${error}`);
        }
    }

    static async cancelBooking(bookingId: number): Promise<{ success: boolean; message?: string }> {
        try {
            const booking = await BookingModel.query().findById(bookingId);
            if (!booking) {
                return { success: false, message: 'Booking not found' };
            }

            await BookingModel.query().deleteById(bookingId);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Cancellation failed' };
        }
    }

    static async getUserBookings(userId: string): Promise<BookingModel[]> {
        return BookingModel.query().where({ user_id: userId }).withGraphFetched('event');
    }

    static async getEventBookings(eventId: number): Promise<BookingModel[]> {
        return BookingModel.query().where({ event_id: eventId });
    }
}
