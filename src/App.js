import React from 'react';
import Form from './components/Form';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Tryunfo</h1>
        </header>
        <section>
          <Form />
        </section>
      </>
    );
  }
}

export default App;
