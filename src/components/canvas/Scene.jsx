"use client";
import { Canvas } from "@react-three/fiber";
import { Preload, Environment } from "@react-three/drei";
export default function Scene({ children, className, style }) {
    return (<Canvas className={className} style={{ ...style, background: 'transparent' }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }} onCreated={({ gl, scene }) => {
            gl.setClearColor(0, 0); // Transparent
            scene.background = null;
        }} camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* Light setup for futuristic glow */}
            <ambientLight intensity={0.5}/>
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff"/>
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bc13fe"/>

            {children}

            <Environment preset="city" background={false}/>
            <Preload all/>
        </Canvas>);
}
