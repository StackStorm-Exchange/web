import React from 'react';
import './index.scss';

const freakOut = true;
const wiggleBoxes = false;
const LABELS = ['none', 'none', 'solid', 'up', 'up'];

const random = (maximum, minimum = 0) =>
  Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;

const choose = array => array[random(array.length - 1)];

const Box = ({ width, offset, label = 'two' }) => {
  let newWidth;
  let newHeight;
  let labelOffset;
  const params = {
    style: {
      width: `${width}px`,
      fontSize: `${width}px`,
    },
    className: 'box',
  };
  if (freakOut) {
    newWidth = width * random(10, 9) * 0.1;
    newHeight = newWidth * random(8, 7) * 0.1;
    labelOffset = `${random(55, 25)}%`;
    params.style.left = `${offset}px`;
    params.style.width = newWidth;
    params.style.paddingBottom = newHeight;
    params.className += ` box-logo-rot-${random(5)}`;
    params.className += ` box-logo-scale-${random(5)}`;
    params.className += ` box-logo-drag-${random(3)}`;
    params.className += ` box-tape-size-${random(3)}`;
    if (random(500) === 500) {
      params.className += ' unicorn';
    }
  }
  return (
    <div {...params}>
      { label ? <div style={label === 'solid' ? { top: labelOffset } : {}} className={`label-${label}`} /> : '' }
    </div>
  );
};
Box.propTypes = {
  width: React.PropTypes.number,
  offset: React.PropTypes.number,
  label: React.PropTypes.oneOf(LABELS),
};

const Stack = ({
  boxesCount = 3,
  wiggle = 2,
  label,
  widthRange = { min: 6, max: 10, multiplier: 10 },
}) => {
  const width = random(widthRange.max, widthRange.min) * widthRange.multiplier;
  return (
    <ul className="stack">
      {Array.from(Array(boxesCount)).map((_, index) =>
        <Box
          width={width}
          offset={wiggleBoxes ? random(wiggle * 2) - wiggle : 0}
          label={label || choose(LABELS)}
          key={index}
        />
      )}
    </ul>
  );
};
Stack.propTypes = {
  boxesCount: React.PropTypes.number,
  wiggle: React.PropTypes.number,
  widthRange: React.PropTypes.shape({
    min: React.PropTypes.number,
    max: React.PropTypes.number,
  }),
  label: React.PropTypes.oneOf(LABELS),
};

const Cluster = ({ stacksCount, boxesRange = { min: 1, max: 4 } }) => (
  <div className="cluster">
    {Array.from(Array(stacksCount)).map((_, index) =>
      <Stack
        boxesCount={random(boxesRange.max, boxesRange.min)}
        key={index}
      />
    )}
  </div>
);
Cluster.propTypes = {
  stacksCount: React.PropTypes.number,
  boxesRange: React.PropTypes.shape({
    min: React.PropTypes.number,
    max: React.PropTypes.number,
  }),
};

const Conveyor = () =>
  (
    <div className="conveyor">

      <div className="arm" />

      <Cluster stacksCount={3} boxesRange={{ min: 2, max: 4 }} />
      {' '}
      <Cluster stacksCount={2} boxesRange={{ min: 2, max: 3 }} />
      {' '}
      <Cluster stacksCount={3} boxesRange={{ min: 1, max: 4 }} />
      {' '}
      <Cluster stacksCount={2} boxesRange={{ min: 2, max: 3 }} />
      {' '}
      <Cluster stacksCount={3} boxesRange={{ min: 2, max: 4 }} />
      {' '}
      <Cluster stacksCount={2} boxesRange={{ min: 2, max: 3 }} />
      {' '}
      <Cluster stacksCount={3} boxesRange={{ min: 1, max: 4 }} />
      {' '}
      <Cluster stacksCount={2} boxesRange={{ min: 2, max: 3 }} />

      <div className="belt" />

    </div>
  );

export default Conveyor;
