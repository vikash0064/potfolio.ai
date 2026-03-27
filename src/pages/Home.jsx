import React, { useEffect, useState } from 'react';
import Hero from "@/components/home/Hero";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ExperienceScale from "@/components/home/ExperienceScale";
import EducationScale from "@/components/home/EducationScale";
import ContactForm from "@/components/contact/ContactForm";
import FeaturedBlogs from '@/components/home/FeaturedBlogs';

export default function Home() {
    return (<main className="min-h-screen w-full relative bg-background">
        <Hero />
        <SkillsSection />
        <ProjectGrid />
        <ExperienceScale />
        <EducationScale />
        <FeaturedBlogs />
        <ContactForm />
    </main>);
}
