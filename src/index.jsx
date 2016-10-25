
import 'bootstrap/bootstrap.js';

<script type="text/javascript" src="https://d3itxuyrq7vzpz.cloudfront.net/assets/reamaze.js"></script>

import {render} from 'react-dom';
import PackList from './components/PackList.jsx';

import './components/utils.jsx';

import 'bootstrap/bootstrap.css';
import './styles/main.css';

render(
  <PackList />,
  document.getElementById("packs")
);
