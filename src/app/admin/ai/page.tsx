"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Settings, Cpu, Save, RefreshCw, FileText,
  FolderKanban, CheckCircle2, XCircle, Loader2, Eye, EyeOff,
  Zap, Sliders, Globe, ToggleLeft, Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AiConfig {
  provider: string;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
  autoPost: boolean;
}

interface GenerateForm {
  sourceType: "blog" | "project";
  prompt: string;
  title?: string;
  keywords?: string;
}

export default function AdminAIContent() {
  const [activeTab, setActiveTab] = useState<"settings" | "generate">("settings");
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");

  const [config, setConfig] = useState<AiConfig>({
    provider: "openai",
    apiKey: "",
    model: "gpt-4",
    maxTokens: 2048,
    temperature: 0.7,
    enabled: false,
    autoPost: false,
  });

  const [generateForm, setGenerateForm] = useState<GenerateForm>({
    sourceType: "blog",
    prompt: "",
    title: "",
    keywords: "",
  });

  const saveSettings = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveSettings", config }),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const generateContent = async () => {
    if (!generateForm.prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setGenerating(true);
    setError("");
    setGeneratedContent("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          config,
          form: generateForm,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();
      setGeneratedContent(data.content);
    } catch (err) {
      setError("Failed to generate content. Check your API key and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const saveGenerated = async () => {
    if (!generatedContent) return;
    setSaving(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveGenerated",
          content: generatedContent,
          form: generateForm,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setGeneratedContent("");
      setGenerateForm({ ...generateForm, prompt: "", title: "" });
      alert("Content saved successfully!");
    } catch (err) {
      setError("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Content Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate blog posts and project descriptions with AI
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-1">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === "settings"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </div>
        </button>
        <button
          onClick={() => setActiveTab("generate")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === "generate"
              ? "bg-primary/10 text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Generate
          </div>
        </button>
      </div>

      {activeTab === "settings" ? (
        /* Settings Tab */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* API Configuration */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">API Configuration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Provider</label>
                  <select
                    value={config.provider}
                    onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google Gemini</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <select
                    value={config.model}
                    onChange={(e) => setConfig({ ...config, model: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3">Claude 3</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">API Key</label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={config.apiKey}
                      onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                      placeholder="sk-..."
                      className="w-full h-10 pl-3 pr-10 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generation Parameters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Generation Parameters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Tokens: {config.maxTokens}
                  </label>
                  <input
                    type="range"
                    min="256"
                    max="4096"
                    step="256"
                    value={config.maxTokens}
                    onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>256</span>
                    <span>4096</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Temperature: {config.temperature.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-2">
                      <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Enable AI</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Auto Post</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.autoPost}
                      onChange={(e) => setConfig({ ...config, autoPost: e.target.checked })}
                      className="toggle"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              variant="gradient"
              onClick={saveSettings}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saved ? "Saved!" : "Save Settings"}
            </Button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600">
              {error}
            </div>
          )}
        </motion.div>
      ) : (
        /* Generate Tab */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Generate Content</h2>
              </div>

              <div className="space-y-4">
                {/* Content Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setGenerateForm({ ...generateForm, sourceType: "blog" })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                        generateForm.sourceType === "blog"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Blog Post
                    </button>
                    <button
                      onClick={() => setGenerateForm({ ...generateForm, sourceType: "project" })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                        generateForm.sourceType === "project"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <FolderKanban className="w-4 h-4" />
                      Project
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title (optional)</label>
                  <input
                    type="text"
                    value={generateForm.title || ""}
                    onChange={(e) => setGenerateForm({ ...generateForm, title: e.target.value })}
                    placeholder="Enter a title for your content"
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium mb-2">Keywords (optional)</label>
                  <input
                    type="text"
                    value={generateForm.keywords || ""}
                    onChange={(e) => setGenerateForm({ ...generateForm, keywords: e.target.value })}
                    placeholder="e.g. Next.js, TypeScript, Web Development"
                    className="w-full h-10 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Prompt */}
                <div>
                  <label className="block text-sm font-medium mb-2">Prompt *</label>
                  <textarea
                    value={generateForm.prompt}
                    onChange={(e) => setGenerateForm({ ...generateForm, prompt: e.target.value })}
                    placeholder="Describe what you want to write about..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  variant="gradient"
                  onClick={generateContent}
                  disabled={generating || !generateForm.prompt.trim()}
                  className="gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h2 className="text-lg font-semibold">Generated Content</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={saveGenerated}
                        disabled={saving}
                        className="gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGeneratedContent("")}
                        className="gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Discard
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="p-4 rounded-xl bg-accent/50 whitespace-pre-wrap text-sm">
                      {generatedContent}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600">
              {error}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}