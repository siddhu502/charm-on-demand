import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { FileDown, CreditCard, Check, School, Mail, Phone } from "lucide-react";

// Mock data - in a real app this would come from a database
const standards = [
  { id: "5", name: "5th Standard" },
  { id: "6", name: "6th Standard" },
  { id: "7", name: "7th Standard" },
  { id: "8", name: "8th Standard" },
  { id: "9", name: "9th Standard" },
  { id: "10", name: "10th Standard" },
  { id: "11-science", name: "11th Science" },
  { id: "11-commerce", name: "11th Commerce" },
  { id: "11-arts", name: "11th Arts" },
  { id: "12-science", name: "12th Science" },
  { id: "12-commerce", name: "12th Commerce" },
  { id: "12-arts", name: "12th Arts" },
];

const examTypes = [
  { id: "unit-test", name: "Unit Test", price: 0 },
  { id: "first-term", name: "First Term Exam", price: 49 },
  { id: "prelim", name: "Prelim/Practice Exam", price: 99 },
  { id: "second-term", name: "Second Term Exam", price: 49 },
  { id: "annual", name: "Annual Exam Package", price: 199 },
];

const subjects = [
  "Marathi", "Hindi", "English", "Sanskrit", "Mathematics", 
  "Science", "Social Science", "Physics", "Chemistry", "Biology"
];

const MainForm = () => {
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedExam = examTypes.find(e => e.id === selectedExamType);
  const totalPrice = selectedExam ? selectedExam.price * Math.max(selectedSubjects.length, 1) : 0;
  const isFree = totalPrice === 0;

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStandard) {
      toast({ title: "Please select a standard", variant: "destructive" });
      return;
    }
    if (!selectedExamType) {
      toast({ title: "Please select an exam type", variant: "destructive" });
      return;
    }
    if (selectedSubjects.length === 0) {
      toast({ title: "Please select at least one subject", variant: "destructive" });
      return;
    }
    if (schoolName.length < 10) {
      toast({ title: "School name must be at least 10 characters", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isFree) {
      toast({
        title: "Download Started!",
        description: "Your free question papers are being downloaded.",
      });
    } else {
      toast({
        title: "Redirecting to Payment",
        description: `Total: ₹${totalPrice}`,
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="form-card max-w-4xl mx-auto animate-fade-in-up">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl md:text-3xl font-heading gradient-text">
          Get Your Question Papers
        </CardTitle>
        <CardDescription className="text-base">
          Select your preferences and download instantly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Standard Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Standard</Label>
            <div className="radio-toolbar">
              {standards.map((std) => (
                <div key={std.id}>
                  <input
                    type="radio"
                    id={`std-${std.id}`}
                    name="standard"
                    value={std.id}
                    checked={selectedStandard === std.id}
                    onChange={(e) => setSelectedStandard(e.target.value)}
                  />
                  <label htmlFor={`std-${std.id}`} className="text-sm">
                    {std.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Exam Type</Label>
            <div className="radio-toolbar">
              {examTypes.map((exam) => (
                <div key={exam.id}>
                  <input
                    type="radio"
                    id={`exam-${exam.id}`}
                    name="examType"
                    value={exam.id}
                    checked={selectedExamType === exam.id}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                  />
                  <label htmlFor={`exam-${exam.id}`} className="text-sm flex items-center gap-2">
                    {exam.name}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${exam.price === 0 ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                      {exam.price === 0 ? 'FREE' : `₹${exam.price}`}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Subjects</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`subject-checkbox ${selectedSubjects.includes(subject) ? 'selected' : ''}`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedSubjects.includes(subject) 
                      ? 'bg-primary border-primary' 
                      : 'border-border'
                  }`}>
                    {selectedSubjects.includes(subject) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{subject}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName" className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                School/College Name
              </Label>
              <Input
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter your school name (min 10 chars)"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number (Optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="h-12 md:max-w-xs"
            />
          </div>

          {/* Price Summary */}
          {selectedExamType && selectedSubjects.length > 0 && (
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSubjects.length} subject(s) × {selectedExam?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isFree ? 'text-success' : 'text-primary'}`}>
                    {isFree ? 'FREE' : `₹${totalPrice}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Processing...
              </span>
            ) : isFree ? (
              <span className="flex items-center gap-2">
                <FileDown className="h-5 w-5" />
                Download Free Papers
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pay ₹{totalPrice} & Download
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MainForm;
