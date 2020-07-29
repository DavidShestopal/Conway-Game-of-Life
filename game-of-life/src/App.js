import React, { Component } from 'react';
import './App.css';

import Grid from './Components/Grid/Grid';
import Menu from './Components/Menu/Menu';

// Stringify array of boxes and then parse it.
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

class App extends Component {
  constructor() {
    super();
    this.rows = 25;
    this.cols = 45;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
      speed: 200,
    };
  }

  generateRandom = () => {
    console.log('Generating random config...');
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  clearGrid = () => {
    console.log('Clearing grid...');
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    this.setState({
      gridFull: gridCopy,
      generation: 0,
      speed: 200,
    });
  };

  playGame = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.gameAlgorithm, this.state.speed);
  };

  stopGame = () => {
    clearInterval(this.intervalId);
  };

  gameAlgorithm = () => {
    let grid = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);
    let generationCount = this.state.generation;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;

        // selecting individual boxes
        if (i > 0) if (grid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (grid[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (grid[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (grid[i][j + 1]) count++;
        if (j > 0) if (grid[i][j - 1]) count++;
        if (i < this.rows - 1) if (grid[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (grid[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (grid[i + 1][j + 1]) count++;

        // live or dead - Game Logic
        if (grid[i][j] && (count < 2 || count > 3)) grid2[i][j] = false;
        if (!grid[i][j] && count === 3) grid2[i][j] = true;
      }
    }
    generationCount++;
    this.setState({
      generation: generationCount,
      gridFull: grid2,
    });
  };

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  increaseSpeed = () => {
    let increaseSpeed = this.state.speed - 50;
    this.setState({
      speed: increaseSpeed,
    });
    console.log('Increasing speed: ' + this.state.speed);
    this.playGame();
  };

  decreaseSpeed = () => {
    let decreaseSpeed = this.state.speed + 50;
    this.setState({
      speed: decreaseSpeed,
    });
    console.log('Decreasing speed: ' + this.state.speed);
    this.playGame();
  };

  render() {
    return (
      <div className="App">
        <nav className="nav">
          <h1 className="title">GAME OF LIFE</h1>
        </nav>
        <div>
          {' '}
          <Grid rows={this.rows} cols={this.cols} gridFull={this.state.gridFull} selectBox={this.selectBox} />
        </div>
        <h4 className="gen"> Current Generation: {this.state.generation} </h4>{' '}
        <Menu
          generateRandom={this.generateRandom}
          clearGrid={this.clearGrid}
          playGame={this.playGame}
          stopGame={this.stopGame}
          increaseSpeed={this.increaseSpeed}
          decreaseSpeed={this.decreaseSpeed}
        />
        <h3 className="rules">Rules:</h3>
        <div className="list">
          <h4>- Any live cell with two or three live neighbours survives. - </h4>
          <h4>- Any dead cell with three live neighbours becomes a live cell. -</h4>
        </div>
        <p style={{ color: 'white' }}>Created by David Shestopal</p>
      </div>
    );
  }
}

export default App;
