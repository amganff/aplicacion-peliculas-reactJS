import { useState } from 'react'
import './movieApp.css'


export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState(null)

    const URLbase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'INSERT_API_KEY'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()


    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${URLbase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await response.json()
            console.log(data)
            setMovieList(data.results)
            console.log(data.results)
        } catch (error) {
            console.error('Ocurrio un error: ', error)
        }
    }


    return (
        <div className='container'>
            <h1 className='title'>Buscador de Peliculas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Ingresa una Pelicula'
                    value={search}
                    onChange={handleInputChange}

                />
                <button className='search-button'>Buscar</button>
            </form>

            {movieList &&
                <div className='movie-list'>
                    {/* api devuelve lista de peliculas */}
                    {movieList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>

                        </div>
                    ))}
                </div>
            }

        </div>
    )
}
