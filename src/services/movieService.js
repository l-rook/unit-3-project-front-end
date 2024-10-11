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
export { index }