import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import Rl from './Rl';
import Li from './Li';

// import Wrapper from './Wrapper';

function List({
  clickAction,
  secClickAction,
  isAssignment,
  isHousekeeping,
  component,
  items,
  orientation,
}) {
  const roomListProps = {
    clickAction,
    secClickAction,
    isAssignment,
    isHousekeeping,
  };

  const ComponentToRender = component;
  const WrapperComponent = orientation === 'horizontal' ? Rl : Li;

  let content = <div />;
  const itemsRef = useRef([null]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, items.length);
  }, [items]);

  if (items.length > 0) {
    content = items.map(item => (
      <ComponentToRender {...roomListProps} key={item._id} item={item} />
    ));
  } else {
    // Otherwise render empty message
    content = <div>No items assigned</div>;
  }

  return <WrapperComponent>{content}</WrapperComponent>;
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  orientation: PropTypes.string.isRequired,
  clickAction: PropTypes.func.isRequired,
  secClickAction: PropTypes.func,
  isAssignment: PropTypes.bool.isRequired,
  isHousekeeping: PropTypes.bool,
};

export default List;
