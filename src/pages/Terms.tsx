import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border prose prose-lg max-w-none animate-fade-in-up">
            <h2 className="text-xl font-bold text-primary">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Smart Abhyas, you accept and agree to be bound by these 
              Terms and Conditions. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">2. Use of Services</h2>
            <p className="text-muted-foreground">
              Our study materials are for personal educational use only. You may not redistribute, 
              resell, or share the materials commercially without written permission.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">3. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account information 
              and for all activities under your account.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, including question papers and study materials, is protected by 
              intellectual property rights and owned by Smart Abhyas.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">5. Payment Terms</h2>
            <p className="text-muted-foreground">
              All payments are processed securely through Razorpay. Prices are in Indian Rupees 
              and include applicable taxes.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Smart Abhyas is not liable for any indirect, incidental, or consequential damages 
              arising from the use of our services.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the 
              service constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Terms;
