import 'bootstrap/js/dist/tooltip';
import 'bootstrap/scss/bootstrap.scss';

import 'font-awesome/scss/font-awesome.scss';

import Popup from 'react-popup';
import { render } from 'react-dom';
import React from 'react';
import $ from 'jquery';

import './styles/main.scss';
import './components/vendor/analytics';

import Conveyor from './components/Conveyor';
import PackView from './components/PackView';
import { CreateButton, SubmitButton } from './components/PackButtons';


render(
  <PackView />,
  document.getElementById('packs')
);

render(
  <Conveyor />,
  document.getElementById('conveyor')
);

render(
  <CreateButton />,
  document.getElementById('pack-create')
);

render(
  <SubmitButton />,
  document.getElementById('pack-submit')
);

render(
  <Popup />,
  document.getElementById('popup-container')
);

$('body').tooltip({
  selector: '[data-toggle="tooltip"]',
  delay: 100,
  html: true,
});
