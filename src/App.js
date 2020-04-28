import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [title, setTitle] = useState('');
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    };
    loadRepositories();
  }, [])

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleAddRepository()
    }
  }

  async function handleAddRepository() {
    const repository = { title };
    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data]);
    setTitle('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const result = repositories.filter(repo => repo.id !== id);
    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <input
        type='text'
        placeholder="Your project title..."
        value={title}
        onKeyPress={handleKeyPress}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
