"use client";
import { motion } from "framer-motion";

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

const EducationScale = () => {
    return (
        <section id="education" className="py-20 px-6 md:px-20 w-full relative z-10 bg-[#050505]">
            <div className="flex flex-col gap-2 mb-16 font-mono">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="text-primary">$</span> git log --education --oneline --graph
                </div>
                <h3 className="text-3xl md:text-5xl font-bold font-display text-white mt-4">
                    Academic <span className="text-primary">History</span>
                </h3>
            </div>

            <div className="max-w-4xl relative space-y-0 font-mono">
                {educationData.map((exp, index) => {
                    // Automatically treat the first item as HEAD for the visual metaphor
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
                            {/* Git Graph Lines */}
                            <div className="flex flex-col items-center flex-shrink-0 w-8">
                                <div className="w-2 h-2 rounded-full bg-secondary group-hover:bg-primary transition-colors mt-2" />
                                {index !== educationData.length - 1 && (
                                    <div className="w-0.5 h-full bg-gray-800 -mb-2" />
                                )}
                            </div>

                            <div className="pb-12 flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                    <span className="text-secondary text-sm">
                                        {/* Deterministic "random" hash for SSR consistency */}
                                        {((exp.degree.length + exp.institution.length) * (index + 1) * 54321).toString(16).substring(0, 7)}
                                    </span>
                                    {isHead && (
                                        <span className="text-yellow-500 text-xs">
                                            (HEAD -{'>'} academic/master)
                                        </span>
                                    )}
                                    <span className="text-gray-500 text-xs sm:ml-auto">
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
        </section>
    );
};

export default EducationScale;
