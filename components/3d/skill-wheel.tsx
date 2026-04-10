"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import type * as THREE from "three";
import { Card, CardContent } from "@/components/ui/card";

const skillsData = [
  {
    name: "React",
    category: "Frontend",
    level: 90,
    color: "#00d8ff",
    description:
      "Advanced React development with hooks, context, and performance optimization",
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 90,
    color: "#53d769",
    description:
      "Server-side JavaScript with Express, APIs, and microservices architecture",
  },
  {
    name: "Express.js",
    category: "Backend",
    level: 88,
    color: "#c0c0c0",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 85,
    color: "#3178C6",
    description:
      "Type-safe JavaScript development with advanced TypeScript patterns",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 90,
    color: "#ffffff",
    description:
      "Server-side rendering, static site generation, and API routes with Next.js",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    level: 95,
    color: "#fcfc03",
    description: "Web development with HTML, CSS, and JavaScript",
  },
  {
    name: "Docker",
    category: "DevOps",
    level: 50,
    color: "#0db7ed",
    description: "Containerization, orchestration, and deployment automation",
  },
  {
    name: "Three.js",
    category: "Frontend",
    level: 45,
    color: "#ff00cc",
    description: "3D graphics, WebGL, and immersive web experiences",
  },
  {
    name: "MongoDB",
    category: "Database",
    level: 78,
    color: "#00ed64",
    description: "API design, schema definition, and efficient data fetching",
  },
].map((skill, index, array) => {
  const angle = (index / array.length) * Math.PI * 2;
  const radius = 3;
  return {
    ...skill,
    position: [
      parseFloat((Math.cos(angle) * radius).toFixed(2)),
      parseFloat((Math.sin(angle) * radius).toFixed(2)),
      0,
    ],
  };
});

function SkillOrb({ skill, onClick, isHovered, onHover, onUnhover }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      if (isHovered) {
        meshRef.current.scale.setScalar(
          1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05,
        );
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const size = (skill.level / 100) * 0.6 + 0.2;

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          if (onHover) onHover();
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          if (onUnhover) onUnhover();
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      <Text
        position={[0, -size - 0.4, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
}

// Fallback 2D skills grid
function FallbackSkillsGrid({ skills, onSkillClick }: any) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill: any) => (
        <motion.div
          key={skill.name}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSkillClick(skill)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
                style={{
                  backgroundColor: skill.color + "20",
                  color: skill.color,
                }}
              >
                {skill.level}%
              </div>
              <h3 className="text-white font-semibold mb-1">{skill.name}</h3>
              <p className="text-white/60 text-sm">{skill.category}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillWheel() {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [canvasError, setCanvasError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  const handleCanvasError = () => {
    setCanvasError(true);
    setWebglSupported(false);
  };

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 9], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {skillsData.map((skill) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              isHovered={hoveredSkill?.name === skill.name}
              onClick={() => setSelectedSkill(skill)}
              onHover={() => setHoveredSkill(skill)}
              onUnhover={() => setHoveredSkill(null)}
            />
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            maxDistance={12}
            minDistance={4}
          />
        </Canvas>
      ) : (
        <FallbackSkillsGrid
          skills={skillsData}
          onSkillClick={setSelectedSkill}
        />
      )}

      {/* Skill Details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 glass-morphism rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {selectedSkill.name}
              </h3>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                {selectedSkill.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  />
                </div>
                <span className="text-white/80">{selectedSkill.level}%</span>
              </div>
            </div>

            <p className="text-white/70">{selectedSkill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
