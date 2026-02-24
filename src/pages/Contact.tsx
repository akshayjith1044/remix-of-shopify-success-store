import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Instagram, Send } from "lucide-react";
import { toast } from "sonner";

const socials = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/emmigoexpress", handle: "@emmigoexpress" },
  { name: "TikTok", icon: Send, url: "https://tiktok.com/@emmigoexpress", handle: "@emmigoexpress" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    // Simulate send — replace with real endpoint later
    setTimeout(() => {
      toast.success("Message sent!", { description: "We'll get back to you within 24 hours.", position: "top-center" });
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-16 max-w-xl">
          <div className="text-center mb-10">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Contact Us</h1>
            <p className="text-sm text-muted-foreground font-body">Have a question? We'd love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4 mb-8">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block font-body">Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-secondary/30 border-border"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block font-body">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="bg-secondary/30 border-border"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block font-body">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                className="bg-secondary/30 border-border min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={sending}>
              <Mail className="h-4 w-4 mr-2" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Social links */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-medium text-muted-foreground mb-4 font-body uppercase tracking-wider">Follow Us</p>
            <div className="grid gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-display font-semibold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{s.handle}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
