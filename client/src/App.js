import {BrowserRouter,Routes,Route} from "react-router-dom";
import {ProtectedRoutes} from "./lib/ProtectedRoutes";
import Nav from "./components/navbar/Nav";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import SavedList from "./pages/SavedList";
import NotFound from "./pages/404";
import AddPostModal from "./pages/AddPostModal";
import ResetPass from "./components/userLoggin/ResetPass";

function App() {  
  return <>
  <BrowserRouter>
    <Nav />
  <Routes>
    <Route path="/" element={<HomePage />  } />
    <Route path={`/category/:name`} element={<CategoryPage />} />
    <Route path={`/blog/:id`} element={<BlogPage />} />
    <Route path={`/profile/:userId`} element={<ProfilePage />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/settings" element={<Settings />} />
      <Route path="/saved" element={<SavedList />} />
    </Route>
    <Route path={`/reset/pass/:token`} element={<ResetPass />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <AddPostModal />
  </BrowserRouter>
  </>
}

export default App;
