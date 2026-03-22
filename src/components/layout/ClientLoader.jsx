"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Preloader from "@/components/layout/Preloader";
export default function ClientLoader({ children, }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const handleComplete = useCallback(() => {
        setIsLoading(false);
    }, []);
    return (<>
        <AnimatePresence mode="wait">
            {isLoading && (<Preloader key="preloader" onComplete={handleComplete} />)}
        </AnimatePresence>
        {/* Remove !isLoading to render children in the background immediately */}
        {children}
    </>);
}
