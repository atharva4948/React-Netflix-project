

const Api_key = "bf188cfef411441594e7e56bbd98bead";
const Base_url = "https://www.themoviedb.org/3"


export const getpopularmovies = async () => {


    const response = await fetch('${Base_url}/movie/popular?api_key=${Api_key}')
    const data = await response.json()
    return data.results

};



export const searchmovies = async (query) => {


    const response = await fetch('${Base_url}/search/movie?api_key=${Api_key}&query=${encodeURIComponent(query)}')
    const data = await response.json()
    return data.results
    
};