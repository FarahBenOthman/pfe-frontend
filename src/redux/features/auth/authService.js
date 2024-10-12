import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user

const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData, {
        withCredentials: true,
    })
    return response.data;
} 

// Login user

const login = async (userData) => {
    //const response = await axios.post(API_URL + "login", userData)
    //return response.data;
////////////////////
    //try {
      //  const response = await axios.post( API_URL + "login", userData);
        //console.log(response.data); // Handle the response data as needed
    //} catch (error) {
      //  console.error("Error during login:", error); // Handle errors
    //}

    try {
        const response = await axios.post(API_URL + "login", JSON.stringify(userData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Status code:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
    }
}


// Logout user


const logout = async () => {
    const response = await axios.get(API_URL + "logout")
    return response.data.message;
} 


// GET login status


const getLoginStatus = async () => {
    const response = await axios.get(API_URL + "getLoginStatus")
    return response.data;
} 


// GET User


const getUser = async () => {
    const response = await axios.get(API_URL + "getUser")
    return response.data;
} 


// Update user


const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + "updateUser", userData)
    return response.data;
} 


// Update photo


//const updatePhoto = async (userData) => {
  //  const response = await axios.patch(API_URL + "updatePhoto", userData)
   // return response.data;
//} 



const authService = { register, login, logout, getLoginStatus, getUser, updateUser}

export default authService;


