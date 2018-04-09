import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { API } from "../../api/api";
import { MessageQueueCollection } from "../MessageQueue";
import SimpleSchema from 'simpl-schema';


const emitEventSchema = new SimpleSchema(API.methods.emitEvent.params);

export const emitEvent = new ValidatedMethod({
	name: API.methods.emitEvent.name,
	validate(emitDoc) {
		emitEventSchema.validate(emitDoc);
	},
	run(emitDoc) {

		const timeStamp = new Date();
		return MessageQueueCollection.insert({
			app: emitDoc.app,
			event: emitDoc.event,
			createdBy: emitDoc.createdBy,
			createdAt: timeStamp,
		});
	},
});
