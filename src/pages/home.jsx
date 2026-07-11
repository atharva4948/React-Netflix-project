import MovieCard from "../components/MovieCard";
import {useState , useEffect } from "react"
import {searchMovies , getpopularmovies } from "../api/movieApi"
import "../CSS/Home.css"

function Home(){

    const[ searchQuery , setSearchQuery] = useState("")

    const [movies , setMovies] = useState([]); 
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);          

    useEffect(() => {
        const loadPopularMovies = async () => {
          try{
            const popularMovies = await getpopularmovies()
            setMovies(popularMovies)
        } catch (error) {
            console.log(error)
            setError("Error fetching popular movies:", error)
        }
        finally {
            setLoading(false)
        }
    }

       
         loadPopularMovies();

    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery) 
            setError(null)        

        }catch(error){
            consol.log(error)
            setError("Error searching movies:", error)

        }finally{
            setLoading(false)
        }
        setSearchQuery("----------")
    
    }
return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            ...
        </form>

        {
            loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : movies.length === 0 ? (
                <div className="no-movies">No movies found</div>
            ) : (
                <div className="movie-grid">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )
        }
    </div>
);


 

}

export default Home