import { Model } from 'objection';

import { Booking } from '@/typings/booking';

import { EventModel } from './event-model';

export class BookingModel extends Model implements Booking {
    static tableName = 'bookings';

    id!: Booking['id'];
    event_id!: Booking['event_id'];
    user_id!: Booking['user_id'];
    created_at!: Booking['created_at'];

    async getEvent(): Promise<EventModel> {
        const event = this.$relatedQuery('event');
        return event as unknown as EventModel;
    }

    static async exists(eventId: number, userId: string): Promise<boolean> {
        const booking = await this.query()
            .where({ event_id: eventId, user_id: userId })
            .first();
        return Boolean(booking);
    }
}
