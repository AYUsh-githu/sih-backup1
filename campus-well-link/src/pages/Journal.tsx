import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Save, Calendar, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  preview: string;
}

export const Journal: React.FC = () => {
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Mock previous entries - now with HTML content
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      title: 'Reflection on Study Session',
      content: '<p>Today was a <strong>productive day</strong>. I managed to complete my assignments and felt more <em>organized</em> than usual...</p>',
      preview: 'Today was a productive day. I managed to complete...'
    },
    {
      id: '2',
      date: '2024-01-12',
      title: 'Feeling Grateful',
      content: '<p>I wanted to write about the things I am <strong>grateful</strong> for today:</p><ul><li>My friends</li><li>Family</li><li>The support I receive</li></ul>',
      preview: 'I wanted to write about the things I am grateful...'
    },
    {
      id: '3',
      date: '2024-01-10',
      title: 'Managing Stress',
      content: '<p>Had a <em>challenging week</em> with exams coming up. Using <strong>breathing exercises</strong> helped me stay calm...</p>',
      preview: 'Had a challenging week with exams coming up...'
    }
  ]);

  const handleSaveEntry = () => {
    if (currentEntry.trim() && currentEntry !== '<p></p>') {
      // Create a temporary div to extract text for preview
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = currentEntry;
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        title: `Entry - ${new Date().toLocaleDateString()}`,
        content: currentEntry,
        preview: plainText.substring(0, 50) + (plainText.length > 50 ? '...' : '')
      };
      
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-wellness-calm to-wellness-serene bg-clip-text text-transparent">
              My Journal
            </h1>
            <p className="text-muted-foreground mt-2">
              Write down your thoughts, experiences, and reflections
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Journal Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Write Journal Entry */}
            <Card className="glass-card border-wellness-calm/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-wellness-calm">
                  <Calendar className="w-5 h-5" />
                  New Journal Entry
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <RichTextEditor
                  content={currentEntry}
                  onChange={setCurrentEntry}
                  placeholder="What's on your mind today? Write about your thoughts, feelings, experiences, or anything you'd like to reflect on..."
                />
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveEntry} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Entry View */}
            {selectedEntry && (
              <Card className="glass-card border-wellness-peaceful/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-wellness-peaceful">
                    <Eye className="w-5 h-5" />
                    {selectedEntry.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedEntry.date)}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: selectedEntry.content }}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Previous Entries & AI Insights */}
          <div className="space-y-6">
            {/* Previous Entries */}
            <Card className="glass-card border-wellness-serene/20">
              <CardHeader>
                <CardTitle className="text-wellness-serene">Previous Entries</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="p-3 rounded-lg border border-muted/50 hover:border-wellness-serene/50 cursor-pointer transition-all duration-300 hover:bg-muted/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{entry.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {entry.preview}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights Panel */}
            <Card className="glass-card border-wellness-gentle/20">
              <CardHeader>
                <CardTitle className="text-wellness-gentle">AI Insights</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-wellness-gentle/10 rounded-lg">
                    <h4 className="font-medium mb-2">Mood Patterns</h4>
                    <p className="text-muted-foreground">
                      Your recent entries show positive growth in stress management techniques.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-wellness-warm/10 rounded-lg">
                    <h4 className="font-medium mb-2">Reflection Themes</h4>
                    <p className="text-muted-foreground">
                      Common themes: Gratitude, Academic Progress, Social Connections
                    </p>
                  </div>
                  
                  <div className="p-3 bg-wellness-calm/10 rounded-lg">
                    <h4 className="font-medium mb-2">Suggestions</h4>
                    <p className="text-muted-foreground">
                      Try exploring your creative side in tomorrow's entry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};