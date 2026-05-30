import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Sparkles, Play, Video, Film, Eye, Wand2, Layers, Crop, CheckCircle } from 'lucide-react';

interface SkillInfo {
  name: string;
  percentage: number;
  label: string;
  color: string;
  glowColor: string;
  accentBg: string;
  tagline: string;
  details: string[];
}

export default function SkillsPanel() {
  const skills: SkillInfo[] = [
    {
      name: 'Premiere Pro',
      percentage: 61,
      label: 'Video Editing',
      color: '#06B6D4', // Teal Blue Color
      glowColor: 'rgba(6, 182, 212, 0.4)',
      accentBg: 'rgba(6, 182, 212, 0.1)',
      tagline: 'Expertise in high-octane editorial layout, pacing, soundscapes & color design.',
      details: [
        'Multi-cam editing & audio sync',
        'Advanced Lumetri Color grading (Cinematic & Modern Teal/Orange LUTs)',
        'Audio engineering, sound design & dialogue cleanup',
        'Pacing & dynamic narrative structuring'
      ]
    },
    {
      name: 'After Effects',
      percentage: 49,
      label: 'Motion Graphics',
      color: '#A855F7', // Magenta Purple
      glowColor: 'rgba(168, 85, 247, 0.4)',
      accentBg: 'rgba(168, 85, 247, 0.1)',
      tagline: 'Kinetic typography, sleek UI transitions, & customized expression layouts.',
      details: [
        'Custom transition design & custom keyframe easing',
        'Kinetic typography & Title intros',
        'Green screen chroma-keying & tracking',
        'Visual FX & Lottie animation export for web interfaces'
      ]
    },
    {
      name: 'Photoshop',
      percentage: 45,
      label: 'Graphic & Asset Design',
      color: '#3B82F6', // Royal Blue
      glowColor: 'rgba(59, 130, 246, 0.4)',
      accentBg: 'rgba(59, 130, 246, 0.1)',
      tagline: 'High-contrast compositing, high-fidelity YouTube thumbnails, & layout grids.',
      details: [
        'Advanced layer composting & matte painting',
        'High-density YouTube metadata thumbnails designed for CTR',
        'Visual assets, vector assets, & social media brand suites',
        'Poster layouts & brand guidelines matching digital screens'
      ]
    }
  ];

  return (
    <div className="bg-[#1a1a1a]/65 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-white/10 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#2dd4bf] animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-[#2dd4bf] uppercase font-mono">Adobe Ecosystem</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Core Skills & Tools
          </h3>
        </div>
      </div>

      {/* Radial Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {skills.map((skill, index) => {
          const radius = 50;
          const strokeWidth = 9;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

          return (
            <div
              key={index}
              id={`skill-card-${index}`}
              className="flex flex-col items-center w-full max-w-[200px] group transition-all duration-300 transform rounded-xl p-4 hover:bg-white/[0.02] border border-transparent"
            >
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                {/* Background Track Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                  />
                  {/* Glowing Animated SVG circle path */}
                  <motion.circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="transparent"
                    stroke={skill.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 1.6, ease: 'easeOut', delay: index * 0.15 }}
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 6px ${skill.color})`
                    }}
                  />
                </svg>

                {/* Internal Percentage Text */}
                <span className="absolute text-2xl font-extrabold text-white tracking-tighter flex items-baseline">
                  {skill.percentage}
                  <span className="text-sm font-semibold opacity-85">%</span>
                </span>
                
                {/* Circle Badge overlay */}
                <div className="absolute -bottom-1 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300">
                  {skill.label}
                </div>
              </div>

              {/* Title & Toggle indicator */}
              <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-white transition-colors duration-200">
                {skill.name}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
