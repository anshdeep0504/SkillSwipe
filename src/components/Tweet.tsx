{/* Previous imports */}

export function Tweet({ tweet, isReply = false }: TweetProps) {
  // Previous state and hooks

  return (
    <div className={`border-b border-gray-200 p-4 ${isReply ? 'pt-2' : ''} hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-accent-50/50 transition-all duration-300`}>
      {/* Tweet content */}
    </div>
  );
}