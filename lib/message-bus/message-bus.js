import { DDP } from 'meteor/ddp-client'

export const MessageBorkerApi = {
	collections: {
		messageQueue: {
			name: "MessageQueue",
			schema: {
				app: String,
				event: String,
				createdAt: Date,
				createdBy: String,
			},
		},
	},
	publications: {
		messageBus: {
			name: 'message-broker.publications.messageBus',
			params: {
				events: {
					type: Array,
					optional: true,
				},
				'events.$': {
					type: String,
				},
				timeStamp: {
					type: Date,
					optional: true,
				}
			}
		},
	},
	methods: {
		emitEvent: {
			name: 'message-broker.methods.emitEvent',
			params: {
				app: String,
				event: String,
				createdBy: String,
			}
		}
	},
};


export const Messages = {

	connection: null,

	connect(url='localhost:1111') {
		this.connection = DDP.connect(url);
	},

	/////////////////////////

	subscriptions: {},

	subscribe(events) {
		const sub = this.connection.subscribe(MessageBorkerApi.publications.messageBus.name, {
			events: events,
		});
		Messages.subscriptions[name] = sub;
		return sub;
	},

	/////////////////////////

	emit({ app, event, createdBy }) {
		return this.connection.call(MessageBorkerApi.methods.emitEvent.name, { app, event, createdBy });
	}
};




