import React from 'react';

export class about extends React.PureComponent {
  state = {
    name: 'Ninh',
    age: 19
  };

  render() {
    const { name, age } = this.state;
    return (
      <div>
        <h1>Hello World</h1>
        <p>
          Hello! My name is ${name}, and I'm ${age} year old.
        </p>
      </div>
    );
  }
}

export default about;
