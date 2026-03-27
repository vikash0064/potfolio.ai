import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, ExternalLink, Terminal, Award, Trophy, Folder, X, ZoomIn } from "lucide-react";

const HARDCODED_CERTIFICATES = [
    {
        id: "cert-1",
        title: "Code-A-Haunt 24-Hour Hackathon",
        issuer: "Lovely Professional University",
        date: "FEB'24 - MAR'24",
        link: "#",
        image: "/certificate image/Screenshot 2026-03-23 033358.png"
    },
    {
        id: "cert-2",
        title: "The Bits and Bytes of Computer Networking",
        issuer: "Coursera / Google",
        date: "September 2024",
        link: "https://coursera.org/verify/OK4YO9N4ZQ17",
        image: "/certificate image/Screenshot 2026-03-27 031406.png"
    },
    {
        id: "cert-3",
        title: "Computer Architecture & Operating Systems",
        issuer: "IBM / Coursera",
        date: "2023",
        link: "https://coursera.org/verify/B1BCXL7JNJ5S",
        image: "/certificate image/Screenshot 2026-03-27 032714.png"
    }
];


const educationData = [
    {
        id: "5633e8",
        institution: "Lovely Professional University Phagwara, Punjab",
        degree: "Bachelor of Technology - Computer Science and Engineering",
        score: "CGPA: 6.58",
        date: "Aug'23 \u2013 Present",
        branch: "academic/master"
    },
    {
        id: "66c7bc",
        institution: "Lucent International School Dehradun (Uttarakhand)",
        degree: "Intermediate",
        score: "Percentage: 65%",
        date: "Apr'20 \u2013 Mar'22"
    },
    {
        id: "90394e",
        institution: "Euro Global Academy, Bhachau, Kutch (Gujarat)",
        degree: "Matriculation",
        score: "Percentage: 52%",
        date: "Apr'18 \u2013 Mar'20"
    }
];

const achievementsData = [
    { title: "Solved 150+ DSA problems", desc: "Platforms: LeetCode, Geeks For Geeks, Coding Ninjas, HackerRank", date: "June'23" },
    { title: "UPSC NDA Written Exam", desc: "Successfully cleared (Conference Out during SSB)", date: "2023" }
];

const EducationScale = () => {
    const [certificates] = useState(HARDCODED_CERTIFICATES);
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="education" className="py-24 px-6 md:px-20 w-full relative z-10 bg-[#050505]">
            <div className="max-w-6xl mx-auto space-y-32">
                
                {/* 1. Academic History (Git Log Style) */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-2 font-mono">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span className="text-primary">$</span> git log --education --oneline --graph
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold font-display text-white mt-4 tracking-tight">
                            Academic <span className="text-primary">History</span>
                        </h3>
                    </div>

                    <div className="relative space-y-0 font-mono">
                        {educationData.map((edu, index) => (
                            <motion.div 
                                key={edu.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-6 group"
                            >
                                <div className="flex flex-col items-center flex-shrink-0 w-8">
                                    <div className={`w-2.5 h-2.5 rounded-full mt-2 relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]`} style={{ backgroundColor: index === 0 ? '#a855f7' : index === 1 ? '#ec4899' : '#3b82f6' }} />
                                    {index !== educationData.length - 1 && <div className="w-[1px] h-full bg-gray-800 -mb-2" />}
                                </div>

                                <div className="pb-12 flex-grow">
                                    <div className="flex flex-wrap justify-between items-baseline mb-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-purple-400 text-sm">{edu.id}</span>
                                            {edu.branch && (
                                                <span className="text-yellow-500 text-[10px] items-center flex gap-1 font-bold">
                                                    (HEAD {"->"} {edu.branch})
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">{edu.date}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            feat(education): <span className="text-gray-300 font-normal">{edu.degree}</span>
                                        </h4>
                                        <p className="text-gray-500 text-sm font-mono leading-relaxed">Author: {edu.institution}</p>
                                        <p className="text-gray-400 text-xs font-mono mt-2 pt-2 border-t border-white/5 inline-block">{edu.score}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Certificates (LS Style) */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-2 font-mono">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span className="text-primary">$</span> ls -la ./certificates
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <Folder className="text-primary w-8 h-8" />
                            <h3 className="text-3xl md:text-5xl font-bold font-display text-white">Certificates</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {certificates.map((cert, i) => (
                            <motion.div 
                                key={cert.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => cert.image && setSelectedCert(cert)}
                                className={`group relative p-6 bg-[#0a0a0a] border border-white/10 rounded-xl hover:border-primary/40 transition-all duration-300 ${cert.image ? 'cursor-zoom-in' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h5 className="text-white font-bold text-sm leading-tight pr-4 group-hover:text-primary transition-colors">{cert.title}</h5>
                                    <div className="flex gap-2">
                                        {cert.image && <ZoomIn className="w-4 h-4 text-gray-600 group-hover:text-primary" />}
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{cert.issuer}</p>
                                    <div className="bg-primary/5 border border-primary/20 px-3 py-1.5 rounded inline-block">
                                        <span className="text-[10px] text-primary font-mono font-bold tracking-widest">{cert.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. Achievements (Cat Style) */}
                <div className="space-y-8">
                    <div className="flex flex-col gap-2 font-mono">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span className="text-primary">$</span> cat ./achievements.md
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <Trophy className="text-primary w-8 h-8" />
                            <h3 className="text-3xl md:text-5xl font-bold font-display text-white">Achievements</h3>
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        {achievementsData.map((ach, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="relative p-8 bg-[#0a0a0a] border-l-2 border-primary/50 group hover:bg-[#0d0d0d] transition-colors"
                            >
                                <div className="flex flex-col gap-4">
                                    <h5 className="text-white font-bold text-xl">{ach.title}</h5>
                                    <p className="text-gray-400 font-mono text-sm leading-relaxed">{ach.desc}</p>
                                    <span className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]">{ach.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.button 
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedCert(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedCert.image} 
                                alt={selectedCert.title} 
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                            />
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-white font-display uppercase tracking-widest">{selectedCert.title}</h2>
                                <p className="text-primary font-mono text-sm">{selectedCert.issuer} | {selectedCert.date}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default EducationScale;
