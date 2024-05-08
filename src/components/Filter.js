import React from 'react';

function Filter({ onFilterChange }) {
  const handleInputChange = event => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <input type="text" name="name" placeholder="Search by name" onChange={handleInputChange} />
      <select name="status" onChange={handleInputChange}>
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select name="gender" onChange={handleInputChange}>
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
  );
}

export default Filter;