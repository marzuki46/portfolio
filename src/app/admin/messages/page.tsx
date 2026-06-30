"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Trash2, Mail, Star,
  Reply, Archive, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: string;
  read: boolean;
  starred: boolean;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("id-ID", { month: "short", day: "numeric" });
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Gagal mengambil pesan");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      setError("Gagal memuat pesan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.subject?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" ||
      (filter === "unread" && !msg.read) ||
      (filter === "starred" && msg.starred);
    return matchesSearch && matchesFilter;
  });

  const markAsRead = async (id: number) => {
    try {
      await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const toggleStar = async (id: number) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    try {
      await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, starred: !msg.starred }),
      });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, starred: !msg.starred } : msg))
      );
    } catch (err) {
      console.error("Error toggling star:", err);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-destructive">{error}</p>
        <Button variant="outline" onClick={fetchMessages}>Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages are read"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-1">
            {(["all", "unread", "starred"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-muted-foreground"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "unread" && unreadCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-primary-foreground text-primary">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              {/* Search */}
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  />
                </div>
              </div>

              {/* Message Items */}
              <div className="divide-y divide-border max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No messages found.
                  </div>
                ) : (
                  filteredMessages.map((msg, i) => (
                    <motion.button
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.read) markAsRead(msg.id);
                      }}
                      className={`w-full text-left p-3 hover:bg-accent/50 transition-colors ${
                        selectedMessage?.id === msg.id ? "bg-accent" : ""
                      } ${!msg.read ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          !msg.read
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-muted-foreground"
                        }`}>
                          {msg.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-sm truncate ${!msg.read ? "font-semibold" : ""}`}>
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0">
                              {formatDate(msg.createdAt)}
                            </span>
                          </div>
                          <p className={`text-xs truncate ${!msg.read ? "font-medium" : "text-muted-foreground"}`}>
                            {msg.subject || "(No subject)"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {msg.message.substring(0, 60)}...
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(msg.id);
                            }}
                            className="cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation();
                                toggleStar(msg.id);
                              }
                            }}
                          >
                            <Star
                              className={`w-3 h-3 ${
                                msg.starred
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <CardContent className="p-6">
                    {/* Actions */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleStar(selectedMessage.id)}>
                          <Star className={`w-4 h-4 mr-1 ${
                            selectedMessage.starred ? "text-yellow-500 fill-yellow-500" : ""
                          }`} />
                          {selectedMessage.starred ? "Starred" : "Star"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteMessage(selectedMessage.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    {/* Message Content */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {selectedMessage.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-1">{selectedMessage.subject || "(No subject)"}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{selectedMessage.name}</span>
                          <span>•</span>
                          <span>{selectedMessage.email}</span>
                          <span>•</span>
                          <span>{new Date(selectedMessage.createdAt).toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/50">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>

                    {/* Quick Reply */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">Quick Reply</label>
                      <textarea
                        rows={3}
                        placeholder="Type your reply..."
                        className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                      />
                      <div className="flex justify-end mt-3">
                        <Button variant="gradient" size="sm">
                          <Reply className="w-4 h-4 mr-1" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[300px] flex items-center justify-center"
              >
                <Card className="w-full">
                  <CardContent className="p-12 text-center">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a message</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a message from the left panel to read and reply.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}