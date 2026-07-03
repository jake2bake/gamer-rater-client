import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGameCategories } from "../services/gameservice"

export const GameForm = ({ fetchGames }) => {
    const initialGamestate = {
        title: "",
        description: "",
        playerCount: 0,
        totalTime: 0,
        ageRequired: 0,
        avgRating: 0
       
    }

    const [gameCategories, setGameCategories] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
    const [game, updateGameProps] = useState(initialGamestate)
    const navigate = useNavigate()

    useEffect(() => {
        getGameCategories().then(setGameCategories
        )
    }, [])

    const handleSave = async (event) => {
    event.preventDefault()

    // Step 1: Post the new game
    const response = await fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })

    if (response.ok) {
        const newGame = await response.json()

        // Step 2: Now post the GameCategory
        if (selectedCategoryId !== 0) {
            await fetch("http://localhost:8000/gamecategories", {
                method: "POST",
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    game: newGame.id,
                    category: selectedCategoryId
                })
            })
        }

        await fetchGames()
        navigate("/allgames")
    } else {
        console.error("Game creation failed.")
    }
}


    return (
        <form onSubmit={handleSave}>
            <h2>Add A New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title of game"
                        onChange={(event) => {
                            const gameCopy = { ...game }
                            gameCopy.title = event.target.value
                            updateGameProps(gameCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description of Game"
                        onChange={(event) => {
                            const gameCopy = { ...game }
                            gameCopy.description = event.target.value
                            updateGameProps(gameCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Total Time</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Number in Minutes"
                        onChange={(event) => {
                            const gameCopy = { ...game }
                            gameCopy.totalTime = event.target.value
                            updateGameProps(gameCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Designer</label>
                    <input
                        type="text"
                        placeholder="Designer Name"
                        className="form-control"
                        onChange={(event) => {
                            const gameCopy = { ...game}
                            gameCopy.designer = event.target.value
                            updateGameProps(gameCopy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        className="form-control"
                        value={selectedCategoryId}
                        onChange={(event) => 
                            setSelectedCategoryId(parseInt(event.target.value))}
                    >
                        <option value="0">Select a Category</option>
                        {gameCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Player Count</label>
                    <input
                        type="number"
                        placeholder="Number of Players"
                        className="form-control"
                        onChange={(event) => {
                            const gameCopy = { ...game}
                            gameCopy.playerCount = event.target.value
                            updateGameProps(gameCopy)
                        }}
                    />

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Age Recommendation</label>
                    <input 
                        type="number"
                        placeholder="Recommended age"
                        className="form-control"
                        onChange={(event) => {
                            const gameCopy = { ...game}
                            gameCopy.ageRequired = event.target.value
                            updateGameProps(gameCopy)
                        }}
                     />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                        Save Game
                    </button>
                </div>
            </fieldset>
        </form>
    )
}
