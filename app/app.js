import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var cellStyle = {
  width:'20px',
  height:'20px',
  borderLeft:'1px solid black',
  borderTop:'1px solid black',
  backgroundColor:'white',
  padding:'0px',
  margin:'0px',
  cursor:'pointer',
  outline:'none',
}
var rowStyle = {
  padding:'0px',
  margin:'0px',
  height:'20px',

}

var gridWrap = {
  border: '2px solid black',
  display:'inline-block',
}

class App extends Component {
  constructor () {
    super() 
    this.state = {
      canvas: [],
      maxY: 30,
      maxX: 30,
    }
    this.color = this.color.bind(this);
    this.fill = this.fill.bind(this);
    this.paint = this.paint.bind(this);
  }

  componentDidMount () {
    this.setState({
      canvas: new Array(30).fill(new Array(30).fill(0))
    })
  }

  color (r) {
    if(this.refs[r].style.backgroundColor !== 'white') {
      this.refs[r].style.backgroundColor = 'white';
    } else {
      this.refs[r].style.backgroundColor = 'red';
    }
  }

  paint (r) {
    this.refs[r].style.backgroundColor = 'red';
  }

  fill (r) {
    let y = r.split('y')[1];
    let x = r.split('y')[0].slice(1);
    const loop = (y,x) => {
      this.paint(`x${x}y${y}`);
      if(x-1 >= 0 && this.refs[`x${x}y${y}`].style.backgroundColor === 'white')              loop(y, x-1);
      if(y-1 >= 0 && this.refs[`x${x}y${y}`].style.backgroundColor === 'white')              loop(y-1, x);
      if(x+1 < this.state.maxX && this.refs[`x${x}y${y}`].style.backgroundColor === 'white') loop(y, x+1);
      if(y+1 < this.state.maxY && this.refs[`x${x}y${y}`].style.backgroundColor === 'white') loop(y+1, x);
      return;
    }
    loop(y,x);
  }

  render () {
    return (
      <div style={gridWrap}>
        {
        this.state.canvas.map((value, index) => (
          <div style={rowStyle}>
            {value.map((cell, i) => (
              <button 
                value={cell}
                ref={`x${i}y${index}`}
                style={cellStyle}
                onClick={_=>this.color(`x${i}y${index}`)}
                onDragEnter={_=>this.color(`x${i}y${index}`)}
                draggable
                onDoubleClick={_=>this.fill(`x${i}y${index}`)}
              >
              </button>
            ))}
          </div>))
        }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
