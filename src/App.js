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
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
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
      search: '',
      searchRare: 'todas',
      searchCards: [],
    };
  }

  handleChangeSearch({ target }) {
    const { name, value } = target;
    this.setState((sta) => {
      let sr;
      let ss;
      if (target.type === 'select-one') {
        sr = value;
        ss = sta.search;
      } else {
        sr = sta.searchRare;
        ss = value;
      }
      const search = sta.cards.filter((card) => {
        let result;
        if (sr !== 'todas') {
          result = card.cardName.includes(ss) && card.cardRare === sr;
        } else {
          result = card.cardName.includes(ss);
        }
        return result;
      });
      return ({
        [name]: value,
        searchCards: search,
      });
    });
  }

  handleClickDelete(idName) {
    this.setState((sta) => ({
      cards: sta.cards.filter((card) => card.cardId !== idName),
      hasTrunfo: sta.cards.find((card) => card.cardId === idName).cardTrunfo
        && sta.hasTrunfo ? false : sta.hasTrunfo,
    }));
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
        cardId: sta.cards.length,
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
      cards,
      isSaveButtonDisabled,
      searchCards,
      searchRare,
      search,
    } = this.state;

    const showCards = search || searchRare !== 'todas' ? searchCards : cards;

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
          <h1>Meu Deck</h1>
          <label htmlFor="search">
            Nome:
            <br />
            <input
              type="text"
              id="search"
              name="search"
              onChange={ this.handleChangeSearch }
              data-testid="name-filter"
            />
          </label>
          <label htmlFor="searchRare">
            Raridade:
            <br />
            <select
              id="searchRare"
              name="searchRare"
              onChange={ this.handleChangeSearch }
              data-testid="rare-filter"
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <section className="show">
            { showCards.map((card, key) => (
              <div className="cardBD" key={ `d${key}` }>
                <Card
                  key={ key }
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  key={ `b${key}` }
                  onClick={ () => { this.handleClickDelete(card.cardId); } }
                >
                  Excluir
                </button>
              </div>
            )) }
          </section>
        </main>
      </>
    );
  }
}

export default App;
