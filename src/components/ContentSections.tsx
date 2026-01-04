import { useEffect, useRef } from "react";
import { 
  CheckCircle, 
  Star, 
  FileText, 
  BookOpen, 
  Calculator, 
  Atom, 
  FlaskConical, 
  Globe, 
  Landmark,
  Languages,
  Palette,
  Music,
  Computer,
  TrendingUp,
  Scale,
  Building2,
  BookMarked,
  GraduationCap
} from "lucide-react";

const subjects = [
  { name: "Marathi", icon: Languages },
  { name: "Hindi", icon: Languages },
  { name: "English", icon: BookOpen },
  { name: "Sanskrit", icon: BookMarked },
  { name: "German", icon: Languages },
  { name: "History", icon: Landmark },
  { name: "Geography", icon: Globe },
  { name: "Political Science", icon: Scale },
  { name: "Economics", icon: TrendingUp },
  { name: "Commerce", icon: Building2 },
  { name: "Book Keeping", icon: Calculator },
  { name: "OC/SP", icon: FileText },
  { name: "Mathematics", icon: Calculator },
  { name: "Science", icon: FlaskConical },
  { name: "Physics", icon: Atom },
  { name: "Chemistry", icon: FlaskConical },
  { name: "Biology", icon: GraduationCap },
  { name: "Art", icon: Palette },
  { name: "Music", icon: Music },
  { name: "Computer Science", icon: Computer },
  { name: "Physical Education", icon: GraduationCap },
];

const ContentSections = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            
            // Animate list items within the section
            const listItems = entry.target.querySelectorAll(".feature-list li");
            listItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animated");
              }, 100 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = sectionsRef.current?.querySelectorAll(".feature-section, .subject-item");
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionsRef} className="space-y-8">
      {/* Exams Covered */}
      <section className="feature-section card-animated">
        <h3>
          <CheckCircle className="h-6 w-6" />
          Exams Covered
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="feature-list space-y-1">
            <li><CheckCircle className="h-4 w-4 text-success" /> Unit Test Exam</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> First Term Exam</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> Prelim/Practice Exam</li>
          </ul>
          <ul className="feature-list space-y-1">
            <li><CheckCircle className="h-4 w-4 text-success" /> Second Term Exam</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> Internal Evaluation Exam</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> Chapter Test Questions & Answers</li>
          </ul>
        </div>
      </section>

      {/* Additional Study Material */}
      <section className="feature-section card-animated">
        <h3>
          <BookOpen className="h-6 w-6" />
          Additional Study Material
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="feature-list space-y-1">
            <li><CheckCircle className="h-4 w-4 text-success" /> PCMB MCQ Test and Answer Keys</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> PCMB IMP Formulae & Smart Notes</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> PCMB Chapter Solutions</li>
          </ul>
          <ul className="feature-list space-y-1">
            <li><CheckCircle className="h-4 w-4 text-success" /> MHT-CET Preparation Material</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> Scholarship Exam Papers & Answer Keys</li>
            <li><CheckCircle className="h-4 w-4 text-success" /> Competitive Exam Papers</li>
          </ul>
        </div>
      </section>

      {/* Smart Question Paper Title */}
      <div className="text-center py-8">
        <h2 className="text-3xl md:text-4xl font-bold font-heading">
          <span className="gradient-text">Smart Question Paper</span>
        </h2>
        <p className="text-muted-foreground mt-2">Everything you need for exam success</p>
      </div>

      {/* Why Choose Smart Question Papers */}
      <section className="feature-section card-animated">
        <h3>
          <Star className="h-6 w-6" />
          Why Choose Smart Question Papers
        </h3>
        <ul className="feature-list space-y-1">
          <li><Star className="h-4 w-4 text-warning" /> Expert-Curated Content</li>
          <li><Star className="h-4 w-4 text-warning" /> Updated with Latest Format</li>
          <li><Star className="h-4 w-4 text-warning" /> Comprehensive Coverage</li>
          <li><Star className="h-4 w-4 text-warning" /> Quality Assured Study Material</li>
        </ul>
      </section>

      {/* Smart Abhyas Features */}
      <section className="feature-section card-animated">
        <h3>
          <GraduationCap className="h-6 w-6" />
          Smart Abhyas Features
        </h3>
        <ul className="feature-list space-y-1">
          <li><Star className="h-4 w-4 text-accent" /> Interactive Learning Format</li>
          <li><Star className="h-4 w-4 text-accent" /> Detailed Solutions</li>
          <li><Star className="h-4 w-4 text-accent" /> Performance Analytics</li>
          <li><Star className="h-4 w-4 text-accent" /> Practice Exercises</li>
          <li><Star className="h-4 w-4 text-accent" /> Annual Planner</li>
        </ul>
      </section>

      {/* Additional Exam Papers */}
      <section className="feature-section card-animated">
        <h3>
          <FileText className="h-6 w-6" />
          Additional Exam Papers
        </h3>
        <ul className="feature-list space-y-1">
          <li><FileText className="h-4 w-4 text-primary" /> 10th Standard Question Papers</li>
          <li><FileText className="h-4 w-4 text-primary" /> MHT-CET Preparation Materials</li>
          <li><FileText className="h-4 w-4 text-primary" /> Competitive Exam Question Papers</li>
          <li><FileText className="h-4 w-4 text-primary" /> Scholarship Exam Materials</li>
        </ul>
      </section>

      {/* Available Subjects */}
      <section className="feature-section card-animated">
        <h3>
          <BookMarked className="h-6 w-6" />
          Available Subjects
        </h3>
        <div className="subject-grid mt-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <div 
                key={subject.name} 
                className="subject-item"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium text-center mt-2">{subject.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ContentSections;
