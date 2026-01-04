import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { BookOpen, Target, Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              About <span className="gradient-text">Smart Abhyas</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering students with quality education resources since 2020
            </p>
          </div>

          {/* Story */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in-up">
              <h2 className="text-2xl font-bold font-heading mb-4 text-primary">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Smart Abhyas was founded with a simple mission: to make quality exam preparation accessible 
                to every student. We understand the challenges students face in finding reliable study 
                materials and question papers.
              </p>
              <p className="text-muted-foreground">
                Our team of experienced educators and technologists work together to create comprehensive, 
                up-to-date question papers and study materials that help students excel in their exams.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Target, title: "Our Mission", desc: "To provide accessible, quality education resources to every student" },
              { icon: Users, title: "Student First", desc: "Everything we do is designed with students' success in mind" },
              { icon: Award, title: "Quality Assured", desc: "All materials are curated and verified by expert educators" },
              { icon: Heart, title: "Passion Driven", desc: "We're passionate about making a difference in education" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-card rounded-2xl p-6 shadow-md border border-border text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50,000+", label: "Students" },
                { value: "500+", label: "Schools" },
                { value: "21", label: "Subjects" },
                { value: "5+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
