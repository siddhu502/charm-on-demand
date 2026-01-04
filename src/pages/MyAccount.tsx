import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";

const MyAccount = () => {
  // Mock data - in a real app this would come from authentication/database
  const downloads = [
    { id: 1, name: "10th Standard - Mathematics - First Term", date: "2025-01-02", status: "completed" },
    { id: 2, name: "10th Standard - Science - First Term", date: "2025-01-02", status: "completed" },
    { id: 3, name: "9th Standard - English - Unit Test", date: "2024-12-28", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              My <span className="gradient-text">Downloads</span>
            </h1>
            <p className="text-muted-foreground">
              Access all your purchased question papers
            </p>
          </div>

          {downloads.length > 0 ? (
            <div className="space-y-4 animate-fade-in-up">
              {downloads.map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-card rounded-xl p-5 shadow-md border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Download className="h-4 w-4 mr-2" />
                    Download Again
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border animate-fade-in-up">
              <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Downloads Yet</h3>
              <p className="text-muted-foreground mb-6">
                Your purchased question papers will appear here
              </p>
              <Button asChild>
                <a href="/">Browse Question Papers</a>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MyAccount;
