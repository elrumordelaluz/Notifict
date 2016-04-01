import React, { Component, createFactory } from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from 'exenv';

import NotifContainer from './NotifContainer';
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;
const Portal = createFactory(NotifContainer);
const AppElement = ExecutionEnvironment.canUseDOM ? document.body : { appendChild: function() {} };

class Notif extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.node = document.createElement('div');
    this.node.className = 'NotifContainer';
    AppElement.appendChild(this.node);
    this.renderPortal(this.props);
  }

  componentWillReceiveProps (newProps) {
    this.renderPortal(newProps);
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.node);
    AppElement.removeChild(this.node);
  }

  renderPortal (props) {
    sanitizeProps(props);
    this.portal = renderSubtreeIntoContainer(this, Portal(props), this.node);
  }

  render () {
    return null;
  }
}

Notif.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  shouldCloseOnOverlayClick: React.PropTypes.bool,
  closeTimeoutMS: React.PropTypes.number,
  onRequestClose: React.PropTypes.func
};

Notif.defaultProps = {
  isOpen: false,
  shouldCloseOnOverlayClick: true,
  closeTimeoutMS: 0
};

const sanitizeProps = (props) => delete props.ref;

export default Notif;
