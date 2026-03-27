"use client";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";
import { Download, MapPin, Code2, Briefcase } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay, ease: "easeOut" }
});

export default function Hero() {
    return (
        <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-20 overflow-hidden pt-28 pb-16 md:pt-0 text-center">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-primary/15 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-secondary/10 blur-[140px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"/>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 blur-[160px] rounded-full pointer-events-none"/>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl mx-auto">

                {/* Terminal tag */}
                <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-secondary text-sm font-mono bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <span className="text-primary animate-pulse">▶</span>
                    <span className="terminal-text">Initialize System...</span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"/>
                </motion.div>

                {/* Main heading */}
                <motion.h1 {...fadeUp(0.3)} className="text-5xl sm:text-6xl md:text-8xl font-bold font-display leading-tight text-white min-h-[120px] md:min-h-[160px]">
                    <TypewriterEffect />
                </motion.h1>

                {/* Mission */}
                <motion.p {...fadeUp(0.6)} className="text-gray-400 text-base md:text-xl font-mono">
                    <span className="text-primary">const</span>{" "}
                    <span className="text-accent">mission</span>{" "}
                    ={" "}
                    <span className="text-secondary">"Crafting immersive digital experiences"</span>;
                </motion.p>

                {/* Meta info row */}
                <motion.div {...fadeUp(0.9)} className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-gray-500 mt-2">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary"/>
                        Phagwara, Punjab, India
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"/>
                    <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-secondary"/>
                        Full Stack Developer
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"/>
                    <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-accent"/>
                        Open to Work
                    </span>
                </motion.div>

                {/* Tech badges */}
                <motion.div {...fadeUp(1.1)} className="flex flex-wrap justify-center gap-2 mt-2">
                    {["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"].map(tech => (
                        <span key={tech} className="px-3 py-1 text-xs font-mono border border-white/10 text-gray-400 rounded-full bg-white/5 hover:border-primary/40 hover:text-primary transition-all">
                            {tech}
                        </span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div {...fadeUp(1.3)} className="flex flex-col sm:flex-row gap-4 mt-6 font-mono">
                    <a href="#footer" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                    }} className="px-8 py-3.5 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer rounded-sm">
                        <span className="text-primary group-hover:text-black transition-colors">{">"}</span> Hire Me
                    </a>
                    <a href="/Vikash_Kushwaha_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-transparent border border-gray-700 text-gray-400 hover:border-accent hover:text-accent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-sm">
                        {">"} View Resume <Download className="w-4 h-4"/>
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-10 flex flex-col items-center gap-2 text-gray-600 font-mono text-xs"
                >
                    <span>scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}
