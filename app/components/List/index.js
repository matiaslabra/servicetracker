import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import Horizontal from './Horizontal';
import Vertical from './Vertical';

function List({
  clickAction,
  secClickAction,
  isAssignment,
  isHousekeeping,
  component,
  items,
  orientation,
}) {
  const itemListProps = {
    clickAction,
    secClickAction,
    isAssignment,
    isHousekeeping,
  };

  const ComponentToRender = component;
  const WrapperComponent = orientation === 'horizontal' ? Horizontal : Vertical;

  let content = <div />;
  const itemsRef = useRef([null]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, items.length);
  }, [items]);

  if (items.length > 0) {
    content = items.map(item => (
      <ComponentToRender {...itemListProps} key={item._id} item={item} />
    ));
  } else {
    // Otherwise render empty message
    content = <p>No items assigned</p>;
  }

  return <WrapperComponent>{content}</WrapperComponent>;
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  clickAction: PropTypes.func.isRequired,
  secClickAction: PropTypes.func,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
};

export default List;
