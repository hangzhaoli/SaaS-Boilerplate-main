import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Download,
  Eye,
  Heart,
  Play,
  Rocket,
  Search,
  Share,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';

export async function generateMetadata() {
  return {
    title: 'ZENO - Infinite Possibilities in AI Creation',
    description: 'The ultimate marketplace for AI-generated videos, music, images, tools, and more. Join ZENO where creators explore infinite possibilities and trade AI products instantly.',
  };
}

const IndexPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);

  const features = [
    {
      icon: Share,
      title: 'Share Instantly',
      description: 'Upload and share your AI creations with the world in seconds. Reach thousands of potential buyers instantly.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Find Anything',
      description: 'Discover exactly what you need with our AI-powered search. From videos to music, tools to art - find it all.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Trade Smart',
      description: 'Buy, sell, and trade AI products with confidence. Secure transactions and instant downloads guaranteed.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Secure & Licensed',
      description: 'All content comes with proper licensing. Commercial and personal use options with full legal protection.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Join 50,000+ creators worldwide. Network, collaborate, and grow your AI business together.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Curated high-quality content. Every item is reviewed and verified by our expert AI team.',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const stats = [
    { number: '12,547', label: 'AI Products', icon: '🎨' },
    { number: '3,421', label: 'Creators', icon: '👥' },
    { number: '89,234', label: 'Downloads', icon: '⬇️' },
    { number: '156', label: 'Featured Items', icon: '⭐' },
  ];

  const seoFeatures = [
    {
      icon: Search,
      title: 'Smart SEO Tags',
      description: 'Auto-generate SEO-optimized titles, descriptions, and tags for maximum discoverability.',
      gradient: 'from-emerald-400 to-cyan-400',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track views, downloads, and engagement with detailed analytics like Sora creators.',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      icon: Eye,
      title: 'Visibility Boost',
      description: 'Featured placement and trending algorithms help your creations reach the right audience.',
      gradient: 'from-orange-400 to-red-400',
    },
    {
      icon: Rocket,
      title: 'Launch Optimization',
      description: 'Perfect timing recommendations and launch strategies for maximum impact.',
      gradient: 'from-blue-400 to-indigo-400',
    },
  ];

  const creators = [
    {
      name: 'Sarah Chen',
      role: 'AI Video Creator',
      avatar: 'https://picsum.photos/120/120?random=20',
      products: '127',
      earnings: '$24.5K',
      specialty: 'Cinematic AI Videos',
      badge: '🏆',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'AI Music Producer',
      avatar: 'https://picsum.photos/120/120?random=21',
      products: '89',
      earnings: '$18.2K',
      specialty: 'Electronic & Ambient',
      badge: '🎵',
    },
    {
      name: 'Emily Johnson',
      role: 'AI Artist',
      avatar: 'https://picsum.photos/120/120?random=22',
      products: '203',
      earnings: '$31.8K',
      specialty: 'Digital Art & NFTs',
      badge: '🎨',
    },
    {
      name: 'David Kim',
      role: 'AI Tool Developer',
      avatar: 'https://picsum.photos/120/120?random=23',
      products: '56',
      earnings: '$42.1K',
      specialty: 'Productivity Tools',
      badge: '🛠️',
    },
    {
      name: 'Luna Martinez',
      role: 'AI Storyteller',
      avatar: 'https://picsum.photos/120/120?random=24',
      products: '94',
      earnings: '$19.7K',
      specialty: 'Interactive Stories',
      badge: '📚',
    },
  ];

  const discoveryFeatures = [
    {
      icon: '🔍',
      title: 'Smart Discovery',
      description: 'AI-powered recommendations help users find your creations based on their interests and behavior.',
    },
    {
      icon: '🏷️',
      title: 'Auto-Tagging',
      description: 'Intelligent tagging system automatically categorizes your content for better searchability.',
    },
    {
      icon: '📈',
      title: 'Trending Algorithm',
      description: 'Our algorithm promotes quality content, giving your creations the visibility they deserve.',
    },
    {
      icon: '🎯',
      title: 'Targeted Exposure',
      description: 'Reach the right audience with precision targeting based on user preferences and demographics.',
    },
  ];

  const testimonials = [
    {
      quote: 'This platform changed my life! I went from $0 to $15K/month selling AI art in just 6 months. The community is incredibly supportive and the tools are amazing.',
      author: 'Alex Thompson',
      role: 'AI Artist',
      avatar: 'https://picsum.photos/100/100?random=30',
      earnings: '$15K/month',
      verified: true,
    },
    {
      quote: 'I\'ve tried every marketplace out there, but nothing comes close to this. The SEO tools helped my AI music reach 100K+ downloads. Absolutely game-changing!',
      author: 'Maya Patel',
      role: 'AI Music Producer',
      avatar: 'https://picsum.photos/100/100?random=31',
      earnings: '$8.5K/month',
      verified: true,
    },
    {
      quote: 'As a developer, I love how easy it is to sell AI tools here. Made my first $1000 in the first week! The analytics dashboard is incredibly detailed.',
      author: 'James Wilson',
      role: 'AI Developer',
      avatar: 'https://picsum.photos/100/100?random=32',
      earnings: '$12K/month',
      verified: true,
    },
    {
      quote: 'The discovery algorithm is pure magic! My AI videos went viral and I earned $25K in one month. This platform understands creators like no other.',
      author: 'Sophie Laurent',
      role: 'AI Content Creator',
      avatar: 'https://picsum.photos/100/100?random=33',
      earnings: '$25K/month',
      verified: true,
    },
    {
      quote: 'I was skeptical at first, but after earning $50K in 3 months selling AI prompts and templates, I\'m a believer. The community here is next level!',
      author: 'Ryan Chang',
      role: 'Prompt Engineer',
      avatar: 'https://picsum.photos/100/100?random=34',
      earnings: '$18K/month',
      verified: true,
    },
    {
      quote: 'From hobby to full-time income! This marketplace helped me quit my 9-5 and now I earn more than ever creating AI animations. Dreams do come true!',
      author: 'Isabella Garcia',
      role: 'AI Animator',
      avatar: 'https://picsum.photos/100/100?random=35',
      earnings: '$22K/month',
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-lg backdrop-blur-sm dark:bg-gray-900/95">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="mr-2 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                <span className="text-lg font-bold text-white">∞</span>
              </div>
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">ZENO</span>
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/marketplace" className="rounded-lg px-4 py-2 font-medium text-gray-700 transition-all hover:bg-purple-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400">
                Marketplace
              </Link>
              <Link href="/dashboard" className="rounded-lg px-4 py-2 font-medium text-gray-700 transition-all hover:bg-purple-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:hover:text-purple-400">
                Dashboard (Test)
              </Link>
              <Link href="/sign-up" className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg">
                Sign Up
              </Link>
              <Link href="/sign-in" className="rounded-lg border-2 border-purple-200 px-6 py-2 font-semibold text-purple-600 transition-all hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20">
                Sign In
              </Link>
            </nav>
            <button className="text-gray-700 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-3xl"></div>
          <div className="absolute right-1/4 top-3/4 size-96 animate-pulse rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 size-96 animate-pulse rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-3xl"></div>
        </div>

        <div className="container relative mx-auto flex min-h-screen items-center px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-6xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-purple-200 dark:border-purple-800 dark:bg-purple-900/20">
              <Sparkles className="size-5 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-300">∞ Welcome to ZENO - Infinite Possibilities</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-8 text-6xl font-bold leading-tight text-white lg:text-8xl">
              <span className="block animate-pulse bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                ZENO
              </span>
              <span className="block text-white">
                Share, Find, Trade
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Products
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-16 max-w-4xl text-2xl font-light leading-relaxed text-gray-300 lg:text-3xl">
              Join the ultimate AI creators' platform where every
              {' '}
              <span className="font-semibold text-purple-400">creator</span>
              {' '}
              explores,
              {' '}
              <span className="font-semibold text-pink-400">discovers</span>
              , and
              {' '}
              <span className="font-semibold text-purple-500">trades</span>
              {' '}
              infinite possibilities in AI content creation.
            </p>

            {/* CTA Buttons */}
            <div className="mb-20 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/marketplace">
                <Button size="lg" className="group rounded-full border-0 bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 text-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25">
                  <Play className="mr-3 size-6 group-hover:animate-pulse" />
                  Explore ZENO
                  <ArrowRight className="ml-3 size-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="group rounded-full border-2 border-purple-400/60 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-10 py-5 text-xl font-semibold text-purple-100 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:from-purple-400/30 hover:to-pink-400/30 hover:text-white">
                  <Download className="mr-3 size-6 group-hover:animate-bounce" />
                  Join ZENO
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10">
                  <div className="mb-2 text-4xl">{stat.icon}</div>
                  <div className="mb-2 text-4xl font-bold text-white transition-colors group-hover:text-purple-400 lg:text-5xl">
                    {stat.number}
                  </div>
                  <div className="text-lg font-medium text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cash Out Your Works - Gumroad Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-24 dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900">
        {/* Floating Money Icons */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 animate-bounce text-6xl opacity-10">💰</div>
          <div className="absolute right-20 top-40 animate-pulse text-5xl opacity-10 delay-1000">💵</div>
          <div className="delay-2000 absolute bottom-32 left-1/4 animate-bounce text-4xl opacity-10">💳</div>
          <div className="absolute bottom-20 right-1/3 animate-pulse text-5xl opacity-10">💎</div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-16 max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-6 py-3 dark:border-green-800 dark:bg-green-900/20">
              <DollarSign className="size-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">Weekly Creator Earnings</span>
            </div>

            <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white lg:text-7xl">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                $1,943,703
              </span>
            </h2>
            <p className="mb-8 text-2xl text-gray-600 dark:text-gray-400 lg:text-3xl">
              The amount earned by AI creators on our platform last week
            </p>
            <p className="mx-auto max-w-3xl text-xl text-gray-500 dark:text-gray-500">
              From hobby to full-time income - thousands of creators are already cashing out their AI works.
              Join them and turn your creativity into consistent revenue.
            </p>
          </div>

          {/* Earnings Showcase */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-3xl">🎨</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">+$3,450</div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">AI Art Sales</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This week</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-3xl">🎵</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">+$2,890</div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Music Tracks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This week</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-3xl">🛠️</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">+$5,120</div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white">AI Tools</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">This week</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full border-0 bg-gradient-to-r from-green-600 to-emerald-600 px-12 py-6 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/25">
                <DollarSign className="mr-3 size-7" />
                Join ZENO & Earn
                <ArrowRight className="ml-3 size-7" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Help People Find Your Creation Easily */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 size-20 animate-bounce rounded-full bg-purple-200 opacity-20 dark:bg-purple-800"></div>
          <div className="absolute right-20 top-40 size-16 animate-pulse rounded-full bg-pink-200 opacity-30 dark:bg-pink-800"></div>
          <div className="absolute bottom-32 left-1/4 size-12 animate-bounce rounded-full bg-blue-200 opacity-25 delay-1000 dark:bg-blue-800"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white lg:text-6xl">
              Help People Find Your
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creation Easily
              </span>
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Our intelligent discovery system ensures your AI creations reach the right audience at the right time.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {discoveryFeatures.map((feature, index) => (
              <div key={index} className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-purple-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600">
                <div className="mb-6 text-6xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Optimization Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 py-24">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 size-72 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 size-96 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl delay-1000"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 backdrop-blur-sm">
              <BarChart3 className="size-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Like Sora & Top AI Platforms</span>
            </div>

            <h2 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
              Optimize Your
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI Product SEO
              </span>
            </h2>
            <p className="text-2xl leading-relaxed text-gray-300">
              Professional SEO tools and analytics, just like Sora creators use to maximize their reach and earnings.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {seoFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-white/20">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}></div>

                  <div className={`size-16 bg-gradient-to-r ${feature.gradient} mb-6 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon className="size-8 text-white" />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 py-24 dark:from-gray-900 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white lg:text-6xl">
              Success Stories from
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Real Creators
              </span>
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              See how creators are turning their AI skills into life-changing income streams.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:border-purple-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-current text-yellow-400" />
                  ))}
                  {testimonial.verified && (
                    <div className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      ✓ Verified
                    </div>
                  )}
                </div>

                <p className="mb-6 italic leading-relaxed text-gray-700 dark:text-gray-300">
                  "
                  {testimonial.quote}
                  "
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="mr-4 size-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {testimonial.earnings}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Monthly
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Creators Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 py-24 dark:from-gray-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white lg:text-6xl">
              Our
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> ZENO Creators</span>
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              ∞ Meet the talented creators who explore infinite possibilities with ZENO and push the boundaries of AI creation.
            </p>
          </div>

          {/* Horizontal Scrolling Creators */}
          <div className="relative">
            <div className="scrollbar-hide flex gap-8 overflow-x-auto pb-6">
              {creators.map((creator, index) => (
                <div key={index} className="group w-80 shrink-0 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:border-purple-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600">
                  <div className="mb-6 flex items-center">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="size-16 rounded-full border-4 border-purple-200 object-cover dark:border-purple-800"
                      />
                      <div className="absolute -right-2 -top-2 text-2xl">{creator.badge}</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                        {creator.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {creator.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Products</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">{creator.products}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Earnings</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{creator.earnings}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Specialty:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{creator.specialty}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full rounded-full border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 group-hover:scale-105">
                      <Heart className="mr-2 size-4" />
                      Follow ZENO Creator
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Fade Effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-indigo-50 to-transparent dark:from-gray-800"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-indigo-50 to-transparent dark:from-gray-800"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-20 max-w-4xl text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white lg:text-6xl">
              Why Choose Our
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Marketplace?
              </span>
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Everything you need to share, find, and trade AI-generated content in one powerful platform.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-500 hover:scale-105 hover:border-purple-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-600">
                  <div className={`size-16 bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <Icon className="size-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-32">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 size-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/5"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-8 text-5xl font-bold text-white lg:text-7xl">
              Ready to Explore
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                ZENO?
              </span>
            </h2>
            <p className="mx-auto mb-16 max-w-4xl text-2xl leading-relaxed text-gray-300 lg:text-3xl">
              ∞ Discover infinite possibilities in AI creation.
              Where every creator matters and innovation knows no bounds.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/marketplace">
                <Button size="lg" className="group rounded-full bg-white px-12 py-6 text-2xl font-bold text-purple-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-white/25">
                  <Zap className="mr-3 size-7 group-hover:animate-pulse" />
                  Explore ZENO
                  <ArrowRight className="ml-3 size-7 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="group rounded-full border-2 border-purple-400/80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-12 py-6 text-2xl font-bold text-purple-100 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:from-purple-400/40 hover:to-pink-400/40 hover:text-white">
                  <Star className="mr-3 size-7 group-hover:animate-spin" />
                  Join ZENO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
