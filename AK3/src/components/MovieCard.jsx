export default function MovieCard({mov}){
    const {Title, Poster, Year} = mov

    return(
        <article className="flexCard">
            <img src={Poster} alt={Title} />
            <h3>{Title}</h3>
            <p>{Year}</p>
        </article>
    )
}