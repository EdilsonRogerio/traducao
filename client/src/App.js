import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const baseURL = 'http://localhost:5000';
axios.defaults.baseURL = baseURL;

const App = () => {
  const [traducoes, setTraducoes] = useState([]);
  const [texto_original, setTextOrinal] = useState('');
  const [lingua_origem, setLingua_origem] = useState('');
  const [lingua_destino, setLingua_destino] = useState('');
  const [texto_traduzido, setTexto_traduzido] = useState('');
  const [traduzir, setTraduzir] = useState(false);
  const [editaTraducao, setEditarTraducao] = useState(true);
  const [deletaTraducao, setDeletaTraducao] = useState(true);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setTraduzir(true);
  };

  const traduzirTexto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/traduzir', {
        texto_original,
        lingua_origem,
        lingua_destino,
      });
      setTraduzir(true);
      setTexto_traduzido(response.data.texto_traduzido);
    } catch (error) {
      console.log(error);
    }
  };

  const editarTraducao = async (id, texto_original, texto_traduzido) => {
    try {
      const response = await axios.put(`/editar/${id}/${texto_original}/${texto_traduzido}`, {
        texto_original,
        texto_traduzido
      });
      console.log(response.data);
      setEditarTraducao(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deletarTraducao = async (id) => {
    try {
      const response = await axios.delete(`/deletar/${id}`);
      console.log(response.data);
      setDeletaTraducao(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getTraducoes = async () => {
    try {
      const response = await axios.get('/traducoes');
      setTraducoes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const salvarTraducao = async (id) => {
    try {
      const response = await axios.put(`/editar/${id}`, {
        texto_original,
        texto_traduzido
      });
      console.log(response.data);
      setEditarTraducao(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTraducoes();
  }, [traduzir, editaTraducao, deletaTraducao]);

  return (
    <>
      <div className="ui container">
        <h1>Tradutor</h1>
        <form className="ui form" onSubmit={traduzirTexto}>
          <div className="field">
            <label>Texto Original</label>
            <input
              type="text"
              name="texto_original"
              value={texto_original}
              onChange={(e) => setTextOrinal(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Língua de Origem</label>
            <input
              type="text"
              name="lingua_origem"
              value={lingua_origem}
              onChange={(e) => setLingua_origem(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Língua de Destino</label>
            <input
              type="text"
              name="lingua_destino"
              value={lingua_destino}
              onChange={(e) => setLingua_destino(e.target.value)}
            />
          </div>
          <button className="ui button" type="submit">
            Traduzir
          </button>
        </form>
        {traduzir && (
          <div className="ui segment">
            <h4 className="ui header">Texto Traduzido</h4>
            <form className="ui form" onSubmit={salvarTraducao}>
              <div className="field">
                <div className="ui column">
                  <textarea
                    rows="2"
                    value={texto_traduzido}
                    onChange={(e) => setTexto_traduzido(e.target.value)}
                  />
                </div>
              </div>
              <button className="ui button" type="submit">
                Salvar Tradução
              </button>
            </form>
          </div>
        )}
        <h2>Traduções</h2>
        <form className="ui form">
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Texto Original</th>
                <th>Texto Traduzido</th>
                <th>Língua de Origem</th>
                <th>Língua de Destino</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {traducoes.map((traducao) => (
                <tr key={traducao.id}>
                  <td>
                    <input
                      type="text"
                      value={traducao.texto_original}
                      onChange={(e) => setTextOrinal(e.target.value)}
                      name="texto_original"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={traducao.texto_traduzido}
                      onChange={(e) => setTexto_traduzido(e.target.value)}
                      name="texto_traduzido"
                    />
                  </td>
                  <td>{traducao.lingua_origem}</td>
                  <td>{traducao.lingua_destino}</td>
                  <td>
                    <button
                      className="ui button"
                      onClick={() => editarTraducao(traducao.id)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="ui button"
                      onClick={() => deletarTraducao(traducao.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default App;