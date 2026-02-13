"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Sparkles, Building2, Rocket, GraduationCap, Star, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    text: "This platform was a game-changer. I found an internship that matched my exact skill set.",
    image: "/images/testimonial1.jpeg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Innovate Inc.",
    text: "As a startup founder, posting my idea here brought me a co-founder with technical skills I was missing.",
    image: "/images/testimonial2.jpeg"
  },
  {
    id: 3,
    name: "Sofia Rossi",
    role: "UI/UX Designer",
    text: "The quality of job advertisements is top-notch. I found a role at a design-focused company.",
    image: "/images/testimonial3.jpeg"
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="container mx-auto p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-primary to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200">
            NexusLink
          </span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-primary/5 font-medium">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white rounded-full px-6">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-primary/20 text-primary text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>The #1 Logic-Based Hiring Platform</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white"
            >
              Connecting <span className="text-primary relative inline-block">
                Ambition
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> <br className="hidden md:block" /> with Opportunity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-medium"
            >
              NexusLink bridges the gap between emerging talent and innovative companies.
              Showcase skills, share visions, and build the future together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/30 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Persona Section (Startup Style) */}
        <section className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You?</h2>
              <p className="text-muted-foreground text-lg">Choose your path and get started.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PersonaCard
                icon={GraduationCap}
                title="Student or Intern"
                desc="Showcase your skills, discover internships, and connect with companies."
                color="text-blue-600"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                href="/register?role=student"
              />
              <PersonaCard
                icon={Building2}
                title="Company"
                desc="Access a curated pool of top-tier talent and build your dream team."
                color="text-purple-600"
                bgColor="bg-purple-50 dark:bg-purple-900/20"
                href="/register?role=company"
              />
              <PersonaCard
                icon={Rocket}
                title="Startup Founder"
                desc="Share your vision, find co-founders, and connect with builders."
                color="text-amber-600"
                bgColor="bg-amber-50 dark:bg-amber-900/20"
                href="/register?role=startup"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Voices of Our Community</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <GlassCard key={t.id} className="p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-t-primary/50">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full object-cover border-2 border-primary/20" />
                    <div>
                      <h4 className="font-bold text-lg">{t.name}</h4>
                      <p className="text-sm text-primary font-medium">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 flex text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer/CTA */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your future?</h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">Join thousands of students, startups, and companies building the next big thing.</p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-white text-primary hover:bg-gray-100 shadow-2xl rounded-full font-bold">
                Join NexusLink Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-900 text-gray-400 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-sm">
          © 2026 NexusLink Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function PersonaCard({ icon: Icon, title, desc, color, bgColor, href }: any) {
  return (
    <Link href={href}>
      <GlassCard hoverEffect className="p-8 h-full flex flex-col items-center text-center cursor-pointer group hover:-translate-y-2 transition-transform duration-300">
        <div className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-6 ${bgColor} group-hover:scale-110 transition-transform`}>
          <Icon className={`h-10 w-10 ${color}`} />
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{desc}</p>
        <div className={`mt-auto text-sm font-bold ${color} flex items-center gap-2 group-hover:gap-3 transition-all`}>
          Explore <ArrowRight className="h-4 w-4" />
        </div>
      </GlassCard>
    </Link>
  )
}
