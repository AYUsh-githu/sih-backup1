import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BarChart3, Download, Filter, TrendingDown, TrendingUp } from 'lucide-react';

export const Results = () => {
  const recentResults = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "ST2024001",
      testType: "Depression Screening (PHQ-9)",
      score: 12,
      riskLevel: "Moderate",
      completedAt: "2024-01-15 10:30 AM",
      trend: "increased"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      studentId: "ST2024002", 
      testType: "Anxiety Assessment (GAD-7)",
      score: 8,
      riskLevel: "Mild",
      completedAt: "2024-01-15 09:15 AM",
      trend: "stable"
    },
    {
      id: 3,
      studentName: "Emily Rodriguez",
      studentId: "ST2024003",
      testType: "Stress Level Evaluation",
      score: 15,
      riskLevel: "High",
      completedAt: "2024-01-14 02:45 PM",
      trend: "increased"
    },
    {
      id: 4,
      studentName: "David Thompson",
      studentId: "ST2024004",
      testType: "Sleep Quality Index",
      score: 4,
      riskLevel: "Low",
      completedAt: "2024-01-14 11:20 AM",
      trend: "decreased"
    },
    {
      id: 5,
      studentName: "Lisa Wang",
      studentId: "ST2024005",
      testType: "Depression Screening (PHQ-9)",
      score: 18,
      riskLevel: "High",
      completedAt: "2024-01-13 04:10 PM",
      trend: "increased"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Mild': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Moderate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increased': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreased': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Test Results</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and analyze student assessment results
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-card">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="glass-card hover:scale-105 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Results</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">164</div>
              <p className="text-xs text-muted-foreground">+12 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">12</div>
              <p className="text-xs text-muted-foreground">7.3% of total</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.8</div>
              <p className="text-xs text-muted-foreground">-0.2 from last week</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Follow-ups</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Assessment Results</CardTitle>
            <CardDescription>
              Latest student assessment outcomes and risk indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-all">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {result.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{result.studentName}</p>
                      <p className="text-sm text-muted-foreground">{result.studentId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{result.testType}</p>
                      <p className="text-sm text-muted-foreground">{result.completedAt}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-2xl font-bold text-wellness-calm">{result.score}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                    
                    <Badge className={getRiskColor(result.riskLevel)}>
                      {result.riskLevel}
                    </Badge>
                    
                    <div className="flex items-center">
                      {getTrendIcon(result.trend)}
                    </div>
                    
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};