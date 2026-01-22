/**
 * MyVotesSkeleton - Loading skeleton for My Votes list
 * Displays animated placeholders while votes are loading.
 */

export function MyVotesSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white/5 rounded-lg p-3 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white/10 rounded" />
            <div className="h-3 bg-white/10 rounded w-12" />
            <div className="h-3 bg-white/10 rounded w-2" />
            <div className="w-5 h-5 bg-white/10 rounded" />
            <div className="h-3 bg-white/10 rounded w-16" />
            <div className="h-3 bg-white/10 rounded w-2" />
            <div className="w-6 h-6 bg-white/10 rounded" />
            <div className="h-4 bg-white/10 rounded flex-1" />
            <div className="h-4 bg-white/10 rounded w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
