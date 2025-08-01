'use client';

import { Briefcase, Globe, Heart, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CareersPage = () => {
  const openPositions = [
    {
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Build and optimize AI models for content generation and recommendation systems.',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      description: 'Design intuitive experiences for creators and help shape the future of AI creativity.',
    },
    {
      title: 'Community Manager',
      department: 'Community',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      description: 'Build and nurture our global community of AI creators and foster engagement.',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive growth and awareness for ZENO across digital channels and creator communities.',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness stipends.',
    },
    {
      icon: Globe,
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours and quarterly team retreats.',
    },
    {
      icon: Users,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and mentorship programs.',
    },
    {
      icon: Briefcase,
      title: 'Equity & Ownership',
      description: 'Competitive equity packages and profit-sharing for all employees.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-6xl font-bold">Join ZENO</h1>
          <p className="mx-auto mb-8 max-w-3xl text-2xl opacity-90">
            ∞ Help us build the future of AI creativity. Join a team that's passionate about
            empowering creators and pushing the boundaries of what's possible.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            View Open Positions
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Culture Section */}
        <div className="mb-20 text-center">
          <h2 className="mb-8 text-5xl font-bold text-gray-900 dark:text-white">Our Culture</h2>
          <div className="mx-auto max-w-4xl">
            <p className="mb-12 text-2xl leading-relaxed text-gray-700 dark:text-gray-300">
              At ZENO, we believe that the best work happens when people are empowered to be creative,
              take ownership, and make a meaningful impact. We're building more than a product—
              we're creating a movement.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Why Work at ZENO?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                        <Icon className="size-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {position.title}
                      </h3>
                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {position.location}
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                          {position.type}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {position.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-20">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Our Hiring Process
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                  1
                </div>
                <h3 className="mb-2 text-xl font-bold">Apply</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Submit your application with resume and cover letter
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                  2
                </div>
                <h3 className="mb-2 text-xl font-bold">Interview</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Meet with our team to discuss your experience and goals
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                  3
                </div>
                <h3 className="mb-2 text-xl font-bold">Welcome</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join the team and start making an impact from day one
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Don't See Your Role?</h2>
          <p className="mb-8 text-xl opacity-90">
            We're always looking for talented people to join our mission. Send us your resume!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="mailto:careers@zeno.ai">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Send Your Resume
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
