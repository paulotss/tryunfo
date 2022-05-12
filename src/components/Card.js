import React from 'react';

class Card extends React.Component {
  render() {
    const {
      cardName, //uma string;
      cardDescription, //uma string;
      cardAttr1, //uma string;
      cardAttr2, //uma string;
      cardAttr3, //uma string;
      cardImage, //uma string;
      cardRare, //uma string;
      cardTrunfo, //um boolean;
    } = this.props;
    return (
      <div>
        <h1 data-testid="name-card">{ cardName }</h1>
        <img src={cardImage} alt={cardName} data-testid="image-card" />
        <p data-testid="description-card">{ cardDescription }</p>
        <ul>
          <li data-testid="attr1-card">Attr1: { cardAttr1 }</li>
          <li data-testid="attr2-card">Attr2: { cardAttr2 }</li>
          <li data-testid="attr3-card">Attr3: { cardAttr3 }</li>
        </ul>
        <p data-testid="rare-card">Raridade: { cardRare }</p>
        { cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p> }
      </div>
    );
  }
}

export default Card;