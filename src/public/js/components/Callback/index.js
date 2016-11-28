import React, {Component} from 'react';

export default class Callback extends Component {

  componentDidMount() {
    window.setTimeout(opener.IN.connectCallback, 1);
  }

  render() {
    return <div><p>This page should close soon.</p></div>;
  }
}