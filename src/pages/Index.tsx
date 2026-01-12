import { Header } from '@/components/Header';
import { TerminalAnimation } from '@/components/TerminalAnimation';
import { BentoGrid } from '@/components/BentoGrid';
import { ProjectWall } from '@/components/ProjectWall';
import { BlogSection } from '@/components/BlogSection';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-20"
      >
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">Software</span>
            <br />
            <span className="text-foreground">Engineer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Crafting elegant solutions to complex problems through code and creativity.
          </p>
        </div>

        <div className="w-full max-w-2xl mb-12 animate-fade-in animation-delay-200">
          <TerminalAnimation />
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="animate-bounce text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </section>

      {/* About / Bento Grid Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A snapshot of my developer journey, skills, and what I bring to the table.
            </p>
          </div>

          <BentoGrid />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Project Wall</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A collection of my open-source projects, experiments, and contributions.
            </p>
          </div>

          <ProjectWall />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Latest Posts</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Thoughts, tutorials, and insights from my development journey.
            </p>
          </div>

          <BlogSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} negoro26. Built with{' '}
            <span className="text-primary">♥</span> and lots of coffee.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
