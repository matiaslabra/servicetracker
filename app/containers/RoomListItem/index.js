// /**
//  *
//  * RoomListItem
//  *
//  */

// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectRoomListItem from './selectors';
// import reducer from './reducer';
// import RoomItem from 'components/RoomItem'
// import { setRoomTaken } from '../HomePage/actions';

// export function RoomListItem({
//   item,
//   onClickSetRoomTaken
// }){

//   return <RoomItem dispatchAction = {onClickSetRoomTaken} key={`room-item-${item}`} item={item} />;
// }

// RoomListItem.propTypes = {
//   onRoomClick: PropTypes.func,
// };

// const mapStateToProps = createStructuredSelector({
//   roomListItem: makeSelectRoomListItem(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     onClickSetRoomTaken: evt => dispatch(setRoomTaken(evt))
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(RoomListItem);
