import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { ChevronDown, Download, FileText, Search, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { downloadActualPDF } from "@/lib/pdfUtils";

interface DownloadRecord {
  id: string;
  downloaded_at: string;
  chapter: {
    title: string;
    standard: string;
    subject: string;
    paper_type: string;
    file_url: string | null;
  } | null;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Class options
const standards = [
  { id: "10", name: "दहावी" },
  { id: "12", name: "बारावी" },
  { id: "mht-cet", name: "MHT-CET" },
  { id: "jee-neet", name: "JEE-NEET" },
];

// Subject options based on class selection
const subjectsByClass: Record<string, { id: string; name: string }[]> = {
  "10": [
    { id: "marathi", name: "मराठी" },
    { id: "hindi", name: "हिंदी" },
    { id: "english", name: "इंग्रजी" },
    { id: "history", name: "इतिहास" },
    { id: "geography", name: "भूगोल" },
    { id: "algebra", name: "बीजगणित" },
    { id: "geometry", name: "भूमिती" },
    { id: "science1", name: "विज्ञान भाग 1" },
    { id: "science2", name: "विज्ञान भाग 2" },
    { id: "mathematics", name: "Mathematics" },
    { id: "geometry-eng", name: "Geometry" },
    { id: "science1-eng", name: "Science 1" },
    { id: "science2-eng", name: "Science 2" },
  ],
  "12": [
    { id: "marathi", name: "मराठी" },
    { id: "hindi", name: "हिंदी" },
    { id: "english", name: "इंग्रजी" },
    { id: "history", name: "इतिहास" },
    { id: "geography", name: "भूगोल" },
    { id: "political-science", name: "राज्यशास्त्र" },
    { id: "sociology", name: "समाजशास्त्र" },
    { id: "economics", name: "अर्थशास्त्र" },
    { id: "cooperation", name: "सहकार" },
    { id: "secretarial", name: "चिटणीस कार्यपद्धती" },
    { id: "commerce-org", name: "वाणिज्य संघटन" },
    { id: "account", name: "ACCOUNT" },
    { id: "physics", name: "PHYSICS" },
    { id: "chemistry", name: "CHEMISTRY" },
    { id: "biology", name: "BIOLOGY" },
    { id: "maths", name: "MATHS" },
  ],
  "mht-cet": [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "maths", name: "Maths" },
  ],
  "jee-neet": [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ],
};

interface Chapter {
  id: string;
  title: string;
  standard: string;
  subject: string;
  paper_type: string;
  price: number;
  file_url: string | null;
}

const MainForm = () => {
  const [paperType, setPaperType] = useState<"question" | "answer">("question");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableChapters, setAvailableChapters] = useState<Chapter[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  const availableSubjects = selectedStandard ? subjectsByClass[selectedStandard] || [] : [];
  const [schoolName, setSchoolName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // My Downloads state
  const [searchEmail, setSearchEmail] = useState("");
  const [myDownloads, setMyDownloads] = useState<DownloadRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchDownloads = async () => {
    if (!searchEmail) {
      toast({ title: "कृपया ई-मेल प्रविष्ट करा", variant: "destructive" });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    const { data, error } = await supabase
      .from("user_downloads")
      .select(`
        id,
        downloaded_at,
        chapter:chapters(title, standard, subject, paper_type, file_url)
      `)
      .eq("email", searchEmail)
      .order("downloaded_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching downloads:", error);
      toast({ title: "डाउनलोड शोधताना त्रुटी", variant: "destructive" });
    } else {
      setMyDownloads((data as unknown as DownloadRecord[]) || []);
    }
    
    setIsSearching(false);
  };

  const redownloadChapter = async (download: DownloadRecord) => {
    if (download.chapter?.file_url) {
      await downloadActualPDF(
        {
          file_url: download.chapter.file_url,
          title: download.chapter.title,
          standard: download.chapter.standard,
          subject: download.chapter.subject,
          paper_type: download.chapter.paper_type,
        },
        { collegeName: schoolName || "User", email: searchEmail, phone: "" }
      );
      toast({ title: "डाउनलोड सुरू झाले!" });
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch chapters when standard, subjects, or paper type changes
  useEffect(() => {
    if (selectedStandard && selectedSubjects.length > 0) {
      fetchChapters();
    } else {
      setAvailableChapters([]);
      setSelectedChapters([]);
    }
  }, [selectedStandard, selectedSubjects, paperType]);

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("standard", selectedStandard)
      .eq("paper_type", paperType)
      .in("subject", selectedSubjects);

    if (error) {
      console.error("Error fetching chapters:", error);
    } else {
      setAvailableChapters(data || []);
    }
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleChapterToggle = (chapterId: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === availableSubjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(availableSubjects.map((s) => s.id));
    }
  };

  const calculateTotalPrice = () => {
    return selectedChapters.reduce((total, chapterId) => {
      const chapter = availableChapters.find((c) => c.id === chapterId);
      return total + (chapter?.price || 0);
    }, 0);
  };

  const downloadChapter = async (chapter: Chapter, userInfo: { collegeName: string; email: string; phone: string }) => {
    if (chapter.file_url) {
      // Record download
      await supabase.from("user_downloads").insert({
        chapter_id: chapter.id,
        college_name: userInfo.collegeName,
        email: userInfo.email,
        phone: userInfo.phone,
      });

      // Download with watermark
      await downloadActualPDF(
        {
          file_url: chapter.file_url,
          title: chapter.title,
          standard: chapter.standard,
          subject: chapter.subject,
          paper_type: chapter.paper_type,
        },
        userInfo
      );
    }
  };

  const handlePayment = async (chapter: Chapter, userInfo: { collegeName: string; email: string; phone: string }) => {
    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: chapter.price,
          chapterId: chapter.id,
          userDetails: userInfo,
        },
      });

      if (orderError || orderData?.error) {
        throw new Error(orderData?.error || orderError?.message || 'Failed to create order');
      }

      return new Promise<boolean>((resolve) => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Smart Shikshan',
          description: chapter.title,
          order_id: orderData.orderId,
          handler: function(response: any) {
            // Verify payment using a regular function and handle async inside
            (async () => {
              try {
                console.log('Payment successful, verifying...', response);
                
                const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
                  body: {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    chapterId: chapter.id,
                    userDetails: userInfo,
                  },
                });

                console.log('Verification response:', { verifyData, verifyError });

                if (verifyError || verifyData?.error) {
                  toast({
                    title: 'Payment verification failed',
                    description: verifyData?.error || verifyError?.message || 'Unknown error',
                    variant: 'destructive',
                  });
                  resolve(false);
                } else {
                  toast({
                    title: 'Payment successful!',
                    description: 'Your download will start shortly.',
                  });
                  resolve(true);
                }
              } catch (err: any) {
                console.error('Error in payment handler:', err);
                toast({
                  title: 'Payment verification error',
                  description: err.message || 'Please contact support',
                  variant: 'destructive',
                });
                resolve(false);
              }
            })();
          },
          prefill: {
            name: name,
            email: userInfo.email,
            contact: userInfo.phone,
          },
          theme: {
            color: '#7c3aed',
          },
          modal: {
            ondismiss: function() {
              resolve(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to initiate payment',
        variant: 'destructive',
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStandard) {
      toast({ title: "कृपया इयत्ता निवडा", variant: "destructive" });
      return;
    }
    if (selectedSubjects.length === 0) {
      toast({ title: "कृपया किमान एक विषय निवडा", variant: "destructive" });
      return;
    }
    if (schoolName.length < 10) {
      toast({ title: "विद्यालयाचे नाव किमान 10 अक्षरे असावे", variant: "destructive" });
      return;
    }
    if (!name) {
      toast({ title: "कृपया आपले नाव प्रविष्ट करा", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "कृपया ई-मेल प्रविष्ट करा", variant: "destructive" });
      return;
    }
    if (selectedChapters.length === 0) {
      toast({ title: "कृपया किमान एक प्रकरण निवडा", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      const userInfo = {
        collegeName: schoolName,
        email,
        phone,
      };

      let successCount = 0;

      // Process each selected chapter
      for (const chapterId of selectedChapters) {
        const chapter = availableChapters.find((c) => c.id === chapterId);
        if (chapter && chapter.file_url) {
          if (chapter.price > 0) {
            // Paid chapter - process payment first
            const paymentSuccess = await handlePayment(chapter, userInfo);
            if (paymentSuccess) {
              await downloadChapter(chapter, userInfo);
              successCount++;
            }
          } else {
            // Free chapter - download directly
            await downloadChapter(chapter, userInfo);
            successCount++;
          }
        }
      }

      if (successCount > 0) {
        toast({
          title: "Download सुरू!",
          description: `${successCount} प्रश्नपत्रिका डाउनलोड झाल्या.`,
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download अयशस्वी",
        description: "कृपया पुन्हा प्रयत्न करा.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Card className="form-card max-w-2xl mx-auto animate-fade-in-up border-0 shadow-xl">
      <CardContent className="pt-8 pb-8 px-6 md:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Paper Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg overflow-hidden border-2 border-foreground">
              <button
                type="button"
                onClick={() => setPaperType("question")}
                className={`px-8 py-3 text-lg font-bold transition-all ${
                  paperType === "question"
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                प्रश्नपत्रिका
              </button>
              <button
                type="button"
                onClick={() => setPaperType("answer")}
                className={`px-8 py-3 text-lg font-bold transition-all ${
                  paperType === "answer"
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                }`}
              >
                उत्तरपत्रिका
              </button>
            </div>
          </div>

          {/* Standard Selection Dropdown */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-foreground">इयत्ता</Label>
            <div className="relative">
              <select
                value={selectedStandard}
                onChange={(e) => {
                  setSelectedStandard(e.target.value);
                  setSelectedSubjects([]);
                  setSelectedChapters([]);
                }}
                className="w-full h-14 px-4 pr-10 rounded-lg border border-border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">इयत्ता निवडा</option>
                {standards.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Subject Multi-Select Checkboxes */}
          {selectedStandard && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium text-foreground">
                  विषय निवडा ({selectedSubjects.length} निवडले)
                </Label>
                <button
                  type="button"
                  onClick={handleSelectAllSubjects}
                  className="text-sm text-primary hover:underline"
                >
                  {selectedSubjects.length === availableSubjects.length
                    ? "सर्व काढा"
                    : "सर्व निवडा"}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSubjects.map((subject) => (
                  <label
                    key={subject.id}
                    className={`subject-checkbox ${
                      selectedSubjects.includes(subject.id) ? "selected" : ""
                    }`}
                  >
                    <Checkbox
                      checked={selectedSubjects.includes(subject.id)}
                      onCheckedChange={() => handleSubjectToggle(subject.id)}
                    />
                    <span className="subject-checkbox-content text-sm">
                      {subject.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Available Chapters - Now After Subject Selection */}
          {availableChapters.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-medium text-foreground">
                उपलब्ध प्रकरणे ({selectedChapters.length}/{availableChapters.length} निवडले)
              </Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableChapters.map((chapter) => (
                  <label
                    key={chapter.id}
                    className={`subject-checkbox ${
                      selectedChapters.includes(chapter.id) ? "selected" : ""
                    }`}
                  >
                    <Checkbox
                      checked={selectedChapters.includes(chapter.id)}
                      onCheckedChange={() => handleChapterToggle(chapter.id)}
                    />
                    <div className="flex-1">
                      <span className="subject-checkbox-content text-sm font-medium">
                        {chapter.title}
                      </span>
                      {chapter.price > 0 ? (
                        <span className="ml-2 text-xs font-semibold text-primary">
                          ₹{chapter.price}
                        </span>
                      ) : (
                        <span className="ml-2 text-xs text-green-600 font-semibold">
                          Free
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {totalPrice > 0 && (
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <span className="text-lg font-bold text-foreground">
                    एकूण रक्कम: ₹{totalPrice}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* My Downloads Section */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              माझे डाउनलोड
            </h3>
            <p className="text-sm text-muted-foreground">
              तुमच्या ई-मेलने डाउनलोड केलेल्या सर्व प्रश्नपत्रिका पहा
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="ई-मेल प्रविष्ट करा"
                className="h-12 rounded-lg border-border flex-1"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), searchDownloads())}
              />
              <Button
                type="button"
                onClick={searchDownloads}
                disabled={isSearching}
                className="h-12 px-6"
                variant="outline"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {hasSearched && (
              <div className="space-y-3">
                {myDownloads.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {myDownloads.map((download) => (
                      <div
                        key={download.id}
                        className="bg-muted/30 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{download.chapter?.title || "Unknown"}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(download.downloaded_at).toLocaleDateString('mr-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => redownloadChapter(download)}
                          className="shrink-0"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          पुन्हा डाउनलोड
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/20 rounded-lg">
                    <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">या ई-मेलसाठी कोणतेही डाउनलोड सापडले नाहीत</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-border pt-6"></div>

          {/* School Name */}
          <div className="space-y-2">
            <Label htmlFor="schoolName" className="text-base font-medium text-foreground">
              विद्यालय / कॉलेज नाव
            </Label>
            <Input
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder=""
              className="h-14 rounded-lg border-border"
            />
            <p className="text-sm text-muted-foreground">किमान 10 अक्षरे आवश्यक</p>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">वैयक्तिक माहिती</h3>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium text-foreground">
                नाव
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className="h-14 rounded-lg border-border"
              />
            </div>

            {/* Email and Mobile - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-foreground">
                  ई-मेल
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="h-14 rounded-lg border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-foreground">
                  मोबाईल
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=""
                  className="h-14 rounded-lg border-border"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              className="h-14 px-16 text-lg font-bold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : totalPrice > 0 ? (
                `₹${totalPrice} Pay & Download`
              ) : (
                "Download करा"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
