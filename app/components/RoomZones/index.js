/**
 *
 * RoomZones
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import H2 from '../H2';

export function RoomZones({ zones, component, ...props }) {
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
    sectionContent = <div>No zones</div>;
  }
  return sectionContent;
}

RoomZones.propTypes = {
  zones: PropTypes.object.isRequired,
  updateAssignList: PropTypes.func.isRequired,
  isAssignment: PropTypes.bool,
  isHousekeeping: PropTypes.bool,
};

export default RoomZones;
