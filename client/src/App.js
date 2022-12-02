import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';

function App() {
  const [texto_traduzido, setTextTraduzido] = useState('');
  const [texto_original, setTextOriginal] = useState('');
  const [traducoes, setTraducoes] = useState([]);

  const fetchTraducoes = async () => {
    const response = await axios.get(`${baseUrl}/traducoes`);
    setTraducoes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/traducao`, {
        texto_original, texto_traduzido
      });
      setTextTraduzido(...traducoes, response.data);
      fetchTraducoes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (texto) => {
    try {
      await axios.delete(`${baseUrl}/traducao/${texto}`);
      fetchTraducoes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTraducoes();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Texto Original:
            <input
              type="text"
              name="texto_original"
              value={texto_original}
              onChange={e => setTextOriginal(e.target.value)}
            />
          </label>
          <label>
            Texto Traduzido:
            <input
              type="text"
              name="texto_traduzido"
              value={texto_traduzido}
              onChange={e => setTextTraduzido(e.target.value)}
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <h2>Traduções</h2>
        <ul>
          {traducoes.map(traducao => (
            <div key={traducao.id}>
              <h2>{traducao.texto_original}</h2>
              <h2>{traducao.texto_traduzido}</h2>
              <button onClick={() => handleDelete(traducao.texto_original)}>Deletar</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
