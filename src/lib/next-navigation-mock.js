import { useLocation, useNavigate, useSearchParams as useRRDSearchParams } from 'react-router-dom';
export function useRouter() {
    const navigate = useNavigate();
    return {
        push: (url) => navigate(url),
        replace: (url) => navigate(url, { replace: true }),
        back: () => navigate(-1),
        refresh: () => window.location.reload(),
    };
}
export function usePathname() {
    const location = useLocation();
    return location.pathname;
}
export function useSearchParams() {
    const [searchParams] = useRRDSearchParams();
    return searchParams;
}
export function notFound() {
    throw new Error("Not Found");
}
export function redirect(url) {
    window.location.href = url;
}
