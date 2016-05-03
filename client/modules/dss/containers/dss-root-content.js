import React from 'react';

import {SectionList} from '/client/modules/ui-components';
import {CoreRootTriSection} from '/client/modules/core';
import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import RainGraph from './rain-graph';
import WeatherStationMap from './weather-station-map';

import DSSLayout from './../components/dss-layout.jsx';

const composerLandingPage = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();
  const {WeatherStations, Labels} = Collections;

  const sections = [];
  const spacing = false;

  if (Meteor.subscribe('weather-stations').ready()
    //&& Meteor.subscribe('labels').ready()
    ) {

    const stations = WeatherStations.find().fetch();
    // const plantingDateOptions = Labels.findOne({name: "YC_PlantingDateOptions"});

    const map = React.createElement(WeatherStationMap, {stations})
    const chart = React.createElement(RainGraph)

    sections.push(React.createElement(DSSLayout, {chart, map}))

    onData(null, {sections, spacing});

  }

};

export default composeAll(
  composeWithTracker(composerLandingPage),
  useDeps()
)(SectionList);