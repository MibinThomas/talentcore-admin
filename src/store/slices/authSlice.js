const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isHydrated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isHydrated = false;
      state.loading = false;
      sessionStorage.clear();
      localStorage.clear();
    },
    hydrateAuth: (state) => {
      const user = JSON.parse(sessionStorage.getItem("user"));

      state.user = user || null;
      state.isAuthenticated = !!token;
      state.isHydrated = true;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, hydrateAuth, setLoading } = authSlice.actions;

export default authSlice.reducer;
