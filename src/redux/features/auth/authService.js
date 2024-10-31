import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    });
    console.log("Register API response:", response.data); // Log de la réponse API
    return response.data;
};

// Login user
const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + "login", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true, // Ajouté pour gérer les cookies
        });
        console.log("Login API response:", response.data); // Log de la réponse API
        console.log("Token from response:", response.data.token); // Log du token reçu

        // Ici, vous pouvez stocker le token dans localStorage ou dans un autre stockage selon vos besoins
        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Stocke le token dans localStorage
        }

        return response.data; // Retourne l'objet utilisateur et le token
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Logout user
const logout = async () => {
    const response = await axios.get(API_URL + "logout", { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Logout API response:", response.data); // Log de la réponse API
    return response.data.message;
};

// GET login status
const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus", { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Login status response:", response.data); // Log de la réponse API
    return response.data;
};

// GET User
const getUser = async () => {
    const response = await axios.get(API_URL + "getUser", { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Get user response:", response.data); // Log de la réponse API
    return response.data;
};

// Update user
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData, { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Update user response:", response.data); // Log de la réponse API
    return response.data;
};

// Add to wishlist
const addToWishlist = async (productData) => {
    const response = await axios.post(API_URL + "addToWishlist", productData, {
        withCredentials: true,
    });
    console.log("Add to wishlist response:", response.data); // Log de la réponse API
    return response.data.message;
};

// Get Wishlist
const getWishlist = async () => {
    const response = await axios.get(API_URL + "getWishlist", { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Get wishlist response:", response.data); // Log de la réponse API
    return response.data;
};

// Remove from Wishlist
const removeFromWishlist = async (productId) => {
    const response = await axios.put(API_URL + `wishlist/${productId}`, {}, { withCredentials: true }); // Ajouté pour gérer les cookies
    console.log("Remove from wishlist response:", response.data); // Log de la réponse API
    return response.data.message;
};

const authService = {
    register,
    login,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    addToWishlist,
    getWishlist,
    removeFromWishlist
};

export default authService;
