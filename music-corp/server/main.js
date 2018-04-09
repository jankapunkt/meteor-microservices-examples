import { Meteor } from 'meteor/meteor';

import { Messages } from 'meteor/microserviceexamples:message-bus';

Meteor.startup(() => {

	Messages.connect();
	Messages.emit({
		app: 'music-corp',
		event: 'app.start',
		createdBy: 'server',
	})
});
