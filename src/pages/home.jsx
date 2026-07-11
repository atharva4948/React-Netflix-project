import MovieCard from "../components/MovieCard";
import {useState , useEffect } from "react"
import {searchMovies , getpopularmovies } from "../services/Api"
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
            setError("Error fetching popular movies:")
        }
        finally {
            setLoading(false)
        }
    }

       
         loadPopularMovies();

    }, []);

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery) 
            setError(null)        
            setMovies(searchResults)
        }catch(error){
            console.log(error)
            setError("Error searching movies:")

        }finally{
            setLoading(false)
        }
        setSearchQuery("")
    
    }
return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
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