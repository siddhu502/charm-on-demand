import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border prose prose-lg max-w-none animate-fade-in-up">
            <h2 className="text-xl font-bold text-primary">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly, such as your name, email address, 
              phone number, and school/college name when you use our services.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information to provide and improve our services, process transactions, 
              send you study materials, and communicate with you about updates and offers.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell or rent your personal information to third parties. We may share 
              information with service providers who assist in our operations.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, or destruction.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal information. 
              Contact us at support@smartabhyas.com for any privacy-related requests.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at 
              support@smartabhyas.com.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;
