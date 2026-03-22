"use client";
import { motion } from "framer-motion";
import { Award, Trophy, ExternalLink } from "lucide-react";

const educationData = [
    {
        id: "edu1",
        institution: "Lovely Professional University Phagwara, Punjab",
        degree: "Bachelor of Technology - Computer Science and Engineering",
        score: "CGPA: 6.58",
        date: "Aug'23 \u2013 Present"
    },
    {
        id: "edu2",
        institution: "Lucent International School Dehradun (Uttarakhand)",
        degree: "Intermediate",
        score: "Percentage: 65%",
        date: "Apr'20 \u2013 Mar'22"
    },
    {
        id: "edu3",
        institution: "Euro Global Academy, Bhachau, Kutch (Gujarat)",
        degree: "Matriculation",
        score: "Percentage: 52%",
        date: "Apr'18 \u2013 Mar'20"
    }
];

const certificatesData = [
    { id: "cert1", title: "NPTEL Certification \u2013 Social Networks (Ongoing)", issuer: "NPTEL", date: "Jan'26 \u2013 Present", link: "#" },
    { id: "cert2", title: "Code-A-Haunt 24-Hour Hackathon", issuer: "Lovely Professional University", date: "Feb'24 \u2013 Mar'24", link: "#" },
    { id: "cert3", title: "Computer Architecture and Operating Systems Specialization", issuer: "Coursera \u2013 IBM", date: "Oct'24 \u2013 Feb'24", link: "#" }
];

const achievementsData = [
    { id: "ach1", title: "Solved 150+ DSA problems", desc: "Platforms: LeetCode, Geeks For Geeks, Coding Ninjas, HackerRank", date: "June'23" },
    { id: "ach2", title: "UPSC NDA Written Exam", desc: "Successfully cleared (Conference Out during SSB)", date: "2023" }
];

const EducationScale = () => {
    return (
        <section id="education" className="py-20 px-6 md:px-20 w-full relative z-10 bg-[#050505]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
                
                {/* Academic History Column */}
                <div>
                    <div className="flex flex-col gap-2 mb-16 font-mono">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span className="text-primary">$</span> git log --education --oneline --graph
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold font-display text-white mt-4">
                            Academic <span className="text-primary">History</span>
                        </h3>
                    </div>

                    <div className="relative space-y-0 font-mono">
                        {educationData.map((exp, index) => {
                            const isHead = index === 0;

                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4 group"
                                >
                                    <div className="flex flex-col items-center flex-shrink-0 w-8">
                                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:bg-primary transition-colors mt-2" />
                                        {index !== educationData.length - 1 && (
                                            <div className="w-0.5 h-full bg-gray-800 -mb-2" />
                                        )}
                                    </div>

                                    <div className="pb-12 flex-grow">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                            <span className="text-secondary text-sm">
                                                {((exp.degree.length + exp.institution.length) * (index + 1) * 54321).toString(16).substring(0, 7)}
                                            </span>
                                            {isHead && (
                                                <span className="text-yellow-500 text-xs text-nowrap">
                                                    (HEAD -{'>'} academic/master)
                                                </span>
                                            )}
                                            <span className="text-gray-500 text-xs sm:ml-auto text-nowrap">
                                                {exp.date}
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                            feat(education): <span className="text-gray-300 font-normal">{exp.degree}</span>
                                        </h4>
                                        <div className="text-gray-400 text-sm mb-2 opacity-90">
                                            Author: {exp.institution}
                                        </div>
                                        <p className="text-gray-500 text-sm pl-4 py-1 border-l-2 border-gray-800">
                                            {exp.score}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Certificates & Achievements Column */}
                <div className="flex flex-col gap-12 font-mono">
                    
                    {/* Certificates */}
                    <div>
                        <div className="flex flex-col gap-2 mb-8 font-mono">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="text-primary">$</span> ls -la ./certificates
                            </div>
                            <h3 className="text-3xl font-bold font-display text-white mt-4 flex items-center gap-3">
                                <Award className="text-primary w-8 h-8" /> Certificates
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {certificatesData.map((cert, i) => (
                                <motion.div 
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="p-5 border border-[#222] bg-[#0a0a0a] rounded-xl hover:border-primary/50 transition-colors group relative"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-white font-bold pr-8">{cert.title}</h4>
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="absolute top-5 right-5 text-gray-600 hover:text-primary transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded inline-block">{cert.date}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div>
                        <div className="flex flex-col gap-2 mb-8 font-mono">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="text-primary">$</span> cat ./achievements.md
                            </div>
                            <h3 className="text-3xl font-bold font-display text-white mt-4 flex items-center gap-3">
                                <Trophy className="text-primary w-8 h-8" /> Achievements
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {achievementsData.map((ach, i) => (
                                <motion.div 
                                    key={ach.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="p-5 border-l-2 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-white font-bold">{ach.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2 leading-relaxed">{ach.desc}</p>
                                    <span className="text-xs text-gray-500">{ach.date}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default EducationScale;
