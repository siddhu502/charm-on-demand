import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

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
            {/* Important Notice */}
            <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="h-6 w-6 text-warning shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-2">Important Notice</h3>
                <p className="text-muted-foreground">
                  Due to the digital nature of our products (downloadable PDFs), all sales are 
                  generally considered final once the download has been initiated.
                </p>
              </div>
            </div>

            {/* Eligible for Refund */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-success" />
                <h2 className="text-xl font-bold text-success">Eligible for Refund</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1 shrink-0" />
                  Technical issues preventing download (within 24 hours of purchase)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1 shrink-0" />
                  Wrong product delivered due to system error
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1 shrink-0" />
                  Duplicate payment for the same product
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1 shrink-0" />
                  Product significantly different from description
                </li>
              </ul>
            </div>

            {/* Not Eligible */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-destructive" />
                <h2 className="text-xl font-bold text-destructive">Not Eligible for Refund</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  Change of mind after successful download
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  Failure to read product description before purchase
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  Requests made after 7 days of purchase
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-1 shrink-0" />
                  Free products or promotional items
                </li>
              </ul>
            </div>

            {/* How to Request */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-xl font-bold text-primary mb-4">How to Request a Refund</h2>
              <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                <li>Email us at <a href="mailto:support@smartabhyas.com" className="text-primary hover:underline">support@smartabhyas.com</a></li>
                <li>Include your order ID and registered email address</li>
                <li>Describe the issue in detail</li>
                <li>Wait for our response within 2-3 business days</li>
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                Approved refunds are processed within 5-7 business days to the original payment method.
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
