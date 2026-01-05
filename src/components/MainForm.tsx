import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";

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

const MainForm = () => {
  const [paperType, setPaperType] = useState<"question" | "answer">("question");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Get subjects based on selected class
  const availableSubjects = selectedStandard ? subjectsByClass[selectedStandard] || [] : [];
  const [schoolName, setSchoolName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStandard) {
      toast({ title: "कृपया इयत्ता निवडा", variant: "destructive" });
      return;
    }
    if (!selectedSubject) {
      toast({ title: "कृपया विषय निवडा", variant: "destructive" });
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

    setIsLoading(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Download सुरू!",
      description: paperType === "question" ? "प्रश्नपत्रिका डाउनलोड होत आहे." : "उत्तरपत्रिका डाउनलोड होत आहे.",
    });

    setIsLoading(false);
  };

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
                  setSelectedSubject(""); // Reset subject when class changes
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

          {/* Subject Selection Dropdown */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-foreground">विषय</Label>
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedStandard}
                className="w-full h-14 px-4 pr-10 rounded-lg border border-border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">विषय निवडा</option>
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

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
