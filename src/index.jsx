import 'bootstrap-loader';
import 'font-awesome-loader';

import { render } from 'react-dom';
import React from 'react';
import $ from 'jquery';

import 'components/vendor/reamaze';
import 'components/vendor/analytics';
import 'components/vendor/reamazeWidget';

import Conveyor from 'components/Conveyor';
import PackView from 'components/PackView';


render(
  <PackView />,
  document.getElementById('packs')
);

render(
  <Conveyor />,
  document.getElementById('conveyor')
);

$('body').tooltip({
  selector: '[data-toggle="tooltip"]',
  delay: 100,
  html: true,
});
