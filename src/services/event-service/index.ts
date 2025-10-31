import { EventModel } from '@/db/models';
import { type Event } from '@/typings/event';

export class EventService {
    static async createEvent(eventData: Omit<Event, 'id'>): Promise<EventModel> {
        return EventModel.query().insert(eventData);
    }

    static async getEventWithBookings(eventId: number): Promise<EventModel | undefined> {
        return EventModel.query().findById(eventId).withGraphFetched('bookings');
    }

    static async getAllEvents(): Promise<EventModel[]> {
        return EventModel.query();
    }

    static async updateEvent(eventId: number, eventData: Partial<Event>): Promise<EventModel> {
        return EventModel.query().patchAndFetchById(eventId, eventData);
    }

    static async deleteEvent(eventId: number): Promise<number> {
        return EventModel.query().deleteById(eventId);
    }
}
