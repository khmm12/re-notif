import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]};

import Notif from './Notif';

class Notifs extends Component {
  static propTypes = {
    theme: PropTypes.object,
    className: PropTypes.string,
    CustomComponent: PropTypes.func,
    forceNotifsStyles: PropTypes.bool
  }

  render() {
    const { notifs, theme, className, CustomComponent, forceNotifsStyles} = this.props;

    const items = notifs.map((notif) => {
      return (
        <Notif key={getter(notif, 'id')} message={getter(notif, 'message')} kind={getter(notif, 'kind')} theme={theme} CustomComponent={CustomComponent}/>
      );
    });

    const componentStyles = forceNotifsStyles || !theme ? styles : {};
    return (
      <div className={classnames('notif-container', className)} style={componentStyles}>
        <ReactCSSTransitionGroup transitionName="notif" transitionEnterTimeout={40} transitionLeaveTimeout={40}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const styles = {
  position: 'fixed',
  top: '10px',
  right: 0,
  left: 0,
  zIndex: 1000,
  width: '80%',
  maxWidth: 400,
  margin: 'auto'
};

export default connect(
  (state) => {
    return { notifs: state.get ? state.get('notifs') : state.notifs };
  },
  { }
)(Notifs);
