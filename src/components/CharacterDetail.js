import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./detail.css"
function CharacterDetail() {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState(null);

  useEffect(() => {
    fetchCharacterDetail();
  }, [id]);
  const fetchCharacterDetail = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setCharacterDetail(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          <img className="mainImg" src={characterDetail?.image} alt="ds" />
          <div className="allText aboveText">
            <p className="text-blk headingText">
              {characterDetail?.name}
            </p>
            <div><span className='sub-title'>Gender</span> : <span className='sub-title-value'>{characterDetail?.gender}</span></div>
            <div><span className='sub-title'>status</span> : <span className='sub-title-value'>{characterDetail?.status}</span></div>
            <div><span className='sub-title'>species</span> : <span className='sub-title-value'>{characterDetail?.species}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;