/**
 * shadcn/ui Components Demo Page
 * 
 * This page demonstrates various shadcn/ui components to verify
 * the installation and setup is working correctly.
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ComponentsDemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium tracking-tight">
            shadcn/ui Components Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Verify that all components are working correctly
          </p>
        </div>

        {/* Button Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              Various button styles and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input fields and labels working together
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  defaultValue="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges and Avatars */}
        <Card>
          <CardHeader>
            <CardTitle>Badges and Avatars</CardTitle>
            <CardDescription>
              Status indicators and user profile elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Badges */}
            <div>
              <h4 className="text-sm font-medium mb-3">Badge Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
            
            {/* Avatars */}
            <div>
              <h4 className="text-sm font-medium mb-3">Avatar Examples</h4>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Theme Demonstration */}
        <Card>
          <CardHeader>
            <CardTitle>Color Theme</CardTitle>
            <CardDescription>
              Demonstration of the color system and theme variables
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">Primary</span>
                </div>
                <p className="text-xs text-muted-foreground">Primary Color</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-secondary rounded-md flex items-center justify-center">
                  <span className="text-secondary-foreground text-sm font-medium">Secondary</span>
                </div>
                <p className="text-xs text-muted-foreground">Secondary Color</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground text-sm font-medium">Muted</span>
                </div>
                <p className="text-xs text-muted-foreground">Muted Color</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-accent rounded-md flex items-center justify-center">
                  <span className="text-accent-foreground text-sm font-medium">Accent</span>
                </div>
                <p className="text-xs text-muted-foreground">Accent Color</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Dark Mode</CardTitle>
            <CardDescription>
              Toggle dark mode by adding the `dark` class to the html element
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To test dark mode, open your browser&apos;s developer tools and add the class 
              <code className="mx-1 px-2 py-1 bg-muted rounded text-xs">dark</code> 
              to the <code className="mx-1 px-2 py-1 bg-muted rounded text-xs">html</code> element.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            ✅ All components are working correctly!
          </p>
          <p className="text-xs text-muted-foreground">
            Check the SHADCN_SETUP.md file for more information and usage examples.
          </p>
        </div>
      </div>
    </div>
  )
}
