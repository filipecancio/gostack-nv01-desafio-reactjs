import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [data, setData] = useState();

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title:"aaaa",
      url:"aaaa",
      techs:"aaaa"
    });

    const project = response.data;
    setData([...data,project]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    const new_data = data.filter(repository => repository.id !== id);
    setData(new_data);
  }

  async function handlegetRepository() {
    api.get('repositories').then(response => {
      setData(response.data);
    })
  }

  useEffect(() => {
    (async () => handlegetRepository())();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {data ? data.map(project =>(
            <li key={project.id}>
              {project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
            </li>
        )):(<></>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
