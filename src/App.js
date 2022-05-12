import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Tryunfo</h1>
        </header>
        <main>
          <section className="create">
            <article>
              <Form />
            </article>
            <aside className="carPre">
              <Card />
            </aside>
          </section>
        </main>
      </>
    );
  }
}

export default App;
