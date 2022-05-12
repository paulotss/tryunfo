import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
    };
  }

  onSaveButtonClick() {
    this.setState((sta) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: sta.hasTrunfo || sta.cardTrunfo,
      cards: sta.cards.concat([{
        cardName: sta.cardName,
        cardDescription: sta.cardDescription,
        cardAttr1: sta.cardAttr1,
        cardAttr2: sta.cardAttr2,
        cardAttr3: sta.cardAttr3,
        cardImage: sta.cardImage,
        cardRare: sta.cardRare,
        cardTrunfo: sta.cardTrunfo,
      }]),
    }));
  }

  onInputChange({ target }) {
    const { name } = target;
    let value;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'number') {
      value = Number(target.value);
    } else {
      value = target.value;
    }
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
      hasTrunfo,
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
                hasTrunfo={ hasTrunfo }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.onInputChange }
                onSaveButtonClick={ this.onSaveButtonClick }
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
