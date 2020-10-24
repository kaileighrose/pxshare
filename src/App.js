import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    
  }

  async upload() {
    const response = await fetch('/upload');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body.message;
  };

  handleUpload(event) {
    let photo = event.target.files[0];
  };

  render() {
    return (
      <div className="App">
        <form>
          <input type="file" id="newPhoto" onChange={this.handleUpload}/> 
        </form>
      </div>
    );
  }
}

export default App;