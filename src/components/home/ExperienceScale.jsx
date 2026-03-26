"use client";
import { motion } from "framer-motion";
const ExperienceScale = ({ experience }) => {
    // Merge hardcoded internships with API data if not already present
    const hardcodedExp = [
        {
            id: 'webingix',
            company: 'Webingix',
            role: 'Software Engineer Intern',
            duration: '3 Months',
            description: 'Worked on modern React applications and UI/UX improvements.',
            is_static: true
        },
        {
            id: 'cipherschool',
            company: 'Cipherschool',
            role: 'Web Developer Intern',
            duration: '2 Months',
            description: 'Built scalable web apps and explored MERN stack development.',
            is_static: true
        }
    ];

    const displayExperience = [...(experience || []), ...hardcodedExp].sort((a, b) => (b.order_index || 0) - (a.order_index || 0));

    if (!displayExperience || displayExperience.length === 0)
        return null;

    // Helper to format dates (e.g. "2023-01-01" -> "Jan 2023")
    const formatDate = (dateString) => {
        if (!dateString)
            return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } catch (e) {
            return dateString;
        }
    };

    return (<section id="experience" className="py-24 px-6 md:px-20 w-full relative z-10 bg-[#050505] overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 mb-20 font-mono">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="text-primary">$</span> git log --oneline --graph
                </div>
                <h3 className="text-3xl md:text-5xl font-bold font-display text-white mt-4 tracking-tight">
                    Commit <span className="text-primary">History</span>
                </h3>
            </div>

            <div className="relative space-y-0 font-mono">
                {displayExperience.map((exp, index) => {
                    const dateDisplay = exp.start_date
                        ? `${formatDate(exp.start_date)} - ${exp.end_date ? formatDate(exp.end_date) : 'Present'}`
                        : exp.duration || exp.year_range;

                    const isHead = index === 0;
                    const hash = exp.id.length > 7 ? exp.id.substring(0, 7) : ((exp.role.length + exp.company.length) * (index + 1) * 123).toString(16).substring(0, 7);

                    return (<motion.div 
                        key={exp.id || index} 
                        initial={{ opacity: 0, x: -20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ delay: index * 0.1 }} 
                        viewport={{ once: true }} 
                        className="flex gap-8 group"
                    >
                        {/* Git Graph Lines */}
                        <div className="flex flex-col items-center flex-shrink-0 w-8">
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary group-hover:bg-primary transition-all duration-300 mt-2 shadow-[0_0_10px_rgba(0,255,65,0.2)]" />
                            {index !== displayExperience.length - 1 && (<div className="w-[1px] h-full bg-gray-800 -mb-2 group-hover:bg-primary/20 transition-colors" />)}
                        </div>

                        <div className="pb-16 flex-grow">
                            <div className="flex flex-wrap justify-between items-baseline mb-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-secondary text-sm font-bold">{hash}</span>
                                    {isHead && (<span className="text-yellow-500 text-[10px] items-center flex gap-1 font-bold">
                                        (HEAD -{'>'} master, origin/master)
                                    </span>)}
                                </div>
                                <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">
                                    {dateDisplay}
                                </span>
                            </div>

                            <div className="bg-[#0a0a0a]/30 border border-white/5 rounded-2xl p-8 hover:border-primary/20 hover:bg-[#0a0a0a] transition-all duration-500">
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    feat(career): <span className="text-gray-300 font-normal">{exp.role}</span>
                                </h4>
                                <div className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                                    <span className="opacity-50 tracking-tighter">Author:</span> 
                                    <span className="text-gray-400 font-medium">{exp.company}</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-primary/10 pl-6 py-1 italic font-mono">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>);
                })}
            </div>
        </div>
    </section>);
};
export default ExperienceScale;
