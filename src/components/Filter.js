import React from 'react';

function Filter({ onFilterChange }) {
  const handleInputChange = event => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <input type="text" name="name" placeholder="Search by Name" onChange={handleInputChange} />
      <select className="select" name="status" onChange={handleInputChange}>
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select className="select" name="gender" onChange={handleInputChange}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="female">Female</option>
        <option value="Unknown">Unknown</option>
      </select>
    </div>
  );
}

export default Filter;