import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, Skill, Experience, Blog, User, Certificate } from './models.js';
// Admin user seed data (change these as needed)
const adminUser = {
    username: "admin",
    email: "admin@example.com",
    password: "admin123", // In production, always hash passwords!
    role: "admin"
};

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Initial Seed Data
const dummyProjects = [
    {
        title: "Mahadev Computers",
        description: "A modern, full-featured e-commerce platform.",
        tags: ["Next.js", "MongoDB", "Tailwind CSS"],
        image: "/images/mahadev-computers.png",
        link: "https://next-project-phi-peach.vercel.app",
        github: "https://github.com/VikashKushwaha/NextProject.git",
        order_index: 0
    },
    {
        title: "E-commerce Shopping",
        description: "A comprehensive e-commerce application built with the MERN stack.",
        tags: ["React", "Node.js", "MongoDB", "Express.js"],
        image: "/images/ecommerce.png",
        github: "https://github.com/VikashKushwaha/E-Com-Laptop-Store.git",
        order_index: 1
    }
];

const dummySkills = [
    { name: "Next.js", category: "Frontend", icon: "Code", order_index: 0 },
    { name: "React.js", category: "Frontend", icon: "Atom", order_index: 1 },
    { name: "MongoDB", category: "Backend", icon: "Database", order_index: 2 },
    { name: "Express", category: "Backend", icon: "Server", order_index: 3 },
    { name: "Node.js", category: "Backend", icon: "Terminal", order_index: 4 },
];

const dummyExperience = [
    {
        company: "Example Company",
        role: "Software Engineer",
        duration: "2022 - Present",
        description: "Building scalable web applications.",
        is_active: true,
        order_index: 0
    }
];

const dummyCertificates = [
    {
        title: "Social Networks",
        issuer: "NPTEL / IIT Madras",
        date: "2024 - Present",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
        link: "https://nptel.ac.in",
        order_index: 0
    },
    {
        title: "Computer Architecture & Operating Systems",
        issuer: "IBM / Coursera",
        date: "2023",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
        link: "https://coursera.org",
        order_index: 1
    },
    {
        title: "Code-A-Haunt Hackathon",
        issuer: "LPU / University",
        date: "2024",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
        link: "#",
        order_index: 2
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Blog.deleteMany({});
        await Certificate.deleteMany({});

        // Remove old admin users and insert the new one
        await User.deleteMany({ role: "admin" });
        await User.create(adminUser);

        await Project.insertMany(dummyProjects);
        await Skill.insertMany(dummySkills);
        await Experience.insertMany(dummyExperience);
        await Certificate.insertMany(dummyCertificates);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
