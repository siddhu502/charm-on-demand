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

          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border prose prose-lg max-w-none animate-fade-in-up space-y-6">
            <div>
              <h2 className="text-xl font-bold text-primary">1. Introduction</h2>
              <p className="text-muted-foreground">
                Smart Shikshan ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our website and services for downloading educational 
                question papers and study materials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-2">We collect the following information when you use our services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Personal Information:</strong> Name, email address, phone number</li>
                <li><strong>Educational Information:</strong> School/college name, class/standard</li>
                <li><strong>Payment Information:</strong> Transaction details processed through Razorpay (we do not store card details)</li>
                <li><strong>Usage Data:</strong> Download history, subjects selected, papers accessed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>To provide and deliver question papers and study materials</li>
                <li>To process payments and transactions</li>
                <li>To add watermarks on downloaded PDFs for copyright protection</li>
                <li>To communicate about your orders, updates, and promotional offers</li>
                <li>To improve our services and user experience</li>
                <li>To prevent fraud and ensure security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">4. PDF Watermarking</h2>
              <p className="text-muted-foreground">
                All downloaded PDFs are watermarked with your school/college name for copyright 
                protection and to prevent unauthorized distribution. This helps us protect our 
                content creators and maintain the integrity of our educational materials.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">5. Information Sharing</h2>
              <p className="text-muted-foreground mb-2">We do not sell, trade, or rent your personal information. We may share information with:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Payment Processors:</strong> Razorpay for secure payment processing</li>
                <li><strong>Service Providers:</strong> Third parties who assist in our operations</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures including encryption, secure servers, 
                and regular security assessments to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to provide our 
                services and comply with legal obligations. Download records are kept for 
                reference and customer support purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">8. Your Rights</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of promotional communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">9. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We may use cookies and similar technologies to enhance your experience, 
                analyze usage patterns, and personalize content. You can control cookie 
                preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">10. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are intended for students of all ages. For users under 18, 
                we recommend parental supervision. We do not knowingly collect personal 
                information from children without parental consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">11. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of 
                any changes by posting the new policy on this page and updating the "Last 
                updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions or concerns about this Privacy Policy or our data 
                practices, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Email:</strong> support@smartshikshan.com<br />
                <strong>WhatsApp:</strong> Available on our website
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;
