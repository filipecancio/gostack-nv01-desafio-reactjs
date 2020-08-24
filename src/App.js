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
  }

  useEffect(() => {
    (async () => {
      api.get('repositories').then(response => {
        setData(response.data);
      })
    })();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {data ? data.map(project =>(
          <>
            <li>
              <h2>{project.title}</h2>

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
            </li>
          </>
        )):(<></>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
