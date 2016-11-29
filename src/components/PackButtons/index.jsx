import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';

import './index.scss';

const sharedSettings = {

};

const CreatePopup = () => (
  <div className="create-popup">
    <p>Want to create a StackStorm pack? Great!
      Here{"'"}s a few steps to get started:
    </p>
    <ol>
      <li>
        Read the
        {' '}<a
          target="_blank" rel="noopener noreferrer"
          href="https://docs.stackstorm.com/reference/packs.html"
        >
          Create and Contribute a Pack
        </a>{' '}
        documentation page.
      </li>
      <li>
        Take a look at the
        {' '}<a
          target="_blank" rel="noopener noreferrer"
          href="https://github.com/StackStorm/st2/tree/master/contrib/hello_st2"
        >
          hello_st2
        </a>{' '}
        and
        {' '}<a
          target="_blank" rel="noopener noreferrer"
          href="https://github.com/StackStorm/st2/tree/master/contrib/examples"
        >
          examples
        </a>{' '}
        packs.
      </li>
      <li>Use our
        {' '}<a
          target="_blank" rel="noopener noreferrer"
          href="https://github.com/StackStorm-Exchange/exchange-template"
        >pack template on GitHub</a>{' '}
        as a structure reference.
      </li>
    </ol>
    <p>You will be automating all the things sooner than you know, and there will be
    no going back! Start on this path with a single step:
    </p>
    <div className="docs-button-wrap">
      <a
        target="_blank" rel="noopener noreferrer"
        href="https://docs.stackstorm.com/packs.html"
        className="btn btn-primary"
      >Read the pack documentation</a>
    </div>
    <div className="iamnew">
      <h5>But I am completely new to this!</h5>
      <p>Fine with us! StackStorm doesn{"'"}t require you to be a 100x ninja wizard unicorn programmer.
      Know a thing or two about DevOps and
        {' '}maybe automation? That{"'"}s it. Now it only depends on how far you want to go.</p>
      <ul>
        <li><strong>Use packs from Exchange, create rules:</strong>{' '}
          basic Git and Linux terminal knowledge.
          Any action can be run by a single command. Any rule is a simple YAML file:
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://github.com/StackStorm-Exchange/stackstorm-email/blob/master/rules/sample.emailsample.yaml"
          >sample.emailsample.yaml</a>.
        </li>
        <li><strong>Run commands on remote servers:</strong>{' '}
      some shell scripting skills. Create
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://github.com/StackStorm/st2/tree/master/contrib/hello_st2/actions"
          >shell actions</a>{' '}
        and use
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://github.com/StackStorm/st2/blob/ed6fdb4043647b766551c25f365782a58abce019/contrib/linux/actions/lsof.yaml"
          >
         core.remote
          </a>{' '}
          to execute commands and scripts. Craft a pack with some internal tools!
        </li>
        <li><strong>Create workflows:</strong>{' '}
      understand how actions work with parameters and output.
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://docs.stackstorm.com/workflows.html"
          >Workflows</a>{' '}
        are a powerful way to connect various actions across different packs.
        </li>
        <li><strong>Create anything:</strong>{' '}
          Python. You can write a pack for any service: it might
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://github.com/StackStorm-Exchange/stackstorm-trello/tree/master/actions"
          >use a Python module</a>{' '}
          or
          {' '}<a
            target="_blank" rel="noopener noreferrer"
            href="https://github.com/StackStorm-Exchange/stackstorm-github/tree/master/actions"
          >connect to API</a>. We{"'"}ll gladly accept it to the Exchange, too!
        </li>
      </ul>
    </div>

  </div>
);

const SubmitPopup = () => (
  <div className="submit-popup">
    <p>We welcome all contributions to StackStorm Exchange! If your pack might be useful
    to more people than just yourself, we would be happy to feature it.</p>
    <p>Don{"'"}t worry if your code isn{"'"}t perfect or the pack is incomplete—we{"'"}ll figure things
    out or find someone else who  might want to jump in and help. </p>
    <p>To submit a pack, just send a pull request to our incubator repository on GitHub:</p>

    <div className="docs-button-wrap">
      <a
        target="_blank" rel="noopener noreferrer"
        href="https://github.com/StackStorm-Exchange/exchange-incubator"
        className="btn btn-primary"
      ><i className="fa fa-github" /> StackStorm-Exchange/exchange-incubator</a>
    </div>

    <p className="final">We{"'"}ll do our best to get in touch within a couple of days, and most of the time it{"'"}s much
    sooner. We work with open source, after all—we can sense user contributions.</p>
  </div>
);

export const CreateButton = () => {
  const popup = Popup.register($.extend({
    title: 'Getting started with packs',
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
