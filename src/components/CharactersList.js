import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import Filter from './Filter';
import { getCharacters } from '../api'; // Function to fetch characters from API
import "./style.css"
const API_URL = 'https://rickandmortyapi.com/api/character';
function CharactersList() {
    const [characters, setCharacters] = useState([]);
    const [charactersInfo, setCharactersInfo] = useState({
        count: null,
        pages: null,
        next: "",
        start: 1,
        end: 20
    });
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [filters, setFilters] = useState({ name: '', status: '', gender: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const urlParams = new URLSearchParams(data.info.next);
            console.log("check", urlParams, data.info.next, urlParams.get('page'), +urlParams.get('page') - 1)
            let tempInfo = {
                count: data.info.count,
                pages: data.info.pages,
                next: data.info.next,
                currentPage: data.info.next.split("=")[1] - 1,
                start: 1,
                end: 20,
            }
            setCharactersInfo(tempInfo);
            setCharacters(data.results);
            setFilteredCharacters(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const filtered = characters.filter(character => {
            return (
                character.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                (filters.status ? character.status === filters.status : true) &&
                (filters.gender ? character.gender === filters.gender : true)
            );
        });
        setFilteredCharacters(filtered);
    }, [filters, characters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
    };

    return (
        <div>
            <div className="content">
                <Filter onFilterChange={handleFilterChange} />
                <section className="table-header grid">
                    <div>
                        <div className="select">
                            <select>
                                <option>Choose action</option>
                                <option>Choose action</option>
                                <option>Choose action</option>
                                <option>Choose action</option>
                            </select>
                        </div>
                    </div>
                </section>
                <div className="card">
                    <table>
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Status</th>
                                <th>Species</th>
                                <th>Gender</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCharacters.map((item, index) => {
                                return <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>{item.species}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.created}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <section className="table-footer grid">
                    <span>Displaying {charactersInfo.start}-{charactersInfo.end} of {charactersInfo?.count} items</span>
                    <div className="paging grid">
                        <span>
                            Page
                            <input type="number" value={charactersInfo.currentPage} />
                            of {charactersInfo?.pages}
                        </span>
                        <div className="button icon">
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        <div className="button icon">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </section>
            </div>
            {console.log("check", filteredCharacters)}
            {/* <Filter onFilterChange={handleFilterChange} />
            {console.log("check", filteredCharacters)}
            {filteredCharacters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))} */}
        </div>
    );
}

export default CharactersList;