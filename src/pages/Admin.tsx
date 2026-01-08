import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ChevronDown, Upload, Trash2, Download, LogOut } from 'lucide-react';
import { downloadActualPDF } from '@/lib/pdfUtils';

// Class options
const standards = [
  { id: '10', name: 'दहावी' },
  { id: '12', name: 'बारावी' },
  { id: 'mht-cet', name: 'MHT-CET' },
  { id: 'jee-neet', name: 'JEE-NEET' },
];

// Subject options based on class selection
const subjectsByClass: Record<string, { id: string; name: string }[]> = {
  '10': [
    { id: 'marathi', name: 'मराठी' },
    { id: 'hindi', name: 'हिंदी' },
    { id: 'english', name: 'इंग्रजी' },
    { id: 'history', name: 'इतिहास' },
    { id: 'geography', name: 'भूगोल' },
    { id: 'algebra', name: 'बीजगणित' },
    { id: 'geometry', name: 'भूमिती' },
    { id: 'science1', name: 'विज्ञान भाग 1' },
    { id: 'science2', name: 'विज्ञान भाग 2' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'geometry-eng', name: 'Geometry' },
    { id: 'science1-eng', name: 'Science 1' },
    { id: 'science2-eng', name: 'Science 2' },
  ],
  '12': [
    { id: 'marathi', name: 'मराठी' },
    { id: 'hindi', name: 'हिंदी' },
    { id: 'english', name: 'इंग्रजी' },
    { id: 'history', name: 'इतिहास' },
    { id: 'geography', name: 'भूगोल' },
    { id: 'political-science', name: 'राज्यशास्त्र' },
    { id: 'sociology', name: 'समाजशास्त्र' },
    { id: 'economics', name: 'अर्थशास्त्र' },
    { id: 'cooperation', name: 'सहकार' },
    { id: 'secretarial', name: 'चिटणीस कार्यपद्धती' },
    { id: 'commerce-org', name: 'वाणिज्य संघटन' },
    { id: 'account', name: 'ACCOUNT' },
    { id: 'physics', name: 'PHYSICS' },
    { id: 'chemistry', name: 'CHEMISTRY' },
    { id: 'biology', name: 'BIOLOGY' },
    { id: 'maths', name: 'MATHS' },
  ],
  'mht-cet': [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
    { id: 'maths', name: 'Maths' },
  ],
  'jee-neet': [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' },
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
  file_name: string | null;
  created_at: string;
}

interface UserDownload {
  id: string;
  college_name: string;
  email: string;
  phone: string;
  downloaded_at: string;
  chapters: {
    title: string;
    standard: string;
    subject: string;
    file_url: string | null;
  } | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [downloads, setDownloads] = useState<UserDownload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [paperType, setPaperType] = useState<'question' | 'answer'>('question');
  const [price, setPrice] = useState('0');
  const [file, setFile] = useState<File | null>(null);

  const availableSubjects = standard ? subjectsByClass[standard] || [] : [];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin-login');
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchChapters();
      fetchDownloads();
    }
  }, [isAdmin]);

  const fetchChapters = async () => {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching chapters:', error);
    } else {
      setChapters(data || []);
    }
  };

  const fetchDownloads = async () => {
    const { data, error } = await supabase
      .from('user_downloads')
      .select(`
        id,
        college_name,
        email,
        phone,
        downloaded_at,
        chapters (
          title,
          standard,
          subject,
          file_url
        )
      `)
      .order('downloaded_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching downloads:', error);
    } else {
      setDownloads(data || []);
    }
  };

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: 'Please select a PDF file', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      // Upload file to storage
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('papers')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('papers')
        .getPublicUrl(fileName);

      // Insert chapter record
      const { error: insertError } = await supabase
        .from('chapters')
        .insert({
          title,
          standard,
          subject,
          paper_type: paperType,
          price: parseFloat(price),
          file_url: urlData.publicUrl,
          file_name: fileName,
        });

      if (insertError) throw insertError;

      toast({ title: 'Chapter added successfully!' });
      
      // Reset form
      setTitle('');
      setStandard('');
      setSubject('');
      setPrice('0');
      setFile(null);
      
      fetchChapters();
    } catch (error: any) {
      toast({
        title: 'Error adding chapter',
        description: error.message,
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const handleDeleteChapter = async (id: string, fileName: string | null) => {
    try {
      if (fileName) {
        await supabase.storage.from('papers').remove([fileName]);
      }
      
      const { error } = await supabase.from('chapters').delete().eq('id', id);
      if (error) throw error;

      toast({ title: 'Chapter deleted successfully!' });
      fetchChapters();
    } catch (error: any) {
      toast({
        title: 'Error deleting chapter',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownloadForUser = async (download: UserDownload) => {
    if (!download.chapters?.file_url) return;

    try {
      await downloadActualPDF(
        {
          file_url: download.chapters.file_url,
          title: download.chapters.title,
          standard: download.chapters.standard,
          subject: download.chapters.subject,
          paper_type: 'question',
        },
        {
          collegeName: download.college_name,
          email: download.email,
          phone: download.phone,
        }
      );
      toast({ title: 'PDF downloaded with watermark!' });
    } catch (error) {
      toast({ title: 'Error downloading PDF', variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="chapters" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="downloads">User Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="space-y-6">
            {/* Add Chapter Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Chapter</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddChapter} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Chapter title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Standard</Label>
                      <div className="relative">
                        <select
                          value={standard}
                          onChange={(e) => {
                            setStandard(e.target.value);
                            setSubject('');
                          }}
                          className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background appearance-none"
                          required
                        >
                          <option value="">Select Standard</option>
                          {standards.map((std) => (
                            <option key={std.id} value={std.id}>
                              {std.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          disabled={!standard}
                          className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background appearance-none disabled:opacity-50"
                          required
                        >
                          <option value="">Select Subject</option>
                          {availableSubjects.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Paper Type</Label>
                      <div className="relative">
                        <select
                          value={paperType}
                          onChange={(e) => setPaperType(e.target.value as 'question' | 'answer')}
                          className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background appearance-none"
                        >
                          <option value="question">प्रश्नपत्रिका</option>
                          <option value="answer">उत्तरपत्रिका</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>PDF File</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    <Upload className="h-4 w-4 mr-2" />
                    {isLoading ? 'Uploading...' : 'Add Chapter'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Chapters List */}
            <Card>
              <CardHeader>
                <CardTitle>All Chapters ({chapters.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chapters.map((chapter) => (
                      <TableRow key={chapter.id}>
                        <TableCell className="font-medium">{chapter.title}</TableCell>
                        <TableCell>{standards.find(s => s.id === chapter.standard)?.name || chapter.standard}</TableCell>
                        <TableCell>{subjectsByClass[chapter.standard]?.find(s => s.id === chapter.subject)?.name || chapter.subject}</TableCell>
                        <TableCell>{chapter.paper_type === 'question' ? 'प्रश्नपत्रिका' : 'उत्तरपत्रिका'}</TableCell>
                        <TableCell>₹{chapter.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteChapter(chapter.id, chapter.file_name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {chapters.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No chapters added yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Downloads ({downloads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>College Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Chapter</TableHead>
                      <TableHead>Downloaded At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {downloads.map((download) => (
                      <TableRow key={download.id}>
                        <TableCell className="font-medium">{download.college_name}</TableCell>
                        <TableCell>{download.email}</TableCell>
                        <TableCell>{download.phone}</TableCell>
                        <TableCell>{download.chapters?.title || 'N/A'}</TableCell>
                        <TableCell>
                          {new Date(download.downloaded_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {download.chapters?.file_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadForUser(download)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {downloads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No downloads yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
