import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import SimpleSchema from 'simpl-schema';

import { API } from "../imports/api/api";
import { MessageQueueCollection } from "../imports/MessageQueue/MessageQueue";

const messageSchema = new SimpleSchema(API.methods.emitEvent.params, { tracker: Tracker });


import './main.html';

Template.body.onCreated(function bodyOnCreated() {
	const instance = this;
	instance.loaded = new ReactiveVar(false);
	instance.create = new ReactiveVar(false);

	instance.autorun(function () {

		const messageBus = instance.subscribe(API.publications.messageBus.name, {});
		if (messageBus.ready()) {
			instance.loaded.set(true);
		}
	});
});

Template.body.helpers({
	create() {
		return !!Template.instance().create.get();
	},
	loaded() {
		return !!Template.instance().loaded.get();
	},
	events() {
		return MessageQueueCollection.find({}, { sort: { createdAt: -1 } });
	},
	messageSchema() {
		return messageSchema;
	}
});

Template.body.events({
	'click #create-message-button'(event, templateInstance) {
		event.preventDefault();
		templateInstance.create.set(true);
	},
	'submit #messageForm'(event, templateInstance) {
		event.preventDefault();
		const params = AutoForm.getFormValues('messageForm').insertDoc;
		Meteor.call(API.methods.emitEvent.name, params, (err, res) => {
			if (!err && !!res) {
				templateInstance.create.set(false);
			}
		})
	}
});
