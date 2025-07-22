import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, Users, MousePointer, DollarSign, TrendingUp, Calendar, RotateCcw, PlayCircle, Sun, Moon } from 'lucide-react';

interface CalculatorInputs {
  targetSales: number;
  clickToMeeting: number;
  meetingToSale: number;
  costPerClick: number;
  avgOrderValue: number;
}

interface CalculatorOutputs {
  meetingsNeeded: number;
  clicksNeeded: number;
  budgetRequired: number;
  expectedRevenue: number;
  roi: number;
  dailyBudget: number;
}

export const GoogleAdsCalculator = () => {
  const [isDark, setIsDark] = useState(false);
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    targetSales: 0,
    clickToMeeting: 0,
    meetingToSale: 0,
    costPerClick: 0,
    avgOrderValue: 0,
  });

  const [outputs, setOutputs] = useState<CalculatorOutputs>({
    meetingsNeeded: 0,
    clicksNeeded: 0,
    budgetRequired: 0,
    expectedRevenue: 0,
    roi: 0,
    dailyBudget: 0,
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const formatCurrency = (num: number): string => {
    return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatPercent = (num: number): string => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const calculateOutputs = () => {
    const { targetSales, clickToMeeting, meetingToSale, costPerClick, avgOrderValue } = inputs;

    // Calculations based on your original logic
    const meetingsNeeded = meetingToSale > 0 ? targetSales / (meetingToSale / 100) : 0;
    const clicksNeeded = clickToMeeting > 0 ? meetingsNeeded / (clickToMeeting / 100) : 0;
    const budgetRequired = clicksNeeded * costPerClick;
    const expectedRevenue = targetSales * avgOrderValue;
    const roi = budgetRequired > 0 ? ((expectedRevenue - budgetRequired) / budgetRequired) * 100 : 0;
    const dailyBudget = budgetRequired / 30;

    setOutputs({
      meetingsNeeded,
      clicksNeeded,
      budgetRequired,
      expectedRevenue,
      roi,
      dailyBudget,
    });
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const resetForm = () => {
    setInputs({
      targetSales: 0,
      clickToMeeting: 0,
      meetingToSale: 0,
      costPerClick: 0,
      avgOrderValue: 0,
    });
    setOutputs({
      meetingsNeeded: 0,
      clicksNeeded: 0,
      budgetRequired: 0,
      expectedRevenue: 0,
      roi: 0,
      dailyBudget: 0,
    });
  };

  const handleCalculate = () => {
    calculateOutputs();
  };

  const outputCards = [
    {
      title: 'Meetings Needed',
      value: outputs.meetingsNeeded,
      formatter: formatNumber,
      icon: Users,
      color: 'info',
      description: 'Required meetings to achieve target sales'
    },
    {
      title: 'Clicks Needed',
      value: outputs.clicksNeeded,
      formatter: formatNumber,
      icon: MousePointer,
      color: 'info',
      description: 'Total clicks required for meetings'
    },
    {
      title: 'Budget Required',
      value: outputs.budgetRequired,
      formatter: formatCurrency,
      icon: DollarSign,
      color: 'success',
      description: 'Total advertising budget needed'
    },
    {
      title: 'Expected Revenue',
      value: outputs.expectedRevenue,
      formatter: formatCurrency,
      icon: TrendingUp,
      color: 'success',
      description: 'Projected revenue from target sales'
    },
    {
      title: 'ROI',
      value: outputs.roi,
      formatter: formatPercent,
      icon: TrendingUp,
      color: 'warning',
      description: 'Return on investment percentage'
    },
    {
      title: 'Daily Budget',
      value: outputs.dailyBudget,
      formatter: formatCurrency,
      icon: Calendar,
      color: 'warning',
      description: 'Recommended daily ad spend'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-accent text-white">
              Campaign Metrics
            </Badge>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="p-2"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Google Ads Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calculate your campaign requirements, budget needs, and expected ROI with precision. 
            Get insights for smarter advertising decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-elegant hover:shadow-card transition-all duration-300 animate-scale-in border-0 bg-card/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-primary/10 rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                Campaign Inputs
              </CardTitle>
              <p className="text-base">
                Enter your campaign parameters to calculate optimal metrics
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="targetSales" className="flex items-center gap-2 font-medium">
                  🎯 Target Sales
                </Label>
                <Input
                  id="targetSales"
                  type="number"
                  min="1"
                  step="1"
                  value={inputs.targetSales || ''}
                  onChange={(e) => handleInputChange('targetSales', e.target.value)}
                  className="bg-card"
                  placeholder="Enter target number of sales"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clickToMeeting" className="flex items-center gap-2 font-medium">
                  🧠 Click-to-Meeting Rate (%)
                </Label>
                <Input
                  id="clickToMeeting"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={inputs.clickToMeeting || ''}
                  onChange={(e) => handleInputChange('clickToMeeting', e.target.value)}
                  className="bg-card"
                  placeholder="Percentage of clicks that become meetings"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingToSale" className="flex items-center gap-2 font-medium">
                  📞 Meeting-to-Sale Rate (%)
                </Label>
                <Input
                  id="meetingToSale"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={inputs.meetingToSale || ''}
                  onChange={(e) => handleInputChange('meetingToSale', e.target.value)}
                  className="bg-card"
                  placeholder="Percentage of meetings that convert to sales"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPerClick" className="flex items-center gap-2 font-medium">
                  💰 Cost Per Click (₹)
                </Label>
                <Input
                  id="costPerClick"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={inputs.costPerClick || ''}
                  onChange={(e) => handleInputChange('costPerClick', e.target.value)}
                  className="bg-card"
                  placeholder="Average cost per click in rupees"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgOrderValue" className="flex items-center gap-2 font-medium">
                  💳 Average Order Value (₹)
                </Label>
                <Input
                  id="avgOrderValue"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={inputs.avgOrderValue || ''}
                  onChange={(e) => handleInputChange('avgOrderValue', e.target.value)}
                  className="bg-card"
                  placeholder="Average value per sale in rupees"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={handleCalculate}
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white border-0"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 border-2 border-accent/50 hover:bg-accent/10 transition-all duration-300"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-card transition-all duration-300 animate-scale-in border-0 bg-card/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 bg-gradient-success/10 rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
                <TrendingUp className="h-6 w-6 text-success" />
                Calculated Results
              </CardTitle>
              <p className="text-base">
                Your optimized campaign metrics and projections
              </p>
            </CardHeader>
            <CardContent>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outputCards.map((card, index) => {
                  const Icon = card.icon;
                  const colorClasses = {
                    info: 'bg-gradient-to-br from-info/10 to-info/5 border-info/30 shadow-glow',
                    success: 'bg-gradient-to-br from-success/10 to-success/5 border-success/30 shadow-glow',
                    warning: 'bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30 shadow-glow',
                  };

                  return (
                    <Card 
                      key={card.title}
                      className={`${colorClasses[card.color as keyof typeof colorClasses]} border-2 transition-all duration-300 hover:scale-105 animate-scale-in backdrop-blur-sm`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="p-3 rounded-full bg-gradient-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <Badge 
                              variant="secondary" 
                              className="text-xl font-bold px-4 py-2 bg-gradient-accent text-white shadow-elegant"
                            >
                              {card.value > 0 ? card.formatter(card.value) : '-'}
                            </Badge>
                            <h3 className="font-bold text-foreground text-sm">{card.title}</h3>
                            <p className="text-xs text-muted-foreground">{card.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};