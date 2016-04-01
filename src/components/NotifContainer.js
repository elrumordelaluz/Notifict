import React, { Component } from 'react';

const stopPropagation = (event) => {
  event.stopPropagation();
}

class NotifPortal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      afterOpen: false,
      beforeClose: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeWithTimeout = this.closeWithTimeout.bind(this);
    this.closeWithoutTimeout = this.closeWithoutTimeout.bind(this);
    this.afterClose = this.afterClose.bind(this);
    this.requestClose = this.requestClose.bind(this);
    this.ownerHandlesClose = this.ownerHandlesClose.bind(this);
    this.shouldBeClosed = this.shouldBeClosed.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.setFocusAfterRender = this.setFocusAfterRender.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount () {
    if (this.props.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    }
  }

  componentWillUnmount () {
    clearTimeout(this.closeTimer);
  }

  componentWillReceiveProps (newProps) {
    if (!this.props.isOpen && newProps.isOpen) {
      this.setFocusAfterRender(true);
      this.open();
    } else if (this.props.isOpen && !newProps.isOpen) {
      this.close();
    }
  }

  componentDidUpdate () {
    if (this.focusAfterRender) {
      this.focusContent();
      this.setFocusAfterRender(false);
    }
  }

  setFocusAfterRender (focus) {
    this.focusAfterRender = focus;
  }

  open () {
    this.setState({
      isOpen: true
    }, () => {
      this.setState({
        afterOpen: true
      })
      this.refs.notif.focus();
    })
  }

  close () {
    if (!this.ownerHandlesClose()) {
      return;
    }
    if (this.props.closeTimeoutMS > 0) {
      this.closeWithTimeout();
    } else {
      this.closeWithoutTimeout();
    }
  }

  focusContent () {
    this.refs.notif.focus();
  }

  closeWithTimeout () {
    this.setState({
      beforeClose: true
    }, () => {
      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.props.closeTimeoutMS);
    })
  }

  closeWithoutTimeout () {
    this.setState({
      afterOpen: false,
      beforeClose: false
    }, this.afterClose);
  }

  afterClose (event) {

  }

  handleKeyDown (event) {
    if (event.keyCode == 27 /*esc*/) {
      event.preventDefault();
      this.requestClose();
    }
  }

  handleCloseClick () {
    if (this.props.shouldCloseOnOverlayClick) {
      if (this.ownerHandlesClose()) {
        this.requestClose();
      } else {
        // 
      }
    }
  }

  requestClose () {
    if (this.ownerHandlesClose()) {
      this.props.onRequestClose();
    }
  }

  ownerHandlesClose () {
    return this.props.onRequestClose;
  }

  shouldBeClosed () {
    return !this.props.isOpen && !this.state.beforeClose;
  }

  render () {
    return  this.shouldBeClosed() ? <div /> : 
      <div onClick={stopPropagation}>
        <button onClick={this.handleCloseClick} onKeyDown={this.handleKeyDown} ref="notif">close</button>
        {this.props.children}
      </div>
  }
}

export default NotifPortal;
