import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
    this.formValidation();
  }

  formValidation() {
    this.setState((sta) => {
      const {
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardName,
        cardDescription,
        cardImage,
      } = sta;
      let result = true;
      let attr;
      const max = 90;
      const maxSum = 210;
      if (
        cardName && cardDescription && cardImage
        && (Number(cardAttr1) <= max && Number(cardAttr1) >= 0)
        && (Number(cardAttr2) <= max && Number(cardAttr2) >= 0)
        && (Number(cardAttr3) <= max && Number(cardAttr3) >= 0)
      ) {
        attr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
        result = attr > maxSum;
      }
      return ({ isSaveButtonDisabled: result });
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <>
        <header>
          <h1>Tryunfo</h1>
        </header>
        <main>
          <section className="create">
            <article>
              <Form
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.onInputChange }
              />
            </article>
            <aside className="carPre">
              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
              />
            </aside>
          </section>
        </main>
      </>
    );
  }
}

export default App;
