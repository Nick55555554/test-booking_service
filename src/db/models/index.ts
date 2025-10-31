import { Model } from 'objection';

import { BookingModel } from './booking-model';
import { EventModel } from './event-model';

EventModel.relationMappings = {
    bookings: {
        relation: Model.HasManyRelation,
        modelClass: BookingModel,
        join: {
            from: 'events.id',
            to: 'bookings.event_id',
        },
    },
};

BookingModel.relationMappings = {
    event: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventModel,
        join: {
            from: 'bookings.event_id',
            to: 'events.id',
        },
    },
};

export { BookingModel, EventModel };
