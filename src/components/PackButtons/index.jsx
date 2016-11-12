import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';

import './index.scss';

const sharedSettings = {

};

const CreatePopup = () => (
  <div className="create-popup">Test, yo!</div>
);

const SubmitPopup = () => (
  <div className="submit-popup">Yo momma is so fat she wouldn't even fit into our AWS pack.</div>
);

export const CreateButton = () => {
  const popup = Popup.register($.extend({
    title: 'Create your own pack',
    content: <CreatePopup />,
  }, sharedSettings));
  return (<button
    type="button"
    className="pack-create btn btn-secondary"
    onClick={() => { Popup.queue(popup); }}
  >How to create</button>);
};

export const SubmitButton = () => {
  const popup = Popup.register($.extend({
    title: 'test',
    content: <SubmitPopup />,
  }, sharedSettings));
  return (<button
    type="button"
    className="pack-submit btn btn-primary"
    onClick={() => { Popup.queue(popup); }}
  >Add your pack!</button>);
};
