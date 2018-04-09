import { Mongo } from 'meteor/mongo';
import { API } from "../api/api";

export const MessageQueueCollection = new Mongo.Collection(API.collections.messageQueue.name);