import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AlertTriangle, XCircle, FileText, Mail } from "lucide-react";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Refund <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="space-y-6 animate-fade-in-up">
            {/* No Refund Notice */}
            <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-6 flex gap-4">
              <AlertTriangle className="h-8 w-8 text-destructive shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-destructive text-xl mb-2">No Refund Policy</h3>
                <p className="text-foreground font-medium">
                  Due to the digital nature of our products (downloadable PDF question papers and 
                  study materials), <strong>all sales are final and no refunds will be provided</strong> once 
                  the purchase is completed.
                </p>
              </div>
            </div>

            {/* Why No Refunds */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Why No Refunds?</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  <span><strong>Digital Products:</strong> Once downloaded, digital content cannot be returned or "un-downloaded"</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  <span><strong>Instant Access:</strong> You get immediate access to the content upon successful payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  <span><strong>Watermarked Content:</strong> All PDFs are personalized with your institution's watermark</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  <span><strong>Content Verification:</strong> Product descriptions and previews are provided before purchase</span>
                </li>
              </ul>
            </div>

            {/* What This Means */}
            <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6">
              <h3 className="font-bold text-foreground mb-3">What This Means For You:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Please review the product details carefully before making a purchase</li>
                <li>• Ensure you have selected the correct class, subject, and paper type</li>
                <li>• Verify your school/college name as it will be watermarked on the PDF</li>
                <li>• Check your email and phone number for order confirmation</li>
                <li>• Make sure you have a stable internet connection for downloading</li>
              </ul>
            </div>

            {/* Exceptions - Technical Issues Only */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Technical Issues</h2>
              <p className="text-muted-foreground mb-4">
                In rare cases of technical issues where:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• Payment was charged but download link was not provided</li>
                <li>• The downloaded file is corrupted or empty</li>
                <li>• Wrong product was delivered due to system error</li>
              </ul>
              <p className="text-muted-foreground">
                We will either provide the correct download or issue store credit. Please contact 
                us within <strong>24 hours</strong> of purchase with your order details.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-primary">Contact For Technical Issues</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you experience any technical issues with your purchase, please contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Email: <a href="mailto:support@smartshikshan.com" className="text-primary hover:underline">support@smartshikshan.com</a></li>
                <li>• Include your order ID, email, and detailed description of the issue</li>
                <li>• Response time: Within 24-48 hours</li>
              </ul>
            </div>

            {/* Agreement */}
            <div className="bg-muted/50 rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">
                By making a purchase on Smart Shikshan, you acknowledge that you have read, 
                understood, and agree to this No Refund Policy.
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

export default Refund;