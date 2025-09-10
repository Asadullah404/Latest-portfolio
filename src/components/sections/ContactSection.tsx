import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "muhammad.asadullah.suhail@gmail.com",
      href: "mailto:muhammad.asadullah.suhail@gmail.com",
      color: "stellar-blue",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "0302-2111051",
      href: "tel:+923022111051",
      color: "stellar-purple",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "muhammad-asadullah",
      href: "https://linkedin.com/in/muhammad-asadullah-b97271364",
      color: "stellar-cyan",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pakistan",
      href: "#",
      color: "stellar-pink",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mqazyago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-stellar rounded-full opacity-10 animate-float blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-gradient-aurora rounded-full opacity-10 animate-float-delayed blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Let’s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project, idea, or just want to say hi? I’m always open to new
            opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl hover:shadow-2xl transition-all duration-500">
              <h3 className="text-2xl font-bold mb-8 gradient-text">
                Get in Touch
              </h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      contact.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, x: 8 }}
                  >
                    <div className="p-3 rounded-lg bg-gradient-stellar glow group-hover:rotate-6 transition-transform">
                      <contact.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {contact.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contact.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass p-8 rounded-2xl space-y-6 hover:shadow-2xl transition-all duration-500"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Send a Message
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="focus:ring-2 focus:ring-primary"
                />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="focus:ring-2 focus:ring-primary"
                />
              </div>

              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What’s this about?"
                className="focus:ring-2 focus:ring-primary"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, ideas, or just say hello!"
                rows={6}
                required
                className="focus:ring-2 focus:ring-primary"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full glow group relative overflow-hidden"
                disabled={status === "loading"}
              >
                <motion.div
                  animate={{
                    rotate: status === "loading" ? 360 : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: status === "loading" ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-sm text-center"
                >
                  ✅ Message sent successfully!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  ❌ Something went wrong. Try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass p-8 rounded-2xl">
            <p className="text-muted-foreground mb-4">
              © 2024 Muhammad Asadullah Sohail. React +
              Tailwind.
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: August 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
