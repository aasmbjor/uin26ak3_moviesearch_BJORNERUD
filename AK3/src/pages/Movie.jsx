import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Movie(){
    const { movie } = useParams() 
    const [ movieInfo, setMovieInfo ] = useState()

    useEffect(() => {
        const getMovie = async () => {
            try {
                const apiKey = import.meta.env.VITE_APP_API_KEY
                const response = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
                const data = await response.json()
                setMovieInfo(data)
            } catch (err) {
                console.error(err)
            }
        }
        getMovie()
    }, [movie])

    if (!movieInfo) return <p>Loading</p>

    return (
        <section className="layout">
                <img src={movieInfo.Poster} alt={movieInfo.Title} />
            <article className="movieInfo">
                <h1>{movieInfo.Title}</h1>
                <p><strong>Year: </strong>{movieInfo.Year}</p>
                <p><strong>Genre: </strong>{movieInfo.Genre}</p>
                <p><strong>Director: </strong>{movieInfo.Director}</p>
                <p><strong>Actors: </strong>{movieInfo.Actors}</p>
                <p><strong>Plot: </strong>{movieInfo.Plot}</p>
            </article>
        </section>
    )
}