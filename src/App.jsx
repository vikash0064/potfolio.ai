import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogsIndex from './pages/blogs/index';
import BlogsSlug from './pages/blogs/Slug';
import ProjectsId from './pages/projects/Id';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MagneticCursor from './components/common/MagneticCursor';

import ClientLoader from './components/layout/ClientLoader';
import { Toaster } from 'sonner';

import AdminRoutes from './components/admin/AdminRoutes';

import { useLocation } from 'react-router-dom';

const NotFound = () => <div className="p-8 text-white">404 - Not Found</div>;

function LayoutWrapper({ children }) {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
        </>
    );
}

function App() {
    return (
      <BrowserRouter>
        <ClientLoader>
          <Toaster position="bottom-right" theme="dark" />
          <MagneticCursor />
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/blogs" element={<BlogsIndex />}/>
              <Route path="/blogs/:slug" element={<BlogsSlug />}/>
              <Route path="/projects/:id" element={<ProjectsId />}/>
              <Route path="/admin/*" element={<AdminRoutes />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </LayoutWrapper>
        </ClientLoader>
      </BrowserRouter>
    );
}

export default App;
