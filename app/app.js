import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor () {
    super() 
    this.state = {
      canvas: [],
    }
    this.color = this.color.bind(this);
  }

  componentDidMount () {
    this.setState({
      canvas: new Array(20).fill(new Array(20).fill(0))
    })
  }

  color (r) {
    if(this.refs[r].style.backgroundColor !== 'white') {
      this.refs[r].style.backgroundColor = 'white'
    } else {
      this.refs[r].style.backgroundColor = 'red'
    }
    console.log(r)
    console.log(this.refs[r])
  }

  // renderrrrrr
  render () {
    return (
      <div>
        {
        this.state.canvas.map((value, index) => (
          <div>
            {value.map((cell, i) => (
              <button 
                ref={`${index}${i}`}
                style={{width:'20px',height:'20px',border:'1px solid black', backgroundColor:'white'}}
                onClick={_=>this.color(`${index}${i}`)}
                draggable
                onDragEnter={_=>this.color(`${index}${i}`)}
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
