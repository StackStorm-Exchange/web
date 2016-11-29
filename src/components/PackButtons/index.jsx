import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';

import './index.scss';

const sharedSettings = {

};

const CreatePopup = () => (
  <div className="create-popup">Follow <a href="https://docs.stackstorm.com/reference/packs.html" target="_blank">Create and Contribute a Pack</a> guide. Once ready, submit a PR against PR against <a href="https://github.com/StackStorm-Exchange/exchange-incubator" target="_blank">exchange-incubator repo</a> and follow instructions there.</div>
);

const SubmitPopup = () => (
  <div className="submit-popup">Nice form with automation is coming. Meantime, please submit your pack as a PR against <a href="https://github.com/StackStorm-Exchange/exchange-incubator" target="_blank">exchange-incubator repo</a>, and ping us on Slack or email <a href="mailto:support@stackstorm.com">support@stackstorm.com</a>.</div>
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
    title: 'Submit a pack',
    content: <SubmitPopup />,
  }, sharedSettings));
  return (<button
    type="button"
    className="pack-submit btn btn-primary"
    onClick={() => { Popup.queue(popup); }}
  >Submit a pack</button>);
};
