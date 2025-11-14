import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, List, Save, Calendar, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  preview: string;
}

export const Journal: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // Mock previous entries
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      title: 'Reflection on Study Session',
      content: 'Today was a productive day. I managed to complete my assignments and felt more organized than usual...',
      preview: 'Today was a productive day. I managed to complete...'
    },
    {
      id: '2',
      date: '2024-01-12',
      title: 'Feeling Grateful',
      content: 'I wanted to write about the things I am grateful for today. My friends, family, and the support I receive...',
      preview: 'I wanted to write about the things I am grateful...'
    },
    {
      id: '3',
      date: '2024-01-10',
      title: 'Managing Stress',
      content: 'Had a challenging week with exams coming up. Using breathing exercises helped me stay calm...',
      preview: 'Had a challenging week with exams coming up...'
    }
  ]);

  const handleFormatting = (format: 'bold' | 'italic' | 'list') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = currentEntry.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        setIsBold(!isBold);
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        setIsItalic(!isItalic);
        break;
      case 'list':
        formattedText = `\n• ${selectedText}`;
        break;
    }

    const newText = currentEntry.substring(0, start) + formattedText + currentEntry.substring(end);
    setCurrentEntry(newText);
  };

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      // Here you would typically save to backend
      console.log('Saving entry:', currentEntry);
      setCurrentEntry('');
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
                
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormatting('bold')}
                    className={cn("h-8 w-8 p-0", isBold && "bg-primary text-primary-foreground")}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormatting('italic')}
                    className={cn("h-8 w-8 p-0", isItalic && "bg-primary text-primary-foreground")}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormatting('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind today? Write about your thoughts, feelings, experiences, or anything you'd like to reflect on..."
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  className="min-h-[300px] text-base leading-relaxed resize-none"
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
                  <div className="prose prose-sm max-w-none text-foreground">
                    {selectedEntry.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
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