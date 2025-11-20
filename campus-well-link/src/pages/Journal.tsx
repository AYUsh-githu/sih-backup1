import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Save, Calendar, Eye, Maximize2, Minimize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize with empty entries as requested
  const [entries, setEntries] = useState<JournalEntry[]>([]);

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
        {/* Overlay when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>

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
          <div className={`lg:col-span-2 space-y-6 ${isExpanded ? 'z-50' : ''}`}>
            {/* Write Journal Entry */}
            <motion.div
              layout
              className={`${isExpanded ? 'fixed inset-4 lg:inset-8 z-50' : ''}`}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <Card className={`glass-card border-wellness-calm/20 ${isExpanded ? 'h-full flex flex-col' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-wellness-calm">
                      <Calendar className="w-5 h-5" />
                      New Journal Entry
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="h-8 w-8"
                    >
                      {isExpanded ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className={`space-y-4 ${isExpanded ? 'flex-1 flex flex-col' : ''}`}>
                  <div className={isExpanded ? 'flex-1 overflow-y-auto' : ''}>
                    <RichTextEditor
                      content={currentEntry}
                      onChange={setCurrentEntry}
                      placeholder="What's on your mind today? Write about your thoughts, feelings, experiences, or anything you'd like to reflect on..."
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSaveEntry} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

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