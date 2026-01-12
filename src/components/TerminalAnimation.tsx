import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const commands = [
  { prompt: '~', command: 'whoami', output: 'negoro26 - Full Stack Developer' },
  { prompt: '~', command: 'cat skills.txt', output: 'React • TypeScript • Python • Node.js • Rust' },
  { prompt: '~', command: 'echo $STATUS', output: '"Building the future, one commit at a time"' },
];

export function TerminalAnimation() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    if (currentLine >= commands.length) return;

    const command = commands[currentLine].command;

    if (!showOutput && currentChar < command.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((prev) => prev + 1);
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timeout);
    }

    if (!showOutput && currentChar === command.length) {
      const timeout = setTimeout(() => {
        setShowOutput(true);
      }, 300);
      return () => clearTimeout(timeout);
    }

    if (showOutput) {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
        setShowOutput(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, showOutput]);

  return (
    <div className="glass-card p-6 font-mono text-sm max-w-2xl mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-muted-foreground text-xs ml-4">terminal — bash</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-3">
        {commands.map((cmd, lineIndex) => {
          const isCompleted = completedLines.includes(lineIndex);
          const isCurrent = lineIndex === currentLine;
          const isVisible = lineIndex <= currentLine;

          if (!isVisible) return null;

          return (
            <div key={lineIndex} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-green-400">{cmd.prompt}</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">
                  {isCurrent && !isCompleted
                    ? cmd.command.slice(0, currentChar)
                    : cmd.command}
                  {isCurrent && !showOutput && (
                    <span className="inline-block w-2 h-4 bg-primary ml-0.5 cursor-blink" />
                  )}
                </span>
              </div>
              {(isCompleted || showOutput) && lineIndex <= currentLine && (
                <div
                  className={cn(
                    'text-muted-foreground pl-6 animate-fade-in',
                    lineIndex === 0 && 'text-primary glow-text'
                  )}
                >
                  {cmd.output}
                </div>
              )}
            </div>
          );
        })}

        {currentLine >= commands.length && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-green-400">~</span>
            <span className="text-primary">$</span>
            <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
