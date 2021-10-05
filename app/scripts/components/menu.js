import React, {useState, useEffect} from 'react';
import Axios from 'axios';

//Functional component 
const Menu = () => {
    //State variables
    const [showingSearch,setShowingSearch] = useState('');
    const [searchTerm,setSearchTerm] = useState('');
    const [results,setResults] = useState([]);
    
    //Effect for fetching data on state change (search term). Uses debouncing (500ms) to reduce the number of calls to the node server.
    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
            if(searchTerm != ''){
                Axios.get('http://localhost:3035',{
                    params:{
                        search:searchTerm,
                    }
                }).then(res=> setResults(res.data));
            }else{
                setResults([]);
            }
        },500);
        return () => {
            clearTimeout(timeoutId);
        }
    },[searchTerm]);

    //Shows/Hides the Search container
    const showSearchContainer = (e) => {
        e.preventDefault();
        setShowingSearch(!showingSearch)
    }

    //Formats the results retreived from the server
    const renderedResults = results.map(result=>{
        return(
            <div key={result._id} className="result-item">
                <img src={`http://localhost:3030${result.picture}`} alt={result.name}/>
                <span className="result-item-title">{result.name}</span>
                <span className="result-item-price">{result.price}</span>
                <span className="result-item-description">{result.about}</span>
            </div>
        )
    })

    //Renders the Header
    return (
        <header className="menu">
            <div className="menu-container">
                <div className="menu-holder">
                    <h1>ELC</h1>
                    <nav>
                        <a href="#" className="nav-item">HOLIDAY</a>
                        <a href="#" className="nav-item">WHAT'S NEW</a>
                        <a href="#" className="nav-item">PRODUCTS</a>
                        <a href="#" className="nav-item">BESTSELLERS</a>
                        <a href="#" className="nav-item">GOODBYES</a>
                        <a href="#" className="nav-item">STORES</a>
                        <a href="#" className="nav-item">INSPIRATION</a>

                        <a href="#" onClick={(e) => showSearchContainer(e)}>
                            <i className="material-icons search">search</i>
                        </a>
                    </nav>
                </div>
            </div>
            <div className={(showingSearch ? "showing " : "") + "search-container"}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..."/>
                <a href="#" onClick={(e) => showSearchContainer(e)}>
                    <i className="material-icons close">close</i>
                </a>
                
                <div className={(results.length > 0 ? "showing " : "") + "results-container"}>
                    <div className="results-data">
                        <span>Displaying {results.length} results</span>
                    </div>
                    <div className="results-display">
                        {renderedResults}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Menu;