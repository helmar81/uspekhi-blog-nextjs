import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Social() {
  return (
    <div className="flex justify-center gap-4 my-4">
      <Button variant="ghost" size="icon" asChild>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github className="h-6 w-6" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin className="h-6 w-6" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
}
