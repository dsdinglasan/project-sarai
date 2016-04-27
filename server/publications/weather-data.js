import {WeatherData} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.publish('weather-data', () => {
  return WeatherData.find();
});