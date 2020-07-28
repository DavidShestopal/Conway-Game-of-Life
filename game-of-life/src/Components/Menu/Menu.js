import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <button onClick={this.props.generateRandom}>Random</button>
        <button onClick={this.props.playGame}>Start</button>
        <button onClick={this.props.increaseSpeed}>Increase Speed</button>
        <button onClick={this.props.decreaseSpeed}>Decrease Speed</button>
        <button onClick={this.props.stopGame}>Stop</button>
        <button onClick={this.props.clearGrid}>Clear</button>
      </div>
    );
  }
}

export default Menu;
