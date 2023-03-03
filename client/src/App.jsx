import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navigation, Footer } from './Components';
import { CreatePost, Home, NotFound } from './Pages';

function App() {
  return (
    <>
      <Router>
        <Navigation />

        <main className="sm:px-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </Router>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>    
  )
}

export default App