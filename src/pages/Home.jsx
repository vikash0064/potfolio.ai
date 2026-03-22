import React, { useEffect, useState } from 'react';
import Hero from "@/components/home/Hero";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ExperienceScale from "@/components/home/ExperienceScale";
import EducationScale from "@/components/home/EducationScale";
import ContactForm from "@/components/contact/ContactForm";
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import { getProjects, getSkills, getExperience } from "@/lib/api";
export default function Home() {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const [p, s, e] = await Promise.all([
                getProjects(),
                getSkills(),
                getExperience()
            ]);
            setProjects(p || []);
            setSkills(s || []);
            setExperience(e || []);
        }
        fetchData();
    }, []);
    return (<main className="min-h-screen w-full relative bg-background">
      <Hero />
      <SkillsSection skills={skills}/>
      <ProjectGrid projects={projects}/>
      <ExperienceScale experience={experience}/>
      <EducationScale />
      <FeaturedBlogs />
      <ContactForm />
    </main>);
}
