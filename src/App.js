import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setrepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'VueJs',
      url: 'https://github.com/algaworks/curso-angular-rest-spring-boot-api/tree/master/7.2%20Profiles%20do%20Spring/algamoney-api/src/main/resources/db/migration',
      techs: ['VueJS', 'javascript'],
      like: 0
    });

    const repository = response.data;
    setrepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const repositoryId = id;
    console.log(repositoryId)
    const response = await api.delete(`repositories/${repositoryId}`,);

    setrepositories(repositories.filter(repository => repository.id !== repositoryId));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}> <strong>{repository.title} </strong> <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button> </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
