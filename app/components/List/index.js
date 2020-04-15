import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import H2 from '../H2';
import Rl from './Rl';
import Li from './Li';
import Button from '../Button';

// import Wrapper from './Wrapper';

function List({
  clickAction,
  isAssignment,
  isHousekeeping,
  hasMultipleSet,
  component,
  data,
}) {
  const roomListProps = {
    clickAction,
    isAssignment,
    isHousekeeping,
  };

  const ComponentToRender = component;
  const WrapperComponent = data.displayOrientation == 'horizontal' ? Rl : Li;

  let content = <div />;
  const items = data.items === undefined ? [] : data.items;
  const listTitle = data.name === undefined ? '' : data.name;

  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, items.length);
  }, [items]);

  const onButtonClick = status => {
    // tells children to change their status to given one
    itemsRef.current.map(inputEl => inputEl.roomClickAction(status));
  };

  if (items.length > 0) {
    content = items.map((item, i) => {
      if (isAssignment && hasMultipleSet) {
        return (
          <ComponentToRender
            ref={el => (itemsRef.current[i] = el)}
            {...roomListProps}
            key={`item-${item._id}`}
            _id={item._id}
            item={item}
          />
        );
      }
      return (
        <ComponentToRender
          {...roomListProps}
          key={`item-${item._id}`}
          _id={item._id}
          item={item}
        />
      );
    });
  } else {
    // Otherwise render empty message
    content = <div>No items assigned</div>;
  }

  return (
    <section>
      <H2>{listTitle}</H2>
      {isAssignment && hasMultipleSet && (
        <div>
          <Button onClick={() => onButtonClick(1)}>All Check out</Button>
          <Button onClick={() => onButtonClick(2)}>All Service</Button>
          <Button onClick={() => onButtonClick(3)}>All Full Service</Button>
          <Button onClick={() => onButtonClick(0)}>Reset</Button>
        </div>
      )}
      <WrapperComponent>{content}</WrapperComponent>
    </section>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  data: PropTypes.object,
  clickAction: PropTypes.func,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
  hasMultipleSet: PropTypes.bool,
};

export default List;
