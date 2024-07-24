import React,{ useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import LoginPage from './pages/loginpage';
import { signOut, getAuth } from 'firebase/auth';
import Post from "./pages/posts"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogDescription from './pages/blogDescription';
import Profile from './pages/profile';


function App() {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isOpen, setIsOpen] = useState(false);



  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false);
      window.location.pathname = "/"
    }).catch((error) => {
       console.log(`this is the error${error}`);
    });
  }
  return (
    <Router>
        <nav className="bg-white border-b shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <p href="#" className="text-lg font-semibold text-blue-gray-900">
          <Link className="navbar-brand" to="/home">AMAHAN</Link>
          </p>
        </div>
        <div className="hidden lg:flex space-x-6">
          <p href="#" className="text-blue-gray-900 hover:text-blue-500 transition-colors">
            <Link className="nav-link active" aria-current="page" to="/home"> Home</Link>
          </p>
          {!isAuth ? 
          <p href="#" className="text-blue-gray-900 hover:text-blue-500 transition-colors">
          <Link className="nav-link active" aria-current="page" to="/signup">Login</Link>
          </p>
          :
          <><p href="#" className="text-blue-gray-900 hover:text-blue-500 transition-colors">
          <Link className="nav-link active" aria-current="page" onClick={signUserOut}>SignOut</Link>
          </p>
          <p href="#" className="text-blue-gray-900 hover:text-blue-500 transition-colors">
          <Link className="nav-link active" aria-current="page" to="/posts">Post</Link>
          </p>
          </>
          }
        </div>
        <div className="lg:hidden">
          <button
            className="text-blue-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <div className="px-4 py-2 space-y-2">
            <p className="block text-blue-gray-900 hover:text-blue-500 transition-colors">
            <Link className="nav-link active" aria-current="page" to="/home"> Home</Link>
            </p>
            {!isAuth ?
            <p className="block text-blue-gray-900 hover:text-blue-500 transition-colors">
            <Link className="nav-link active" aria-current="page" to="/signup">Login</Link>
            </p>
            :<>
            <p className="block text-blue-gray-900 hover:text-blue-500 transition-colors">
            <Link className="nav-link active" aria-current="page" onClick={signUserOut}>SignOut</Link>
            </p>
            <p className="block text-blue-gray-900 hover:text-blue-500 transition-colors">
            <Link className="nav-link active" aria-current="page" to="/posts">Post</Link>
            </p>
            </>}
          </div>
        </div>
      )}
    </nav>

{/* <Link className="navbar-brand" to="/home">AMAHAN</Link>
    
      <Link className="nav-link active" aria-current="page" to="/home">home</Link>
    
      {!isAuth ? <Link className="nav-link active" aria-current="page" to="/signup">Login</Link> 
        :
        <>
        <Link className="nav-link active" aria-current="page" onClick={signUserOut}>SignOut</Link>
        <Link className="nav-link active" aria-current="page" to="/posts">Post</Link>
        </>

      } */}













   
      
      <Routes>
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path="/blogdescription/:id" element={<BlogDescription isAuth={isAuth}/>}/>
        <Route path='/home' element={<Home isAuth={isAuth}/>}/>
        <Route path='/' element={<LoginPage setIsAuth={setIsAuth} />}/>
        <Route path='/posts' element={<Post isAuth={isAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
