import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <fieldset>
          <div>
            <label htmlFor="nome">
              Nome:
              <br />
              <input type="text" id="nome" name="nome" data-testid="name-input" />
            </label>
          </div>
          <div>
            <label htmlFor="descricao">
              Descrição:
              <br />
              <textarea id="descricao" name="descricao" data-testid="description-input" />
            </label>
          </div>
          <div>
            <label htmlFor="atributo1">
              Atributo 1:
              <br />
              <input
                type="number"
                id="atributo1"
                name="atributo1"
                data-testid="attr1-input"
              />
            </label>
          </div>
          <div>
            <label htmlFor="atributo2">
              Atributo 2:
              <br />
              <input
                type="number"
                id="atributo2"
                name="atributo2"
                data-testid="attr2-input"
              />
            </label>
          </div>
          <div>
            <label htmlFor="atributo3">
              Atributo 3:
              <br />
              <input
                type="number"
                id="atributo3"
                name="atributo3"
                data-testid="attr3-input"
              />
            </label>
          </div>
          <div>
            <label htmlFor="imagem">
              Imagem:
              <br />
              <input type="text" id="imagem" name="imagem" data-testid="image-input" />
            </label>
          </div>
          <div>
            <label htmlFor="raridade">
              Raridade:
              <select id="raridade" name="raridade" data-testid="rare-input">
                <option value="normal">normal</option>
                <option value="raro">raro</option>
                <option value="muito raro">muito raro</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="strunfo">
              Super Trunfo:
              <input
                type="checkbox"
                id="strunfo"
                name="strunfo"
                data-testid="trunfo-input"
              />
            </label>
          </div>
          <div>
            <button type="button" data-testid="save-button">Salvar</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default Form;
