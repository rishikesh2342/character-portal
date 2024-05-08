import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getCharacterById } from '../api'; // Function to fetch character by ID from API

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // async function fetchCharacter() {
    //   const characterData = await getCharacterById(id);
    //   setCharacter(characterData);
    // }
    // fetchCharacter();
  }, [id]);

  return (
    <div>
      {character && (
        <div>
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Gender: {character.gender}</p>
          <p>Species: {character.species}</p>
          <img src={character.image} alt={character.name} />
        </div>
      )}
    </div>
  );
}

export default CharacterDetail;