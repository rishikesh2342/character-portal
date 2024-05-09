import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import CharacterCard from './CharacterCard';
import Filter from './Filter';
import LeftArrowIcon from "./icons/left-arrow.svg"
import RightArrowIcon from "./icons/right-arrow.svg"
import "./style.css"
const API_URL = 'https://rickandmortyapi.com/api/character';
function CharactersList() {
    const [apiUrl, setApiUrl] = useState(API_URL);
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
        fetchData(apiUrl);
    }, []);

    const fetchData = async (val) => {
        try {
            const response = await fetch(val);
            const data = await response.json();
            const urlParams = new URLSearchParams(data.info.next);
            let tempInfo = {
                count: data.info.count,
                pages: data.info.pages,
                next: data.info.next,
                currentPage: parseInt(data.info.next.split("=")[1] - 1),
                start: parseInt(data.info.next.split("=")[1] - 1) === 1 ? 1 : ((parseInt(data.info.next.split("=")[1] - 1) - 1) * 20) + 1,
                end: parseInt(data.info.next.split("=")[1] - 1) * 20,
            }
            setApiUrl(data.info.next)
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
    const nextpage = () => {
        let pageSize = charactersInfo.currentPage + 1
        let url = `https://rickandmortyapi.com/api/character/?page=${pageSize}`
        setApiUrl(url)
        fetchData(url)
    }
    const prevpage = () => {
        let pageSize = charactersInfo.currentPage - 1
        let url = `https://rickandmortyapi.com/api/character/?page=${pageSize}`
        setApiUrl(url)
        fetchData(url)
    }
    return (
        <div>
            <div className="content">
                <section className="table-header grid">
                    <Filter onFilterChange={handleFilterChange} />
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
                                    <td>{moment(item.created).format('MM/DD/YYYY')}</td>
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
                            <img src={LeftArrowIcon} onClick={prevpage} alt="left" />
                        </div>
                        <div className="button icon">
                            <img src={RightArrowIcon} onClick={nextpage} alt="right" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CharactersList;