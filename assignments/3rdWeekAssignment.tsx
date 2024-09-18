import { useState } from 'react'
import { Check, Cloud, Cpu, Database, GitBranch, Rocket } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const plans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small projects and experimentation',
    features: ['1 GPU', '10GB Storage', '5 Deployments/month', 'Community support'],
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'Ideal for growing teams and projects',
    features: ['2 GPUs', '50GB Storage', '20 Deployments/month', 'Priority support', 'Custom ML libraries'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale AI/ML operations',
    features: ['Unlimited GPUs', 'Unlimited Storage', 'Unlimited Deployments', '24/7 Dedicated support', 'Custom ML libraries', 'On-premises option'],
  },
]

const gpuOptions = ['A100', 'A10G', 'T4']
const memoryOptions = ['16', '32', '64', '128']

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0])
  const [showGPUOptions, setShowGPUOptions] = useState(false)
  const [selectedGPU, setSelectedGPU] = useState('')
  const [selectedMemory, setSelectedMemory] = useState('')
  const [sshAlias, setSSHAlias] = useState('')

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(plans.find(plan => plan.name === planName) || plans[0])
    setShowGPUOptions(true)
    setSelectedGPU('')
    setSelectedMemory('')
    setSSHAlias('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            CloudML Platform
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Build, train, and deploy machine learning models with ease using our cloud-based platform.
          </p>
        </div>

        <RadioGroup
          defaultValue={selectedPlan.name}
          onValueChange={handlePlanSelect}
          className="mt-12 space-y-4"
        >
          {plans.map((plan) => (
            <Card key={plan.name} className={`${selectedPlan.name === plan.name ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <RadioGroupItem value={plan.name} id={plan.name} className="sr-only" />
                <Label
                  htmlFor={plan.name}
                  className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Select Plan
                </Label>
              </CardFooter>
            </Card>
          ))}
        </RadioGroup>

        {showGPUOptions && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Customize Your GPU Setup</CardTitle>
              <CardDescription>Select your GPU, memory, and set an SSH alias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gpu-select">Select your GPU</Label>
                <Select onValueChange={setSelectedGPU} value={selectedGPU}>
                  <SelectTrigger id="gpu-select">
                    <SelectValue placeholder="Choose a GPU" />
                  </SelectTrigger>
                  <SelectContent>
                    {gpuOptions.map((gpu) => (
                      <SelectItem key={gpu} value={gpu}>{gpu}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="memory-select">Select GPU Memory (GiB)</Label>
                <Select onValueChange={setSelectedMemory} value={selectedMemory}>
                  <SelectTrigger id="memory-select">
                    <SelectValue placeholder="Choose memory size" />
                  </SelectTrigger>
                  <SelectContent>
                    {memoryOptions.map((memory) => (
                      <SelectItem key={memory} value={memory}>{memory} GiB</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ssh-alias">SSH Alias or Instance Name</Label>
                <Input
                  id="ssh-alias"
                  placeholder="Enter SSH alias or instance name"
                  value={sshAlias}
                  onChange={(e) => setSSHAlias(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Selected Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Plan: {selectedPlan.name}</h3>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">GPU Configuration:</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><Cpu className="h-5 w-5 text-blue-500 mr-2" /> GPU: {selectedGPU || 'Not selected'}</li>
                <li className="flex items-center"><Database className="h-5 w-5 text-blue-500 mr-2" /> Memory: {selectedMemory ? `${selectedMemory} GiB` : 'Not selected'}</li>
                <li className="flex items-center"><Cloud className="h-5 w-5 text-blue-500 mr-2" /> SSH Alias: {sshAlias || 'Not set'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedGPU || !selectedMemory || !sshAlias}
          >
            Get Started with Your Custom Setup
          </Button>
        </div>
      </div>
    </div>
  )
}