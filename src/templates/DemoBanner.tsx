import Link from 'next/link';

export const DemoBanner = () => (
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-center text-sm font-medium text-white">
    <span>
      ∞ ZENO - Infinite Possibilities in AI Creation -
      {' '}
      <Link
        href="/marketplace"
        className="underline hover:no-underline"
      >
        Explore Now
      </Link>
    </span>
  </div>
);
