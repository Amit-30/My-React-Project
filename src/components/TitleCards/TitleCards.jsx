import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import api from '../../ApiToken/ApiToken'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])
  const cardRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${api.apiToken}`
    }
  };
  
  const handleWheel = (e) => {
    e.preventDefault();
    cardRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
   <div className='title-cards'>
    <h2>{title ? title : "Popular on Netflix"}</h2>
    
    <div className='card-list' ref={cardRef}>
      {apiData.map((card) => (
        <Link to={`/player/${card.id}`} className="card" key={card.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="img" />
          <p>{card.original_title}</p>
        </Link>
      ))}
    </div>
   </div>
  )
}

export default TitleCards