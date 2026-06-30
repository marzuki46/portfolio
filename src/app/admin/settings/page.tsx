"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Save, Palette, Globe, User, 
  Bell, Shield, Eye, Sun, Moon, Search,
  FileText, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Marzuki Portfolio",
    description: "Full Stack Developer & UI Designer",
    email: "hello@marzuki.dev",
    location: "Jakarta, Indonesia",
    social: {
      github: "https://github.com/marzuki",
      linkedin: "https://linkedin.com/in/marzuki",
      twitter: "https://twitter.com/marzuki",
    },
    theme: "system",
    language: "id",
    emailNotifications: true,
    publicProfile: true,
    // SEO Settings
    seo: {
      defaultTitle: "Marzuki — Full Stack Developer & UI Designer",
      titleTemplate: "%s | Marzuki Portfolio",
      defaultDescription: "Portfolio pribadi Marzuki, Full Stack Developer dengan passion di JavaScript, React, dan desain UI/UX modern.",
      defaultOgImage: "/og.jpg",
      siteUrl: "https://marzuki.dev",
      twitterHandle: "@marzuki",
      googleAnalyticsId: "",
      enableSitemap: true,
      enableRobots: true,
    },
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSeo = (key: string, value: string | boolean) => {
    setSettings({
      ...settings,
      seo: { ...settings.seo, [key]: value },
    });
  };

  const sections = [
    {
      icon: Globe,
      title: "Site Information",
      description: "Basic information about your portfolio site",
    },
    {
      icon: Search,
      title: "SEO Settings",
      description: "Search engine optimization configuration",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize the look and feel of your site",
    },
    {
      icon: User,
      title: "Profile",
      description: "Your personal and professional information",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio configuration
          </p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-1">
          {sections.map((section, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-accent transition-colors text-left"
            >
              <section.icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{section.title}</p>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Site Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Site Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <input
                      type="text"
                      value={settings.description}
                      onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* SEO Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">SEO Settings</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Title</label>
                      <input
                        type="text"
                        value={settings.seo.defaultTitle}
                        onChange={(e) => updateSeo("defaultTitle", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Title Template</label>
                      <input
                        type="text"
                        value={settings.seo.titleTemplate}
                        onChange={(e) => updateSeo("titleTemplate", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Use %s as placeholder for page title</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Default Description</label>
                      <textarea
                        value={settings.seo.defaultDescription}
                        onChange={(e) => updateSeo("defaultDescription", e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">OG Image URL</label>
                      <input
                        type="text"
                        value={settings.seo.defaultOgImage}
                        onChange={(e) => updateSeo("defaultOgImage", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Site URL</label>
                      <input
                        type="url"
                        value={settings.seo.siteUrl}
                        onChange={(e) => updateSeo("siteUrl", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter Handle</label>
                      <input
                        type="text"
                        value={settings.seo.twitterHandle}
                        onChange={(e) => updateSeo("twitterHandle", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                      <input
                        type="text"
                        value={settings.seo.googleAnalyticsId}
                        onChange={(e) => updateSeo("googleAnalyticsId", e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.seo.enableSitemap}
                        onChange={(e) => updateSeo("enableSitemap", e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">Enable Sitemap</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.seo.enableRobots}
                        onChange={(e) => updateSeo("enableRobots", e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">Enable Robots.txt</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Social Links</h2>
                </div>
                <div className="space-y-4">
                  {Object.entries(settings.social).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium mb-2 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setSettings({
                          ...settings,
                          social: { ...settings.social, [platform]: e.target.value },
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Preferences</h2>
                </div>
                <div className="space-y-4">
                  {/* Theme */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Sun className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Theme</p>
                        <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                      </div>
                    </div>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Language</p>
                        <p className="text-xs text-muted-foreground">Default site language</p>
                      </div>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm"
                    >
                      <option value="id">Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive email when someone contacts you</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    </label>
                  </div>

                  {/* Public Profile */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                    <div className="flex items-center gap-3">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Public Profile</p>
                        <p className="text-xs text-muted-foreground">Make your profile visible to everyone</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.publicProfile}
                        onChange={(e) => setSettings({ ...settings, publicProfile: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button (Bottom) */}
          <div className="flex justify-end">
            <Button
              variant="gradient"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {saved ? "Saved Successfully!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}