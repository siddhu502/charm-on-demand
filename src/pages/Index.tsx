import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainForm from '@/components/MainForm';
import ContentSections from '@/components/ContentSections';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ScrollToTop from '@/components/ScrollToTop';
import { GraduationCap, BookOpen, Award, Users } from 'lucide-react';
const stats = [{
  icon: GraduationCap,
  value: "50,000+",
  label: "Students Helped",
  color: "bg-primary/10 text-primary"
}, {
  icon: BookOpen,
  value: "1,000+",
  label: "Question Papers",
  color: "bg-accent/10 text-accent"
}, {
  icon: Award,
  value: "21+",
  label: "Subjects Covered",
  color: "bg-success/10 text-success"
}, {
  icon: Users,
  value: "500+",
  label: "Schools Trust Us",
  color: "bg-warning/10 text-warning"
}];
const Index = () => {
  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      document.querySelectorAll('.card-animated').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animated');
        }, 100 * index);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4">
                <span className="gradient-text">Smart Shikshan</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Your Complete Exam Preparation Partner
              </p>
              <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                Access quality question papers and study materials for all standards and subjects
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 animate-fade-in-up" style={{
            animationDelay: '200ms'
          }}>
              {stats.map((stat, index) => {
              const Icon = stat.icon;
              return;
            })}
            </div>

            {/* Main Form */}
            <MainForm />
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ContentSections />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </div>;
};
export default Index;