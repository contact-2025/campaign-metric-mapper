import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, Users, MousePointer, DollarSign, TrendingUp, Calendar, RotateCcw } from 'lucide-react';

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
  };

  useEffect(() => {
    calculateOutputs();
  }, [inputs]);

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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-primary p-3 rounded-xl shadow-elegant">
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Google Ads Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate key metrics for your Google Ads campaigns and optimize your advertising budget for maximum ROI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-primary" />
                Campaign Parameters
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your campaign goals and costs to calculate required metrics
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

              <Button 
                onClick={resetForm}
                variant="outline"
                className="w-full mt-6"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="shadow-card animate-scale-in">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Calculated Results
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Live calculations based on your input parameters
                </p>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outputCards.map((card, index) => {
                const Icon = card.icon;
                const colorClasses = {
                  info: 'bg-info-muted border-info/20',
                  success: 'bg-success-muted border-success/20',
                  warning: 'bg-warning-muted border-warning/20',
                };

                return (
                  <Card 
                    key={card.title}
                    className={`${colorClasses[card.color as keyof typeof colorClasses]} border-2 transition-all duration-300 hover:shadow-lg animate-scale-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <Icon className="h-8 w-8 text-muted-foreground" />
                        <div className="space-y-1">
                          <Badge 
                            variant="secondary" 
                            className="text-lg font-bold px-3 py-1 bg-card shadow-sm"
                          >
                            {card.value > 0 ? card.formatter(card.value) : '-'}
                          </Badge>
                          <h3 className="font-semibold text-foreground">{card.title}</h3>
                          <p className="text-xs text-muted-foreground">{card.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};