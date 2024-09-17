async function buscarPokemon() {
    const nomPokemon = document.getElementById("nombrePokemon").value.toLowerCase();
    const infoPokemon = document.getElementById("infoPokemon");
  
    if (!nomPokemon) {
      infoPokemon.innerHTML = "<p>Por favor, ingrese un nombre o ID de Pokemon.</p>";
      return;
    }
  
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomPokemon}`);
      if (!respuesta.ok) {
        throw new Error("Pokémon no encontrado");
      }
  
      const data = await respuesta.json();
  
      infoPokemon.innerHTML = `
        <h2>${data.name.toUpperCase()} (#${data.id})</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Habilidad 1:</strong> ${data.abilities[0].ability.name}</p>
        <p><strong>Tipos:</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
      `;
    } catch (error) {
      infoPokemon.innerHTML = "<p>No se pudo encontrar el Pokémon.</p>";
    }
  }
  