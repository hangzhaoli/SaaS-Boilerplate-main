'use client';

import { Award, Globe, Heart, Rocket, Shield, Users, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  const values = [
    {
      icon: Rocket,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible with AI technology and creative expression.',
    },
    {
      icon: Users,
      title: 'Creator-Centric',
      description: 'Every decision we make is focused on empowering creators and helping them succeed.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and transparency in all our operations.',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Building bridges between creators worldwide, fostering collaboration and growth.',
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former AI researcher at Google, passionate about democratizing AI creativity.',
      avatar: 'https://picsum.photos/200/200?random=40',
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO',
      bio: 'Ex-Tesla engineer with 10+ years in machine learning and platform architecture.',
      avatar: 'https://picsum.photos/200/200?random=41',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'Former product lead at Adobe, expert in creator tools and user experience.',
      avatar: 'https://picsum.photos/200/200?random=42',
    },
    {
      name: 'Maya Patel',
      role: 'Head of Community',
      bio: 'Creator advocate with experience building communities at Patreon and Discord.',
      avatar: 'https://picsum.photos/200/200?random=43',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Active Creators', icon: Users },
    { number: '$2M+', label: 'Creator Earnings', icon: Zap },
    { number: '100K+', label: 'AI Products', icon: Award },
    { number: '150+', label: 'Countries', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-6xl font-bold">About ZENO</h1>
          <p className="mx-auto mb-8 max-w-3xl text-2xl opacity-90">
            ∞ We believe in infinite possibilities. ZENO is more than a marketplace—
            it's a movement to democratize AI creativity and empower every creator to reach their full potential.
          </p>
          <div className="text-6xl opacity-20">∞</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-20 text-center">
          <h2 className="mb-8 text-5xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
              To create a world where AI amplifies human creativity, not replaces it.
              Where every creator, regardless of technical background, can harness the power of AI
              to bring their visions to life and build sustainable creative businesses.
            </p>
            <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-8 dark:from-purple-900/20 dark:to-pink-900/20">
              <p className="text-xl font-medium text-purple-800 dark:text-purple-200">
                "We're not just building a platform—we're nurturing an ecosystem where creativity knows no bounds."
              </p>
              <p className="mt-4 text-lg text-purple-600 dark:text-purple-400">
                - Alex Chen, Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center transition-all hover:scale-105">
                  <CardContent className="p-8">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-purple-100 p-4 dark:bg-purple-900/20">
                        <Icon className="size-8 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="mb-2 text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {stat.number}
                    </div>
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                        <Icon className="size-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-2xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card key={index} className="text-center transition-all hover:scale-105">
                <CardContent className="p-8">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="mx-auto mb-4 size-24 rounded-full object-cover"
                  />
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mb-4 font-medium text-purple-600 dark:text-purple-400">
                    {member.role}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Our Story
          </h2>
          <div className="mx-auto max-w-4xl space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-purple-600">The Beginning</h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  ZENO was born from a simple observation: AI was revolutionizing creativity,
                  but the tools were scattered, complex, and inaccessible to most creators.
                  We envisioned a world where AI creativity was as easy as sharing a photo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-purple-600">The Challenge</h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Traditional marketplaces weren't built for AI-generated content.
                  Creators struggled with discoverability, fair pricing, and building sustainable businesses.
                  We knew we had to build something different.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-purple-600">The Solution</h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  ZENO combines the best of AI technology with human creativity.
                  Our platform doesn't just host content—it actively promotes creators,
                  optimizes discoverability, and provides tools for sustainable growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Join the ZENO Revolution</h2>
          <p className="mb-8 text-xl opacity-90">
            ∞ Be part of the infinite possibilities in AI creativity
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Heart className="mr-2 size-5" />
              Start Creating
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Users className="mr-2 size-5" />
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
