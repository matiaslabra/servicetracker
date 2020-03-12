/**
 *
 * Section
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import List from 'components/List';

import RoomItem from 'components/RoomItem';
import Card from 'components/Card';
import H2 from 'components/H2';

function Section({
  title,
  itemComponent,
  component,
  data,
  action,
  isAssignment,
  isHousekeeping
}) {
  console.log('Secion data:', data);
  const ComponentToRender = component;
  let sectionContent = <div />;

  if(Object.keys(data).length > 0){
    sectionContent = data.map(item => {
      return (
        <React.Fragment>
          <ComponentToRender
            component={itemComponent}
            data = { item }
            clickAction = { action }
            isAssignment={ isAssignment ? isAssignment : false }
            isHousekeeping={ isHousekeeping ? isHousekeeping : false }
          />
        </React.Fragment>
      );
    })
  }else{
    sectionContent = <ComponentToRender component={RoomItem} data={[]}/>
  }

  return (
      <section>
        <H2>{title}</H2>
        {sectionContent}
      </section>
  )
}

Section.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default Section;
