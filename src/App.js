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
    this.handleChangesTrunfo = this.handleChangesTrunfo.bind(this);
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
      sRare: 'todas',
      sTrunfo: false,
      searchCards: [],
    };
  }

  handleChangesTrunfo({ target }) {
    this.setState((sta) => {
      document.getElementById('sRare').disabled = target.checked;
      document.getElementById('search').disabled = target.checked;
      return {
        searchCards: target.value ? sta.cards.filter((card) => card.cardTrunfo) : [],
        search: '',
        sRare: 'todas',
        sTrunfo: target.checked,
      };
    });
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
        sr = sta.sRare;
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
      let result = true;
      let attr;
      const max = 90;
      const maxSum = 210;
      if (
        sta.cardName && sta.cardDescription && sta.cardImage
        && (Number(sta.cardAttr1) <= max && Number(sta.cardAttr1) >= 0)
        && (Number(sta.cardAttr2) <= max && Number(sta.cardAttr2) >= 0)
        && (Number(sta.cardAttr3) <= max && Number(sta.cardAttr3) >= 0)
      ) {
        attr = Number(sta.cardAttr1) + Number(sta.cardAttr2) + Number(sta.cardAttr3);
        result = attr > maxSum;
      }
      return ({ isSaveButtonDisabled: result });
    });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2 } = this.state;
    const { cardAttr3, cardImage, cardRare, cardTrunfo } = this.state;
    const { hasTrunfo, cards, isSaveButtonDisabled, searchCards } = this.state;
    const { sRare, sTrunfo, search } = this.state;
    const showCards = search || sRare !== 'todas' || sTrunfo ? searchCards : cards;

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
            <input
              type="text"
              id="search"
              name="search"
              onChange={ this.handleChangeSearch }
              data-testid="name-filter"
            />
          </label>
          <label htmlFor="sRare">
            Raridade:
            <select
              id="sRare"
              name="sRare"
              onChange={ this.handleChangeSearch }
              data-testid="rare-filter"
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <label htmlFor="sTrunfo">
            Super trunfo:
            <input
              type="checkbox"
              id="sTrunfo"
              name="sTrunfo"
              data-testid="trunfo-filter"
              onChange={ this.handleChangesTrunfo }
            />
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
