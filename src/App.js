import React, { Component } from 'react';
import SliderPhotos from './SliderPhotos';
import './App.css';
import * as dat from 'dat.gui';

class App extends Component {

  constructor(props) {
    super(props);

    this.currentState = {
      widthContainer: window.innerWidth,
      heightContainer: window.innerHeight,
      useHardcodedWidth: false,
      hardcodedWidth: 300,
      useHardcodedHeight: false,
      hardcodedHeight: 200
    }

    this.state = this.currentState;

    const gui = new dat.GUI();

    gui.add(this.currentState, 'widthContainer', 100, window.innerWidth).onChange(this.onChange.bind(this));
    gui.add(this.currentState, 'heightContainer', 100, window.innerHeight).onChange(this.onChange.bind(this));
    gui.add(this.currentState, 'useHardcodedWidth').onChange(this.onChange.bind(this));
    gui.add(this.currentState, 'hardcodedWidth', 10, window.innerHeight).onChange(this.onChange.bind(this));
    gui.add(this.currentState, 'useHardcodedHeight').onChange(this.onChange.bind(this));
    gui.add(this.currentState, 'hardcodedHeight', 10, window.innerHeight).onChange(this.onChange.bind(this));

    this.containerSlider = React.createRef();
  }

  onChange() {
    console.log('onchange');
    
    this.setState({
      widthContainer: this.currentState.widthContainer,
      heightContainer: this.currentState.heightContainer,
      useHardcodedWidth: this.currentState.useHardcodedWidth,
      hardcodedWidth: this.currentState.hardcodedWidth,
      useHardcodedHeight: this.currentState.useHardcodedHeight,
      hardcodedHeight: this.currentState.hardcodedHeight
    })
  }

  render() {

    // is hardcoded
    let width = null;
    let height = null;
    
    if(this.state.useHardcodedWidth) {
      width = this.state.hardcodedWidth;
    }
    if(this.state.useHardcodedHeight) {
      height = this.state.hardcodedHeight;
    }

    if(this.containerSlider.current) {
      if (width) {
        this.containerSlider.current.style.width = 'auto';
      } 
      else {
        this.containerSlider.current.style.width = this.state.widthContainer + 'px';
      }
      if (height) {
        this.containerSlider.current.style.height = 'auto';
      } 
      else {
        this.containerSlider.current.style.height = this.state.heightContainer + 'px';
      }
      
    }

    const data = [
      { url: '/dog1.jpg', children: "<div class='title'>Cute dog</div>"},
      { url: '/dog2.jpg', children: "<div class='title'>Cute dog 2</div>"},
      { url: '/dog3.jpg', children: "<div class='title'>Cute dog 3</div>"},
      { url: '/dog4.jpg', children: "<div class='title'>Cute dog 4</div>"},
      { url: '/dog5.jpg', children: "<div class='title black'>THE CUTEST</div>"}
    ]
    return (
      <div className="App">
        <div ref={this.containerSlider} className='containerSlider'>
          <SliderPhotos width={width} height={height} data={data} />
        </div>
      </div>
    );
  }
}

export default App;
