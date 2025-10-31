import { Model } from 'objection';

import { Event } from '@/typings/event';

import { BookingModel } from './booking-model';

export class EventModel extends Model implements Event {
    static tableName = 'events';

    id!: Event['id'];
    name!: Event['name'];
    total_seats!: Event['total_seats'];

    async getAvailableSeats(): Promise<number> {
        const bookedCount = await this.$relatedQuery('bookings').resultSize();
        return this.total_seats - bookedCount;
    }

    async canBook(): Promise<boolean> {
        const availableSeats = await this.getAvailableSeats();
        return availableSeats > 0;
    }

    async getBookings() {
        return this.$relatedQuery('bookings');
    }
}
