import { Navigate, Route, Routes } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader.jsx"
import { Toaster } from "react-hot-toast"

function App() {
  const {authUser, isCheckAuth, check} = useAuthStore();

  useEffect(() => {
    check()
  }, [check])

  console.log({authUser});

  if(isCheckAuth) return <PageLoader />;
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
