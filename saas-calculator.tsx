"use client"

import { useState } from "react"
import { Calculator, DollarSign, Gauge, LineChart, Target } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SaaSCalculator() {
  // ROI Calculator State
  const [roiInvestment, setRoiInvestment] = useState<number>(0)
  const [roiReturn, setRoiReturn] = useState<number>(0)
  const [roiResult, setRoiResult] = useState<number>(0)

  // Pricing Calculator State
  const [costPerUnit, setCostPerUnit] = useState<number>(0)
  const [desiredMargin, setDesiredMargin] = useState<number>(0)
  const [pricingResult, setPricingResult] = useState<number>(0)

  // Burn Rate Calculator State
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0)
  const [burnResult, setBurnResult] = useState<number>(0)

  // MRR/ARR Calculator State
  const [subscribers, setSubscribers] = useState<number>(0)
  const [pricePerSubscriber, setPricePerSubscriber] = useState<number>(0)
  const [mrrResult, setMrrResult] = useState({ mrr: 0, arr: 0 })

  // Unit Economics Calculator State
  const [cac, setCac] = useState<number>(0)
  const [ltv, setLtv] = useState<number>(0)
  const [unitResult, setUnitResult] = useState<number>(0)

  // Calculator Functions
  const calculateROI = () => {
    const roi = ((roiReturn - roiInvestment) / roiInvestment) * 100
    setRoiResult(roi)
  }

  const calculatePricing = () => {
    const price = costPerUnit / (1 - desiredMargin / 100)
    setPricingResult(price)
  }

  const calculateBurnRate = () => {
    const burn = monthlyExpenses - monthlyRevenue
    setBurnResult(burn)
  }

  const calculateMRR = () => {
    const mrr = subscribers * pricePerSubscriber
    setMrrResult({
      mrr,
      arr: mrr * 12,
    })
  }

  const calculateUnitEconomics = () => {
    const ratio = ltv / cac
    setUnitResult(ratio)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>SaaS Calculator Suite</CardTitle>
        <CardDescription>
          Comprehensive calculator tools for SaaS metrics and financial planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid grid-cols-5 gap-4 mb-4">
            <TabsTrigger value="roi" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="burn" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Burn Rate
            </TabsTrigger>
            <TabsTrigger value="mrr" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              MRR/ARR
            </TabsTrigger>
            <TabsTrigger value="unit" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Unit Economics
            </TabsTrigger>
          </TabsList>

          {/* ROI Calculator */}
          <TabsContent value="roi">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="investment">Initial Investment ($)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="Enter initial investment"
                  onChange={(e) => setRoiInvestment(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="return">Expected Return ($)</Label>
                <Input
                  id="return"
                  type="number"
                  placeholder="Enter expected return"
                  onChange={(e) => setRoiReturn(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateROI}>Calculate ROI</Button>
              {roiResult !== 0 && (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{roiResult.toFixed(2)}%</p>
                  <p className="text-sm text-muted-foreground">Return on Investment</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Pricing Calculator */}
          <TabsContent value="pricing">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cost">Cost per Unit ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="Enter cost per unit"
                  onChange={(e) => setCostPerUnit(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="margin">Desired Margin (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  placeholder="Enter desired margin"
                  onChange={(e) => setDesiredMargin(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculatePricing}>Calculate Price</Button>
              {pricingResult !== 0 && (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">${pricingResult.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Recommended Price per Unit</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Burn Rate Calculator */}
          <TabsContent value="burn">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="Enter monthly expenses"
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="revenue">Monthly Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="Enter monthly revenue"
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateBurnRate}>Calculate Burn Rate</Button>
              {burnResult !== 0 && (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">${Math.abs(burnResult).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {burnResult > 0 ? "Monthly Burn Rate" : "Monthly Profit"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* MRR/ARR Calculator */}
          <TabsContent value="mrr">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subscribers">Number of Subscribers</Label>
                <Input
                  id="subscribers"
                  type="number"
                  placeholder="Enter number of subscribers"
                  onChange={(e) => setSubscribers(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price per Subscriber ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price per subscriber"
                  onChange={(e) => setPricePerSubscriber(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateMRR}>Calculate MRR/ARR</Button>
              {mrrResult.mrr !== 0 && (
                <div className="grid gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">${mrrResult.mrr.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Monthly Recurring Revenue (MRR)</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold">${mrrResult.arr.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Annual Recurring Revenue (ARR)</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Unit Economics Calculator */}
          <TabsContent value="unit">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cac">Customer Acquisition Cost ($)</Label>
                <Input
                  id="cac"
                  type="number"
                  placeholder="Enter CAC"
                  onChange={(e) => setCac(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ltv">Lifetime Value ($)</Label>
                <Input
                  id="ltv"
                  type="number"
                  placeholder="Enter LTV"
                  onChange={(e) => setLtv(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateUnitEconomics}>Calculate LTV/CAC Ratio</Button>
              {unitResult !== 0 && (
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{unitResult.toFixed(2)}x</p>
                  <p className="text-sm text-muted-foreground">LTV/CAC Ratio</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {unitResult >= 3
                      ? "Healthy ratio (≥3x)"
                      : "Consider optimizing customer acquisition or lifetime value"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

