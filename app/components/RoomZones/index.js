/**
 *
 * RoomZones
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import H2 from '../H2';
import LoadingIndicator from '../LoadingIndicator';
// import Vertical from '../List/Vertical';

function RoomZones({ loading, zones, component, ...props }) {
  const ComponentToRender = component;
  let sectionContent = <div />;
  if (Object.keys(zones).length > 0) {
    sectionContent = Object.entries(zones).map(([index, zone]) => (
      <div key={index}>
        <H2>{index}</H2>
        <ComponentToRender
          items={zone.items}
          orientation={zone.displayOrientation}
          {...props}
        />
      </div>
    ));
  } else {
    sectionContent = <p style={{ textAlign: 'center' }}>No rooms assigned</p>;
  }
  return <Fragment>{loading ? <LoadingIndicator /> : sectionContent}</Fragment>;
}

RoomZones.propTypes = {
  zones: PropTypes.object.isRequired,
  date: PropTypes.string,
  parentAction: PropTypes.func.isRequired,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
  component: PropTypes.elementType.isRequired,
  loading: PropTypes.bool,
};

export default RoomZones;
