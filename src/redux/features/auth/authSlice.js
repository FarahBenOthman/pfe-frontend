import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from "react-toastify"



const initialState = {
    isLoggedIn: false,
    user: null,
    wishlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",

}

// Register user

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
               return await authService.register(userData)
        } catch (error){
            const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
            
            //(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          //  return thunkAPI.rejectWithValue(message);

        }
    }
)


// Login user

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
      try {
             return await authService.login(userData)
      } catch (error){
          const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
          
          //(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        //  return thunkAPI.rejectWithValue(message);

      }
  }
)

// Logout user

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
      try {
             return await authService.logout()
      } catch (error){
          const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
          
          //(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        //  return thunkAPI.rejectWithValue(message);

      }
  }
)

// GET login status

export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkAPI) => {
      try {
          return await authService.getLoginStatus()
      } catch (error){
          const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
          
          ///////////(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        /////////////  return thunkAPI.rejectWithValue(message);

      }
  }
)

// getUser

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
      try {
          return await authService.getUser()
      } catch (error){
          const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
          
          ///////////(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        /////////////  return thunkAPI.rejectWithValue(message);

      }
  }
)


// updateUser

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updatePhoto

export const updatePhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userData, thunkAPI) => {
      try {
          return await authService.updatePhoto(userData)
      } catch (error){
          const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
          
          ///////////(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        /////////////  return thunkAPI.rejectWithValue(message);

      }
  }
)

// ADD TO WISHLIST
export const addToWishlist = createAsyncThunk(
  "auth/addToWishlist",
  async (productData, thunkAPI) => {
    try {
      return await authService.addToWishlist(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Wishlist
export const getWishlist = createAsyncThunk(
  "auth/getWishlist",
  async (_, thunkAPI) => {
    try {
      return await authService.getWishlist();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  "auth/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      return await authService.removeFromWishlist(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Dans authSlice.js
export const setToken = createAsyncThunk('auth/setToken', async (token) => {
  // Vous pouvez effectuer d'autres opérations ici si nécessaire
  localStorage.setItem('token', token);
  return token; // Optionnel : retournez le token
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state){
    state.isError =  false;
    state.isSuccess = false;
    state.isLoading =  false;
    state.message =  "";
    },
  },
  extraReducers: (builder) => {
     builder
     //register user
     .addCase(register.pending, (state) => {
         state.isLoading = true;
     })
     .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload
        toast.success("Registration successful")

    })
    .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload)

    })

    //login user
    .addCase(login.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(login.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isLoggedIn = true;
    state.user = action.payload;
    

    // Vérification de la présence du token
    console.log("Payload dans authSlice (login.fulfilled):", action.payload);

    if (action.payload.token) {
        localStorage.setItem("userToken", action.payload.token);
        console.log("Token enregistré :", action.payload.token);
    } else {
        console.log("Token est indéfini dans action.payload");
    }

    

})
 .addCase(login.rejected, (state, action) => {
     state.isLoading = false;
     state.isError = true;
     state.message = action.payload;
     state.user = null;
     toast.success(action.payload)

 })

     //logout user
     .addCase(logout.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(logout.fulfilled, (state, action) => {
     state.isLoading = false;
     state.isSuccess = true;
     state.isLoggedIn = false;
     state.user = null;
     toast.success(action.payload)
    // console.log(action.payload)

 })
 .addCase(logout.rejected, (state, action) => {
     state.isLoading = false;
     state.isError = true;
     state.message = action.payload;
    // state.user = null;
     toast.success(action.payload)

 })

     //GET login status
     .addCase(getLoginStatus.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(getLoginStatus.fulfilled, (state, action) => {
     state.isLoading = false;
     state.isSuccess = true;
     state.isLoggedIn = action.payload;
    /////////// state.user = null;
    ///////// toast.success(action.payload)
   //  console.log(action.payload);
      if (action.payload.message === "Invalid Signature") {
        state.isLoggedIn = false;
      }

 })
 .addCase(getLoginStatus.rejected, (state, action) => {
     state.isLoading = false;
     state.isError = true;
     state.message = action.payload;
   /////// // state.user = null;
    ////////// toast.success(action.payload)

 })


      //getUser
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
       state.isLoading = false;
       state.isSuccess = true;
       state.isLoggedIn = true;
       state.user = action.payload;
      ///////// toast.success(action.payload)
    //   console.log(action.payload);
        
  
   })
   .addCase(getUser.rejected, (state, action) => {
       state.isLoading = false;
       state.isError = true;
       state.message = action.payload;
     /////// // state.user = null;
       toast.error(action.payload)
  
   })


   
      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })


    //updatePhoto
    .addCase(updatePhoto.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(updatePhoto.fulfilled, (state, action) => {
     state.isLoading = false;
     state.isSuccess = true;
     state.isLoggedIn = true;
     state.user = action.payload;
     toast.success("User Photo Updated")
   //  console.log(action.payload);
      

 })
 .addCase(updatePhoto.rejected, (state, action) => {
     state.isLoading = false;
     state.isError = true;
     state.message = action.payload;
   /////// // state.user = null;
     toast.error(action.payload)

 })

   
    // Add to wishlist
 .addCase(addToWishlist.pending, (state) => {
  state.isLoading = true;
})
.addCase(addToWishlist.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
  console.log(action.payload);
})
.addCase(addToWishlist.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
// getWishlist
.addCase(getWishlist.pending, (state) => {
  state.isLoading = true;
})
.addCase(getWishlist.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.wishlist = action.payload.wishlist;
})
.addCase(getWishlist.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
// removeFromWishlist
.addCase(removeFromWishlist.pending, (state) => {
  state.isLoading = true;
})
.addCase(removeFromWishlist.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(removeFromWishlist.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
});

  }
});

export const {RESET_AUTH} = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer