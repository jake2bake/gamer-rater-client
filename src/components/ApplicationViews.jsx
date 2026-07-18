import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { GameList } from "./GameList.jsx"
import { GameDetails } from './GameDetails.jsx'
import { GameForm } from './GameForm.jsx'
import { ReviewForm } from './ReviewForm.jsx'
import { UpdateGame } from './UpdateGame.jsx'


export const ApplicationViews = () => {
    const [gamesState, setGamesState] = useState([])
    const [reviewState, setReviewState] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("rater_user"))
    
    
    const fetchReviewsFromAPI = async () => {
        let url = "http://localhost:8000/reviews"
        const response = await fetch(url,
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                }
            })
            const reviews = await response.json()
        setReviewState(reviews)

    }
    

    const fetchGamesFromAPI = async () => {
        let url = "http://localhost:8000/games"
        

        // if (showAll !== true) {
            
        //     url = "http://localhost:8000/rocks?owner=current"
        // }
        const response = await fetch(url,
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                }
            })
            const games = await response.json()
           
        setGamesState(games)
    }
useEffect(() => {
    fetchGamesFromAPI()
}, [])

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/allgames" element={<GameList games={gamesState} fetchGames={fetchGamesFromAPI} showAll={true} currentUser={currentUser} />} />
                <Route path="/games/:gameId" element={<GameDetails reviews ={reviewState} fetchReviews={fetchReviewsFromAPI} currentUser={currentUser} />} />
                <Route path="/addgame" element={<GameForm fetchGames={fetchGamesFromAPI} />} /> 
                <Route path="/games/:gameId/review" element={<ReviewForm />} />
                <Route path="/games/:gameId/edit" element={<UpdateGame currentUser={currentUser} />} />
                
            </Route>
        </Routes>
    </BrowserRouter>
}