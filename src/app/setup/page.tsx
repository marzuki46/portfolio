"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, User, Key, CheckCircle2, ArrowRight, 
  ArrowLeft, Download, Sparkles, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  { icon: Globe, title: "Site Info", description: "Basic website information" },
  { icon: User, title: "Admin Account", description: "Create your admin account" },
  { icon: Key, title: "Credentials", description: "Save your login credentials" },
  { icon: CheckCircle2, title: "Complete", description: "Setup is finished" },
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    siteName: "My Portfolio",
    siteDescription: "Full Stack Developer & UI Designer",
    username: "admin",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    setError("");
    
    if (currentStep === 0) {
      if (!form.siteName.trim()) {
        setError("Site name is required");
        return;
      }
    }

    if (currentStep === 1) {
      if (!form.username.trim()) {
        setError("Username is required");
        return;
      }
      if (!form.email.trim()) {
        setError("Email is required");
        return;
      }
      if (!form.password || form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    setError("");
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName: form.siteName,
          siteDescription: form.siteDescription,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Setup failed");
        return;
      }

      setCompleted(true);
    } catch (err) {
      setError("Failed to complete setup. Please try again.");
    }
  };

  const downloadCredentials = () => {
    const content = `=== Portfolio Setup Credentials ===
Site Name: ${form.siteName}
Admin URL: /admin
Username: ${form.username}
Email: ${form.email}
Password: ${form.password}
================================
Save this file securely! You will need these credentials to log in.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-credentials.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Setup Complete! 🎉</h1>
          <p className="text-muted-foreground mb-8">
            Your portfolio is ready to use. Don't forget to download your credentials.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="gradient"
              size="lg"
              onClick={downloadCredentials}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download Credentials
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = "/admin"}
            >
              Go to Admin Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Portfolio Setup</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Let's get your portfolio up and running in a few steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${i < currentStep ? "bg-primary text-primary-foreground" : 
                  i === currentStep ? "bg-primary/20 text-primary border-2 border-primary" : 
                  "bg-accent text-muted-foreground"}
              `}>
                {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < currentStep ? "bg-primary" : "bg-accent"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 0: Site Info */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Site Information</h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name *</label>
                      <input
                        type="text"
                        value={form.siteName}
                        onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                        placeholder="My Portfolio"
                        className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={form.siteDescription}
                        onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
                        placeholder="Full Stack Developer & UI Designer"
                        className="w-full h-20 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 1: Admin Account */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Admin Account</h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Username *</label>
                      <input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        placeholder="admin"
                        className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="hello@example.com"
                        className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password *</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          placeholder="Min 6 characters"
                          className="w-full h-10 pl-3 pr-10 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                        className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Credentials */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Key className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Your Credentials</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please save these credentials. You'll need them to log in to your admin dashboard.
                    </p>
                    <div className="p-4 rounded-xl bg-accent/50 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Username:</span>
                        <span className="font-medium">{form.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{form.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Password:</span>
                        <span className="font-medium font-mono">{form.password}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadCredentials}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download as .txt
                    </Button>
                  </div>
                )}

                {/* Step 3: Complete */}
                {currentStep === 3 && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-lg font-semibold">Setup Complete!</h2>
                    <p className="text-sm text-muted-foreground">
                      Your portfolio is being configured. Click complete to finish setup.
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                variant="gradient"
                onClick={handleNext}
                className="gap-2"
              >
                {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}