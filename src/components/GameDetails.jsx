import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById } from "../services/gameservice"
import "./GameDetails.css"


export const GameDetails = ( {reviews, fetchReviews}) => {
    const [oneGame, setOneGame] = useState({})
    
    const { gameId } = useParams()
    const navigate = useNavigate()

    const storedUser = JSON.parse(localStorage.getItem("rater_token"))
    const currentUserId = storedUser?.id

    
    

    useEffect(() => {
        getGameById(gameId).then(setOneGame)
        fetchReviews() 
    }, [gameId])

    const gameReviews = reviews.filter((review) => parseInt(review.gameId) === parseInt(gameId))

    return (<>
        <div className="game">
            <h2>{oneGame?.title}</h2>
            <p><strong>Designer: </strong> {oneGame?.designer}</p>
            <p><strong>Description: </strong> {oneGame?.description}</p>
            <p><strong>Number of Players: </strong>{oneGame?.playerCount}</p>
            <p><strong>Total Time in Minutes: </strong>{oneGame?.totalTime}</p>
            <p><strong>Age Requirement: </strong>{oneGame?.ageRequired}</p>
            <p><strong>Rating: </strong>{oneGame?.avgRating}</p>
        </div>
        {oneGame.userId === currentUserId && (
            <button
                className="btn-primary"
                onClick={() => navigate(`/games/${gameId}/edit`)}
            >
                Edit Game
            </button>
        )}
        <div>
            <button className="btn-primary" 
            onClick={() => navigate(`/games/${gameId}/review`)}>
                Write a Review
            </button>
        </div>
        <div className="review-list">
            <h3>Reviews</h3>
            {gameReviews.length > 0 ? (
                gameReviews.map((review) => (
                    <div key={review.id}>
                        <p><strong>Rating: </strong> {review.rating}</p>
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    </>
    )
   
}