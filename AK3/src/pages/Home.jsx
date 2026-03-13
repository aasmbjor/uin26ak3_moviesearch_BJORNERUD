import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [mov, setMov] = useState([])
    const [search, setSearch] = useState("James Bond")

    const baseUrl = `http://www.omdbapi.com/?s=${search}&type=movie&apikey=`
    const apiKey = import.meta.env.VITE_APP_API_KEY

    const getMovies = async()=>{
        // Fikk hjelp av Audun for å bruke denne til å tømme listen med filmer, da jeg hadde en film som hang igjen etter at jeg gjorde et nytt søk
        setMov([])
        try{
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            setMov(data.Search)
        }catch(err){
            console.error(err)
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        getMovies()
    }

    // Fikk hjelp av Ole Bovolden til å lage denne useEffecten
    useEffect(()=>{
        if (search) {
        getMovies()
        }
    }, [])
    

    return (
    <main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
                <input 
                minLength={3} type="search" placeholder="James Bond" onChange={handleChange}></input>
            </label>
            <button onClick={getMovies}>Søk</button>
        </form>
        <section>
            {mov?.map((mov) => (
            <Link key={mov.imdbID} to={`/${mov.Title}`}>
                    <MovieCard mov={mov} />
                </Link>
            ))}
        </section>
    </main>
    )
}