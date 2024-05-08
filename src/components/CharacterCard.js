import React from 'react';
import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
  return (
    <div>
      <Link to={`/character/${character.id}`}>
        <h2>{character.name}</h2>
      </Link>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}

export default CharacterCard;