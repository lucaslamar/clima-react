import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Title, Form, Error, Clima } from './styles';

const Dashboard = () => {
  const [newClima, setNewclima] = useState('');
  const [inputError, setInputError] = useState('');
  const [climas, setClimas] = useState(() => {
    const storageClimas = localStorage.getItem(
      '@GithubExplorer:climas',
    );

    if (storageClimas) {
      return JSON.parse(storageClimas);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:climas',
      JSON.stringify(climas),
    );
  }, [climas]);

  async function handleAddClima(e)  {
    e.preventDefault();

    if (!newClima) {
      setInputError('Digite o nome do local');
      return;
    }

    try {
      const response = await api.get(`/data/2.5/weather`, {
        params: {
            q: newClima,
            appid: process.env.REACT_APP_API_KEY,
        },
    });
    
    const clima = response;
    console.log('response', response);
    
    setClimas([...climas, clima]);
    setNewclima('');
    setInputError('');
  } catch (err) {
    setInputError('Erro na busca por esse local');
  }
}


  return (
    <>
      <img src={process.env.REACT_APP_LOGO_URL} alt=" Clima Explorer" />
      <Title>Descubra o clima de um local</Title>

      <Form hasError={!!inputError} onSubmit={handleAddClima}>
        <input
          value={newClima}
          onChange={e => setNewclima(e.target.value)}
          placeholder="Digite o nome da Cidade"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Clima>
        {climas.map(clima => (
          <Link
            key={clima.data.code}
            to={`/#`}
          >
            <img
              src={process.env.REACT_APP_LOGO_URL}
              alt="foto padrão"
            />
            <div>
              <strong>{clima.data.name}</strong>
              <p> Temperatura: {clima.data.main.temp}ºF</p>
              <p> Temperatura Maxima: {clima.data.main.temp_max}ºF</p>
              <p> Temperatura Minima: {clima.data.main.temp_min}ºF</p>
              <p> Humidade: {clima.data.main.humidity}%</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Clima>
    </>
  );
};

export default Dashboard;
