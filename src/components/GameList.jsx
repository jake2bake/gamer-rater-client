import { useEffect } from "react"
import "./GameList.css" // Make sure to import your new CSS
import { Link, useNavigate } from "react-router-dom"

export const GameList = ({ games, fetchGames, showAll }) => {
    const navigate = useNavigate()
    useEffect(() => {
        fetchGames(showAll)
    }, [showAll])
    
    const displayGames = () => {
        if (games && games.length) {
            return games.map(game => (
                
                <div key={`key-${game.id}`} className="gamelist-item">
                    <div className="gamelist-description">
                        <Link to={`/games/${game.id}`} className="gamelist-link">
                        {game.title} </Link>
                        {" "} ({game.description})
                    </div>
                    <div className="gamelist-designer">
                        Designed by {game.designer}
                    </div>
                    <div>Added by {game.user?.email || "Unknown"}</div>
                    {
                        showAll
                            ? ""
                            : <button
                                onClick={async () => {
                                    const response = await fetch(`http://localhost:8000/games/${game.id}`, {
                                        method: "DELETE",
                                        headers: {
                                            Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                                        }
                                    })

                                    if (response.status === 204) {
                                        fetchGames(showAll)
                                    }
                                }}
                                className="gamelist-delete-btn"
                            >
                                Delete
                            </button>
                    }
                </div>
            ))
        }

        return <h3>Loading Games...</h3>
    }

    return ( <>
        <button className="btn-primary" onClick={() => navigate("/addgame")}>Register New Game</button> 
        <div className="gamelist-container">
            <h1 className="gamelist-title">Games List</h1>
            {displayGames()}
        </div>
        </>
    )
}