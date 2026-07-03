import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById } from "../services/gameservice"


export const UpdateGame = () => {
    const {gameId} = useParams()
    const [thisGame, setThisGame] = useState({})
    const navigate = useNavigate()
    const storedUser = JSON.parse(localStorage.getItem("rater_token"))
    const token = storedUser.token
    const currentUserId = storedUser.id

    useEffect(() => {
        getGameById(gameId)
        .then((data) => {
            console.log("Fetched game data:", data)
            if ( data.userId != currentUserId) {
                alert("You are not allowed to edit this game.")
                navigate(`/games/${gameId}`)
            } else {
                setThisGame(data)
            }
        })
    }, [gameId])

    const handleChange = (e) => {
        const gameCopy = { ...thisGame}
        gameCopy[e.target.name] = e.target.value 
        setThisGame(gameCopy)
    }

    const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await fetch(`http://localhost:8000/games/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(thisGame)
  })

  if (response.ok) {
    const updatedGame = await response.json()
    setThisGame(updatedGame) // Refresh local state with latest data
    navigate(`/games/${gameId}`)
  } else {
    // handle error
    alert("Failed to update the game.")
  }
}

    return (
        <form className="game-form" onSubmit={handleSubmit}>
      <h2>Edit Game</h2>

      <input name="title" placeholder="Title" value={thisGame.title || ""} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={thisGame.description || ""} onChange={handleChange} required />
      <input name="designer" placeholder="Designer" value={thisGame.designer || ""} onChange={handleChange} required />
      <input name="yearReleased" placeholder="Year Released" value={thisGame.yearReleased || ""} onChange={handleChange} />
      <input name="playerCount" placeholder="Number of Players" type="number" value={thisGame.playerCount || ""} onChange={handleChange} />
      <input name="totalTime" placeholder="Estimated Time (minutes)" type="number" value={thisGame.totalTime || ""} onChange={handleChange} />
      <input name="ageRequired" placeholder="Age Recommendation" type="number" value={thisGame.ageRequired || ""} onChange={handleChange} />

      <button type="submit">Save Changes</button>
    </form>
    )

}