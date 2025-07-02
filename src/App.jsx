import React from 'react';
import './index.css';
import {
  Card,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/components';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shadcn UI Components</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
          <CardDescription>
            Various button styles from Shadcn UI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Component</CardTitle>
          <CardDescription>Input field from Shadcn UI</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Enter your name" className="mb-2" />
          <Input type="email" placeholder="Enter your email" className="mb-2" />
          <Input type="password" placeholder="Enter your password" />
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
