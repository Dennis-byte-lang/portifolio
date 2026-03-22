"use client";

import { usePathname } from "next/navigation";
import { MessageSquare, Send, X } from "lucide-react";
import { useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export function ChatAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi, I am Dennis' portfolio assistant. Ask about projects, stack, or availability." },
  ]);

  if (pathname.startsWith("/admin")) return null;

  async function sendMessage() {
    const message = input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply || "I can help with portfolio questions." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Network issue. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium shadow-premium"
          aria-label="Open assistant"
        >
          <MessageSquare className="size-4" /> Assistant
        </button>
      )}

      {open && (
        <div className="glass w-[min(92vw,360px)] rounded-2xl border p-4 shadow-premium">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Portfolio Assistant</p>
            <button type="button" onClick={() => setOpen(false)} className="rounded-md border p-1" aria-label="Close assistant">
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-64 space-y-2 overflow-auto pr-1 text-sm">
            {messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`rounded-xl px-3 py-2 ${msg.role === "assistant" ? "bg-surface" : "bg-brand text-white"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Ask a question..."
              className="w-full rounded-xl border bg-surface px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading}
              className="rounded-xl bg-brand px-3 py-2 text-white disabled:opacity-70"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
