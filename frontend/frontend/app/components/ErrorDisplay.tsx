/**
 * Props for the ErrorDisplay component.
 */
interface ErrorDisplayProps {
  message: string | null;
}

/**
 * ErrorDisplay component for showing error messages.
 */
export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  if (!message) return null;
  return (
    <div className="alert alert-error mb-4">
      <span className="text-red-500">{message}</span>
    </div>
  );
}