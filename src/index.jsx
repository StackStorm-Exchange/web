import 'bootstrap/scss/bootstrap.scss';

import 'font-awesome/scss/font-awesome.scss';

import Popup from 'react-popup';
import { render } from 'react-dom';
import React from 'react';

import './styles/main.scss';
import './styles/customizations.scss';
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
