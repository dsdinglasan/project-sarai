import React from 'react';
import {useDeps, composeAll, compose} from 'mantra-core';

import ModulesForm from './../../components/dashboard/aws-squares.jsx';

const deps = (context, actions) => ({
  setWSId: actions.Weather.setWSId,
  context: () => context
})

const AWSSquaresRedux = ({context}, onData) => {
  const {Meteor, dssAdminStore, Collections} = context()

  onData(null, {})

  return dssAdminStore.subscribe(() => {
    const {wsID} = dssAdminStore.getState()

    onData(null, {wsID})
  })
}

export default composeAll(
  compose(AWSSquaresRedux),
  useDeps(deps)
)(ModulesForm);