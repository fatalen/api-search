import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	listItems: null
    }
  }

  render() {
    return (
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    )
  }
}

export default List;
