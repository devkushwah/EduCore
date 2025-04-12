import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,

    /**
     *  Initial state me 3 properties hain:

        cart → Cart me jo courses add kiye hain, unka list store karega.

        Agar localStorage me pehle se cart data hai, toh usi ko use karega.
        Agar cart empty hai, toh empty array rahega.
        total → Total price ka track rakhega.

        localStorage se fetch karega, warna default 0.
        totalItems → Cart me total kitne items hain.

        localStorage se fetch karega, warna default 0.
     */
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload    // Action payload se course fetch karna
      const index = state.cart.findIndex((item) => item._id === course._id)  // Check karna ki course pehle se hai ya nahi
    
      if (index >= 0) {
        // Agar course already cart me hai toh error message show hoga
        toast.error("Course already in cart")
        return
      }
    
      // Agar course nahi hai cart me toh add karo
      state.cart.push(course)
      state.totalItems++  // Total items count badhao
      state.total += course.price  // Total price badhao
    
      // Local storage me update karo
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
    
      // Success message show karo
      toast.success("Course added to cart")
    },
    
    removeFromCart: (state, action) => {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        // If the course is found in the cart, remove it
        state.totalItems--
        state.total -= state.cart[index].price
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course removed from cart")
      }
    },

    
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer