"use client";

import { motion } from "framer-motion";
import { 
  Bell, ChevronDown, 
  TrendingUp, TrendingDown, Activity, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const statsCards = [
  { label: "Total Visitors", value: "12,340", change: "+12.5%", trend: "up", icon: Activity },
  { label: "Page Views", value: "45,678", change: "+8.2%", trend: "up", icon: TrendingUp },
  { label: "Bounce Rate", value: "24.5%", change: "-3.1%", trend: "down", icon: TrendingDown },
  { label: "Revenue", value: "Rp 2.4M", change: "+18.7%", trend: "up", icon: DollarSign },
];

const recentPosts = [
  { title: "Membangun Aplikasi Modern dengan Next.js 15", status: "Published", date: "2 days ago", views: 245 },
  { title: "Tips Meningkatkan Performa React Apps", status: "Published", date: "1 week ago", views: 189 },
  { title: "Desain UI/UX untuk Developer", status: "Draft", date: "3 days ago", views: 0 },
  { title: "Memahami TypeScript Generics", status: "Published", date: "2 weeks ago", views: 156 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Selamat datang kembali, Marzuki!</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            Marzuki
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statsCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.trend === "up" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-0.5">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Recent Posts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Posts</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-muted-foreground">Title</th>
                    <th className="text-left py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Views</th>
                    <th className="text-right py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="py-3 font-medium">{post.title}</td>
                      <td className="py-3 hidden sm:table-cell">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          post.status === "Published" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground hidden md:table-cell">{post.date}</td>
                      <td className="py-3 text-right">{post.views}</td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <Button variant="gradient">+ New Blog Post</Button>
        <Button variant="outline">+ New Project</Button>
        <Button variant="outline">View Messages</Button>
      </motion.div>
    </div>
  );
}