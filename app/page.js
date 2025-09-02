'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink, Play, BarChart3, Gamepad2, Zap, User, GraduationCap, Award, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const TypingAnimation = () => {
  // Pre-corrected titles with proper grammar
  const titles = [
    'I am a game developer',
    'I am a data analyst', 
    'I am a student',
    'I am an IITian',
    'I am a computer science enthusiast',
    'I am an AI automator',
    'I am a leader'
  ]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]
    
    if (isTyping) {
      if (currentText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentTitle.slice(0, currentText.length + 1))
        }, 80) // 80ms per character typing speed (faster)
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, pause for 1200ms then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1200) // 1.2 second pause after completing title
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50) // 50ms per character deletion speed (faster than typing)
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next title in continuous loop
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
        setIsTyping(true)
      }
    }
  }, [currentText, isTyping, currentTitleIndex, titles])

  // Cursor blink effect (530ms interval for natural blink)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-lg md:text-xl lg:text-2xl font-light text-cyan-300 min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem]">
      {currentText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1`}>|</span>
    </div>
  )
}

const ProjectCard = ({ title, description, tech, link, isLive = false, image }) => (
  <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 ease-in-out group">
    <div className="relative overflow-hidden rounded-t-lg">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {isLive && (
        <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">
          <Play className="w-3 h-3 mr-1" />
          Live Demo
        </Badge>
      )}
    </div>
    <CardHeader>
      <CardTitle className="text-xl text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">{title}</CardTitle>
      <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, idx) => (
          <Badge key={idx} variant="secondary" className="bg-slate-700 text-slate-200 group-hover:bg-slate-600 transition-colors duration-300">
            {t}
          </Badge>
        ))}
      </div>
      {link && (
        <Button asChild className="bg-cyan-600 hover:bg-cyan-700 hover:scale-105 transition-all duration-300">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            {isLive ? 'Try Demo' : 'View Project'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
    </CardContent>
  </Card>
)

const SkillCard = ({ skill, icon: Icon, category }) => (
  <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:bg-slate-700/60 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300 ease-out cursor-pointer">
    {/* Glow effect overlay */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Content */}
    <div className="relative flex items-center space-x-3">
      <div className="flex-shrink-0 p-2 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
        <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 group-hover:drop-shadow-lg transition-all duration-300" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors duration-300">{skill}</h4>
        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{category}</p>
      </div>
    </div>
    
    {/* Bottom glow line */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
)

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Cinematic loading sequence
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-cyan-300">Ziyan Solanki</div>
            <div className="hidden md:flex space-x-6">
              {['About', 'Projects', 'ZNS Nexus', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1597733336794-12d05021d510')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} max-w-4xl px-4`}>
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Ziyan Solanki
          </h1>
          
          {/* Static Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Passionate about AI-driven workflow automation, prompt engineering, and game development. 
            Building innovative solutions with modern technologies in Computer Science.
          </p>
          
          {/* Typing Animation */}
          <div className="mb-8">
            <TypingAnimation />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline" 
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 px-8 py-3 text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Get In Touch
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-300" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50 hover:bg-slate-900/60 transition-all duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12 hover:text-cyan-200 transition-colors duration-300">About Me</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-slate-300 mb-8 leading-relaxed hover:text-slate-200 transition-colors duration-300">
              I'm a versatile Computer Science student and creative technologist, pursuing dual bachelor's programs 
              at TCET Mumbai & IIT Patna. I specialize in AI workflow automation, game development, and data analytics, 
              bringing innovative solutions to complex problems across multiple domains.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed hover:text-slate-300 transition-colors duration-300">
              Through ZNS Nexus, I've partnered with multiple clients, delivering comprehensive creative and technical services 
              ranging from AI automation systems to professional video editing and graphic design.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* FlavorFlow - Live Demo */}
            <ProjectCard
              title="FlavorFlow AI"
              description="AI-powered recipe assistant that helps users discover, create, and customize recipes based on their preferences and dietary requirements."
              tech={['AI', 'Recipe Generation', 'Natural Language Processing']}
              link="https://flavorflow-ai.vercel.app/"
              isLive={true}
              image="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
            />

            {/* Calendar Management AI - Placeholder */}
            <ProjectCard
              title="Calendar Management AI"
              description="Intelligent calendar automation system that schedules meetings, manages conflicts, and optimizes time allocation using advanced AI algorithms."
              tech={['AI Automation', 'Calendar APIs', 'Natural Language Processing']}
              image="https://images.pexels.com/photos/8728559/pexels-photo-8728559.jpeg"
            />

            {/* Client Automation System - Placeholder */}
            <ProjectCard
              title="Client Automation System"
              description="Comprehensive automation platform for client management, featuring automated communication, task scheduling, and performance analytics."
              tech={['Automation', 'CRM Integration', 'Analytics Dashboard']}
              image="https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5"
            />

            {/* Nightmare Saga - Placeholder */}
            <ProjectCard
              title="Nightmare Saga: Dream 1"
              description="An immersive game development project featuring atmospheric storytelling, complex mechanics, and innovative gameplay elements."
              tech={['Game Development', 'Unity', 'C#', 'Game Design']}
              image="https://images.pexels.com/photos/2422556/pexels-photo-2422556.jpeg"
            />

            {/* Data Analytics Dashboard - Placeholder */}
            <ProjectCard
              title="Data Analytics Dashboard"
              description="Interactive visualization platform built with modern analytics tools, providing insights through dynamic charts and real-time data processing."
              tech={['Excel', 'IBM Cognos', 'Google Looker Studio', 'Data Visualization']}
              image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            />

          </div>
        </div>
      </section>

      {/* ZNS Nexus Section */}
      <section id="zns-nexus" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">ZNS Nexus</h2>
          <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
            Creative and technical partnership solutions demonstrating versatility across multiple client needs and industries.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Client 1 */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  Tuition Institute Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Creative Services</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Professional video editing and production</li>
                      <li>• Custom graphic design and branding</li>
                      <li>• Engaging thumbnail design for digital content</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">AI Automation</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Automated monthly fee reminder system</li>
                      <li>• Parent communication management</li>
                      <li>• Administrative workflow optimization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client 2 */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300 flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Fashion Short Film Series
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Post-Production Excellence</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Complete first-cut editing for each episode</li>
                      <li>• Professional audio refinement and mixing</li>
                      <li>• Color grading and visual enhancement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Creative Standards</h4>
                    <ul className="text-slate-300 space-y-1">
                      <li>• Professional storytelling for short-format content</li>
                      <li>• Structure, precision, and innovation focus</li>
                      <li>• Creative media production excellence</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Technical Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Technical Skills
              </h3>
              <div className="grid gap-4">
                <SkillCard skill="Python" icon={Zap} category="Programming Language" />
                <SkillCard skill="C++" icon={Zap} category="Programming Language" />
                <SkillCard skill="N8n" icon={Zap} category="Automation Platform" />
                <SkillCard skill="AI Agents" icon={Zap} category="Artificial Intelligence" />
                <SkillCard skill="Excel" icon={BarChart3} category="Data Analysis" />
                <SkillCard skill="IBM Cognos" icon={BarChart3} category="Business Intelligence" />
                <SkillCard skill="Google Looker Studio" icon={BarChart3} category="Data Visualization" />
                <SkillCard skill="Game Design" icon={Gamepad2} category="Interactive Media" />
              </div>
            </div>

            {/* Leadership & Soft Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-300 mb-8 flex items-center">
                <User className="w-6 h-6 mr-3" />
                Leadership & Soft Skills
              </h3>
              <div className="grid gap-4">
                <SkillCard skill="Leadership" icon={User} category="Team Management" />
                <SkillCard skill="Problem Solving" icon={User} category="Critical Thinking" />
                <SkillCard skill="Entrepreneurship" icon={User} category="Business Development" />
                <SkillCard skill="Client Management" icon={User} category="Relationship Building" />
                <SkillCard skill="Project Management" icon={User} category="Organizational" />
                <SkillCard skill="Innovation" icon={User} category="Creative Strategy" />
                <SkillCard skill="Strategic Planning" icon={User} category="Vision & Execution" />
                <SkillCard skill="Communication" icon={User} category="Interpersonal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Education & Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Education */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-200">Bachelor's in Computer Science</h4>
                    <p className="text-slate-300">TCET Mumbai</p>
                    <p className="text-slate-400 text-sm">Ongoing</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Bachelor's in Computer Science</h4>
                    <p className="text-slate-300">IIT Patna</p>
                    <p className="text-slate-400 text-sm">Ongoing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-200">IBM Data Analyst Professional Certificate</h4>
                    <p className="text-slate-300">IBM</p>
                    <p className="text-slate-400 text-sm">In Progress</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Virtual Experience Programs</h4>
                    <p className="text-slate-300">Multiple Industry Partners</p>
                    <p className="text-slate-400 text-sm">Completed Various Programs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-cyan-300 mb-12">Let's Connect</h2>
          
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-slate-300 mb-8">
              Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Button asChild className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30">
                <Link href="mailto:ziyan@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                </Link>
              </Button>
              
              <Button asChild className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30">
                <Link href="https://linkedin.com/in/ziyansolanki" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              
              <Button asChild className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30">
                <Link href="https://github.com/ZiyanSolanki" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3">
                Job Opportunities
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                Freelance Work
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                Collaborations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 Ziyan Solanki. Built with Next.js and passion for innovation.
          </p>
        </div>
      </footer>
    </div>
  )
}