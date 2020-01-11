import PropTypes from 'prop-types';
import React, { useRef, useEffect }  from 'react';

import Rl from './Rl';
// import Wrapper from './Wrapper';

function List(props) {

  const {clickAction, isAssignment, isHousekeeping } = props;

  const roomListProps = {
    clickAction,
    isAssignment,
    isHousekeeping,
  };

  const ComponentToRender = props.component;

  let content = <div />;
  // If we have items, render them
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, props.items.length);
  }, [props.items]);

  const onButtonClick = (status) => {
    //tells children to change their status to given one
    itemsRef.current.map(inputEl => inputEl.roomClickAction(status));
  };

  if (props.items.length > 0) {
    content = props.items.map((item, i) => {
      if(isAssignment){
        return <ComponentToRender ref={el => itemsRef.current[i] = el}  {...roomListProps} key={`item-${item._id}`} id={item._id} item = {item} />
      }else{
        return <ComponentToRender  {...roomListProps} key={`item-${item._id}`} id={item._id} item = {item} />
      }
    });
  } else {
    // Otherwise render empty message
    content = <div>No items assigned</div>;
  }


  return (
    <section>
      {isAssignment &&
        <div>
          <button onClick={() => onButtonClick(1)}>All Check out</button>
          <button onClick={() => onButtonClick(2)}>All Service</button>
          <button onClick={() => onButtonClick(3)}>All Full Service</button>
          <button onClick={() => onButtonClick(0)}>Reset</button>
        </div>
      }
      <Rl>{content}</Rl>
    </section>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;
