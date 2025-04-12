import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,  // Signup ke time user ka data store karega (default: null).
  loading: false,  // Authentication request chal rahi hai ya nahi (default: false).
  // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, 
  token: localStorage.getItem("token") || null
  // User ka authentication token store karega
  // Agar localStorage me token saved hai, toh usko fetch karega aur JSON me convert karega.
  // Agar token nahi hai, toh null set karega.
};

const authSlice = createSlice({   
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {   //  setSignupData(state, value) → Signup data store karna
      state.signupData = value.payload;  // action.payload me signup form ka data aayega jo state.signupData me store hoga.
      // Example: dispatch(setSignupData({ name: "Amit", email: "amit@example.com" }));
      // Signup data Redux state me store ho jayega.
    },

    setLoading(state, value) {         // setLoading(state, value) → Loading state update karna
      state.loading = value.payload;   // loading true ya false ho sakta hai.
                                      // Example:
                                        // dispatch(setLoading(true)) → Authentication request start ho gayi.
                                        // dispatch(setLoading(false)) → Authentication request complete ho gayi.

    },
    setToken(state, value) {    //  setToken(state, value) → Authentication token update karna
      state.token = value.payload;   // action.payload me JWT token ya authentication key aayega jo state.token me store hoga.
      if (value.payload) {
        localStorage.setItem("token", value.payload);  // ✅ FIXED: Save token directly
      } else {
        localStorage.removeItem("token");  // ✅ Remove token on logout
      }
                                    // Local Storage me bhi token save kiya ja sakta hai.
                                    // Example: dispatch(setToken("xyz123token"));
                                    // Redux state me token store ho jayega.
      
    }, 
  },
});

/**
 *  Workflow (Kaise Kaam Karega Yeh Code?)
1️⃣ Jab user signup karega

dispatch(setSignupData(userData)) → Signup data store hoga.
2️⃣ Jab authentication request chalegi

dispatch(setLoading(true)) → Loading enable hoga.
dispatch(setLoading(false)) → Loading disable hoga jab request complete ho jayegi.
3️⃣ Jab login/signup successfully ho jayega

dispatch(setToken(authToken)) → Token save hoga Redux state me.
localStorage.setItem("token", JSON.stringify(authToken)) → Token localStorage me bhi save ho sakta hai.
4️⃣ Agar user logout karega

dispatch(setToken(null)) → Token Redux state se remove ho jayega.
localStorage.removeItem("token") → Token localStorage se bhi delete ho sakta hai.
🔥 Summary
Redux Toolkit ka use karke authentication ka state management kiya gaya hai.
Signup data, loading status, aur authentication token manage kiya gaya hai.
Reducers ka use karke state modify kiya ja raha hai.
Redux store me authentication ka centralized management ho raha hai.
🚀 Iska use karne se authentication system me Redux ka proper integration ho jayega!
 */

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;