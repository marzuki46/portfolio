"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Sparkles, Code2, Palette, Wrench, Users } from "lucide-react";

const categories = [
  { id: "frontend", label: "Frontend", color: "from-blue-500 to-cyan-500", icon: Code2 },
  { id: "backend", label: "Backend", color: "from-green-500 to-emerald-500", icon: Wrench },
  { id: "design", label: "Design", color: "from-purple-500 to-pink-500", icon: Palette },
  { id: "tools", label: "Tools", color: "from-orange-500 to-red-500", icon: Sparkles },
  { id: "soft", label: "Soft Skills", color: "from-yellow-500 to-amber-500", icon: Users },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <section id="skills" ref={ref} className="relative py-20 lg:py-32 overflow-hidden scroll-mt-20">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="gradient-text">Tech Stack</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Keahlian & <span className="gradient-text">Teknologi</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Stack teknologi dan keahlian yang saya kuasai dalam pengembangan web modern dan AI automation.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                  activeCategory === cat.id
                    ? "text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground bg-accent/50 hover:bg-accent"
                )}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className={cn("absolute inset-0 rounded-full bg-gradient-to-r", cat.color)}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid - Scroll Reveal */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-4 rounded-xl bg-card border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{skill.icon}</span>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground">{skill.level}%</p>
                </div>
              </div>
              {/* Progress Bar with glow */}
              <div className="relative h-2 bg-accent rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r relative",
                    activeCat?.color || "from-primary to-secondary"
                  )}
                >
                  <div className="absolute inset-0 bg-white/20 blur-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: "50+", label: "Proyek Selesai" },
            { number: "25+", label: "Klien Puas" },
            { number: "120+", label: "GitHub Stars" },
            { number: "5+", label: "Tahun Pengalaman" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-xl bg-card border hover:shadow-lg hover:shadow-primary/10 transition-all"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                className="text-3xl font-bold gradient-text mb-1"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}