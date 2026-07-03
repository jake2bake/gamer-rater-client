export const getGameById = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
 // 👈 double-check this
    },
  }).then(res => res.json())
}

export const getGameCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rater_token"
            )).token}`,
        },
    }).then(res => res.json())

}

