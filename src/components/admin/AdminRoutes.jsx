import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Suspense, lazy } from 'react';

// Admin Login
import LoginPage from '../../pages/admin/login/page';

// Lazy load admin pages for performance
const AdminDashboard = lazy(() => import('../../pages/admin/page'));
const AdminBlogs = lazy(() => import('../../pages/admin/blogs/page'));
const AdminBlogsNew = lazy(() => import('../../pages/admin/blogs/new/page'));
const EditBlogPage = lazy(() => import('../../pages/admin/blogs/[id]/edit/page'));
const AdminProjects = lazy(() => import('../../pages/admin/projects/page'));
const AdminProjectsNew = lazy(() => import('../../pages/admin/projects/new/page'));
const EditProjectPage = lazy(() => import('../../pages/admin/projects/[id]/edit/page'));
const AdminSkills = lazy(() => import('../../pages/admin/skills/page'));
const AdminSkillsNew = lazy(() => import('../../pages/admin/skills/new/page'));
const EditSkillPage = lazy(() => import('../../pages/admin/skills/[id]/edit/page'));
const AdminExperience = lazy(() => import('../../pages/admin/experience/page'));
const AdminExperienceNew = lazy(() => import('../../pages/admin/experience/new/page'));
const EditExperiencePage = lazy(() => import('../../pages/admin/experience/[id]/edit/page'));
const AdminCertificates = lazy(() => import('../../pages/admin/certificates/page'));
const AdminCertificatesNew = lazy(() => import('../../pages/admin/certificates/new/page'));
const EditCertificatePage = lazy(() => import('../../pages/admin/certificates/[id]/edit/page'));
const AdminAnalytics = lazy(() => import('../../pages/admin/analytics/page'));
const AdminActivity = lazy(() => import('../../pages/admin/activity/page'));

const RequireAdmin = ({ children }) => {
    // Simple mock authentication using localStorage for local MERN usage
    const isAuthed = localStorage.getItem('admin_token') === 'authed';
    if (!isAuthed) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

const LoadingFallback = () => <div className="p-8 text-white flex justify-center py-20">Loading module...</div>;

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            
            <Route element={
                <RequireAdmin>
                    <AdminLayout />
                </RequireAdmin>
            }>
                <Route index element={<Suspense fallback={<LoadingFallback/>}><AdminDashboard /></Suspense>} />
                
                <Route path="blogs" element={<Suspense fallback={<LoadingFallback/>}><AdminBlogs /></Suspense>} />
                <Route path="blogs/new" element={<Suspense fallback={<LoadingFallback/>}><AdminBlogsNew /></Suspense>} />
                <Route path="blogs/:id/edit" element={<Suspense fallback={<LoadingFallback/>}><EditBlogPage /></Suspense>} />
                
                <Route path="projects" element={<Suspense fallback={<LoadingFallback/>}><AdminProjects /></Suspense>} />
                <Route path="projects/new" element={<Suspense fallback={<LoadingFallback/>}><AdminProjectsNew /></Suspense>} />
                <Route path="projects/:id/edit" element={<Suspense fallback={<LoadingFallback/>}><EditProjectPage /></Suspense>} />
                
                <Route path="skills" element={<Suspense fallback={<LoadingFallback/>}><AdminSkills /></Suspense>} />
                <Route path="skills/new" element={<Suspense fallback={<LoadingFallback/>}><AdminSkillsNew /></Suspense>} />
                <Route path="skills/:id/edit" element={<Suspense fallback={<LoadingFallback/>}><EditSkillPage /></Suspense>} />
                
                <Route path="experience" element={<Suspense fallback={<LoadingFallback/>}><AdminExperience /></Suspense>} />
                <Route path="experience/new" element={<Suspense fallback={<LoadingFallback/>}><AdminExperienceNew /></Suspense>} />
                <Route path="experience/:id/edit" element={<Suspense fallback={<LoadingFallback/>}><EditExperiencePage /></Suspense>} />

                <Route path="certificates" element={<Suspense fallback={<LoadingFallback/>}><AdminCertificates /></Suspense>} />
                <Route path="certificates/new" element={<Suspense fallback={<LoadingFallback/>}><AdminCertificatesNew /></Suspense>} />
                <Route path="certificates/:id/edit" element={<Suspense fallback={<LoadingFallback/>}><EditCertificatePage /></Suspense>} />

                <Route path="analytics" element={<Suspense fallback={<LoadingFallback/>}><AdminAnalytics /></Suspense>} />
                <Route path="activity" element={<Suspense fallback={<LoadingFallback/>}><AdminActivity /></Suspense>} />
                
                <Route path="*" element={<div className="p-8 text-white">Route not strictly mapped yet.</div>} />
            </Route>
        </Routes>
    );
}
