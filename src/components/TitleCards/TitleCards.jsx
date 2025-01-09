import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useState } from 'react'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {

 const [apiData, setApiData] = useState([]);
 const cardsRef = useRef();

 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTVmMjJkZDk5NTRmYzFhNDEyOWIwZjA1MGFiNTE5YyIsIm5iZiI6MTczNjA2NTAyNC44NjcsInN1YiI6IjY3N2E0MDAwMjVlMGU5MWM1Nzc0ZTBkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uXK1Pd76qqKJ2Y_W2qMMjIJ0ZjJZENYttox0qIIFGH4'
  }
};



 const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

 cardsRef.current.addEventListener('wheel', handleWheel);
},[]) 

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
