import React, { Component } from 'react';
import Notif from './Notif';

class App extends Component {
  constructor () {
    super();
    this.state = {
      notifOpen: false,
      notifications: {}
    }

    this.openNotif = this.openNotif.bind(this);
    this.closeNotif = this.closeNotif.bind(this);
  }

  openNotif (notif) {
    const state = Object.assign({}, this.state.notifications, {
      [notif]: true
    })
    this.setState({ notifications: state });
  }

  closeNotif (notif) {
    const state = Object.assign({}, this.state.notifications, {
      [notif]: false
    })
    this.setState({ notifications: state });
  }

  renderNotfis (n) {
    return n.map(notif => (
      <div key={notif}>
        <Notif isOpen={this.state.notifications[notif]} onRequestClose={() => this.closeNotif(notif)}>
          {notif}
        </Notif>
      </div>
      ))
  }

  render () {
    const arr = ['aaa', 'hola', '12121312'];
    const rand = arr[Math.floor(Math.random() * arr.length)];
    return (
      <div>
        <button onClick={() => this.openNotif(rand)}>open</button>
        {this.renderNotfis(arr)}
      </div>
    );
  }
}

export default App;
