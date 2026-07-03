import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./ReviewForm.css"

export const ReviewForm = () => {
    const navigate = useNavigate()
    const {gameId } = useParams()
    const [newReview, setNewReview] = useState({
        gameId: parseInt(gameId),
        comment: "",
        rating: 0
        
    })

    const handleChange = (event) => {
        const {name, value} = event.target 
        setNewReview((prev) => ({
            ...prev,
            [name]: name === "rating" ? parseInt(value) : value
        }))
    }

    const handleSave = async (event) => {
        event.preventDefault()

        const tokenObj = JSON.parse(localStorage.getItem("rater_token"))
        const token = tokenObj?.token

        if (!token) {
            alert("You must be logged in.")
            return
        }

        const reviewToSave = {
            
            gameId: parseInt(gameId),
            comment: newReview.comment,
            rating: parseInt(newReview.rating)
        }

        try {
            const response = await fetch("http://localhost:8000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(reviewToSave)
            })
            if (response.ok) {
                navigate(`/games/${gameId}`)
            } else {
                const err = await response.json()
                alert("Error: " + (err.error || "Could not submit review."))
            }
            } catch (err) {
                console.error("Network error:", err)
                alert("Network error")
            }
        }

    return (
        <main className="container-form">
            <section>
                <form className="review-form-container" onSubmit={() => {handleSave}}>
                    <h1>Add a Review</h1>
                    <label>Comment</label>
                    <textarea
                        name="comment"
                        value={newReview.comment}
                        onChange={handleChange}
                        required
                        rows="4"
                        cols="50"
                    /><br />

                    <label>Rating (1-10):</label><br />
                    <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        min="1"
                        max="10"
                        onChange={handleChange}
                        required
                    /><br />
                </form>
            </section>
            <div className="form-group">
                <button className="btn-primary" onClick={handleSave}>Save Review</button>
            </div>
        </main>
    )
}