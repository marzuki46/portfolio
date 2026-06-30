"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Globe, User, Mail, ExternalLink, Sparkles, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-0"
    >
      {/* Parallax Background Layer */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
        {[
          { left: "10%", top: "20%" },
          { left: "25%", top: "80%" },
          { left: "45%", top: "10%" },
          { left: "65%", top: "70%" },
          { left: "85%", top: "30%" },
          { left: "15%", top: "50%" },
          { left: "35%", top: "90%" },
          { left: "55%", top: "40%" },
          { left: "75%", top: "15%" },
          { left: "95%", top: "60%" },
          { left: "5%", top: "75%" },
          { left: "30%", top: "35%" },
          { left: "50%", top: "85%" },
          { left: "70%", top: "5%" },
          { left: "90%", top: "55%" },
          { left: "20%", top: "45%" },
          { left: "40%", top: "25%" },
          { left: "60%", top: "95%" },
          { left: "80%", top: "65%" },
          { left: "100%", top: "50%" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* AI Automation Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 text-sm font-medium">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.span>
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              AI & Automation Specialist
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for projects
          </div>
        </motion.div>

        {/* Main Title with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text bg-[length:200%_100%] animate-gradient">Marzuki</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground/80 font-normal">
              Full Stack Developer & AI Automation
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Saya menciptakan aplikasi web modern dan sistem AI automation 
          yang membantu bisnis berkembang. Spesialisasi di{" "}
          <span className="text-foreground font-semibold">React, Next.js, AI/ML, RPA</span>, 
          dan{" "}
          <span className="text-foreground font-semibold">UI/UX Design</span>.
        </motion.p>

        {/* AI Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          {[
            { icon: Brain, label: "AI Projects", value: "15+" },
            { icon: Zap, label: "Automations", value: "50+" },
            { icon: Globe, label: "Clients", value: "20+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-accent/50 border border-border"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-xl font-bold"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Link href="#projects">
            <Button size="lg" variant="gradient" className="text-base gap-2 group">
              Lihat Proyek Saya
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.span>
            </Button>
          </Link>
          <Link href="#contact">
            <Button size="lg" variant="outline" className="text-base gap-2 group border-primary/20 hover:border-primary/40">
              Diskusi Project
              <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Social Links with Hover Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Globe, href: "https://github.com/marzuki", label: "GitHub" },
            { icon: User, href: "https://linkedin.com/in/marzuki", label: "LinkedIn" },
            { icon: ExternalLink, href: "https://twitter.com/marzuki", label: "Twitter" },
            { icon: Mail, href: "mailto:hello@marzuki.dev", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={href} target="_blank" aria-label={label}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll untuk eksplor</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}