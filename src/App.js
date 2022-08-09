import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState({});

  const fetchPokemon = useCallback((index) => {
    axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${index}`,
      responseType: "json",
    }).then(function (response) {
      console.log(response.data);
      setPokemon((prev) => {
        let temp = { ...prev };
        temp[response.data.id] = {
          id: response.data.id,
          name: response.data.name,
          img: response.data.sprites.front_default,
        };
        return temp;
      });
    });
  }, []);

  useEffect(() => {
    for (let index = 1; index < 151; index++) {
      fetchPokemon(index);
    }
  }, [fetchPokemon]);

  function makePokemon() {
    let items = [];
    for (const id in pokemon) {
      const element = pokemon[id];
      items.push(
        <div key={id} className="pokemon">
          <h2 style={{ textTransform: "capitalize" }}>{element.name}</h2>
          <img src={element.img} alt={element.name} />
        </div>
      );
    }
    return items;
  }

  return (
    <div>
      <h1>Gen 1 Pokemon</h1>
      <div className="container">{makePokemon()}</div>
    </div>
  );
}

export default App;
