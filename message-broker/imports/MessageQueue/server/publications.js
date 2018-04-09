import { Meteor } from 'meteor/meteor';
import { API } from '../../api/api';
import { MessageQueueCollection } from "../MessageQueue";

import SimpleSchema from 'simpl-schema';

const publishMessagesSchema = new SimpleSchema(API.publications.messageBus.params);

export const publishMessages = function ({ events, timeStamp }) {
	publishMessagesSchema.validate({ events, timeStamp });

	// NOTE, that usually you should not allow
	// to return all docs and listen to the complete message bus
	// but we keep this in order to keep this example simple

	const query = {};
	if (events) {
		query.events = { $in: events }; // listen to one of the given events
	}
	if (timeStamp) {
		// TODO add to query only messages after a several date
	}

	const messages = MessageQueueCollection.find(query, { hint: { $natural: -1 } });
	if (messages && messages.count && messages.count() >= 0)
		return messages;

	this.ready();
};

Meteor.publish(API.publications.messageBus.name, publishMessages);