const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/movies`;

async function index() {
    try {
        const response = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err, " <- err in index movieService");
    }
}

async function show(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/${movieId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        const data = await response.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log(error, "<- problem in movieService")
    }
}
async function createReview(movieId, reviewFormData) {
    try {
        const response = await fetch (`${BASE_URL}/${movieId}/reviews`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`, 
        "Content-Type": "application/json"},
    body: JSON.stringify(reviewFormData),
    })
    const data = await response.json()
    return data
    } catch (error) {
        console.log(error, "<- problem in movieService")
    }
}

async function updateReview(movieId, reviewId, reviewFormData){
    try {
        const response = await fetch(`${BASE_URL}/${movieId}/reviews/${reviewId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"},
        body: JSON.stringify(reviewFormData),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error, '<-problem in movieService')
    }
}

async function deleteReview(movieId, reviewId) {
    try {
        const response = await fetch(`${BASE_URL}/${movieId}/reviews/${reviewId}`,{
            method: "DELETE",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    })
    const data = await response.json()
    return data
    } catch (error) {
        console.log(error, '<- error in movieService')
    }
}
export { index, show, createReview, updateReview, deleteReview }