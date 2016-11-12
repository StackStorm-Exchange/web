import 'bootstrap-loader';
import 'font-awesome-loader';
import Popup from 'react-popup';

import { render } from 'react-dom';
import React from 'react';
import $ from 'jquery';

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
