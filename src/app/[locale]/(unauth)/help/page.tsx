'use client';

import { Book, FileText, HelpCircle, MessageCircle, Search, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      icon: Users,
      description: 'Learn the basics of ZENO platform',
      articles: [
        'How to create your first AI product',
        'Setting up your creator profile',
        'Understanding ZENO marketplace',
        'Payment and withdrawal guide',
      ],
    },
    {
      title: 'Selling & Creating',
      icon: FileText,
      description: 'Tips for successful AI content creation',
      articles: [
        'Best practices for AI product titles',
        'Optimizing your product descriptions',
        'Pricing strategies that work',
        'Building your creator brand',
      ],
    },
    {
      title: 'Account & Billing',
      icon: HelpCircle,
      description: 'Manage your account and payments',
      articles: [
        'Updating your payment information',
        'Understanding commission rates',
        'Tax information and reporting',
        'Account security settings',
      ],
    },
    {
      title: 'Technical Support',
      icon: MessageCircle,
      description: 'Troubleshooting and technical help',
      articles: [
        'Upload issues and solutions',
        'File format requirements',
        'Platform compatibility guide',
        'API documentation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I start selling on ZENO?',
      answer: 'Getting started is easy! Simply create an account, complete your profile, and upload your first AI creation. Our review team will approve quality content within 24 hours.',
    },
    {
      question: 'What commission does ZENO take?',
      answer: 'ZENO takes a 10% commission on all sales. This includes payment processing, hosting, marketing, and customer support. You keep 90% of every sale.',
    },
    {
      question: 'How quickly do I get paid?',
      answer: 'Payments are processed weekly. You can withdraw your earnings anytime once you reach the minimum threshold of $25. Payments typically arrive within 2-3 business days.',
    },
    {
      question: 'What types of AI content can I sell?',
      answer: 'You can sell AI-generated videos, music, images, tools, prompts, and digital assets. All content must be original and comply with our community guidelines.',
    },
    {
      question: 'How do I optimize my products for discovery?',
      answer: 'Use relevant keywords in your titles and descriptions, choose appropriate categories, add high-quality preview images, and engage with the community to boost visibility.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">ZENO Help Center</h1>
          <p className="mb-8 text-xl opacity-90">∞ Find answers to all your questions</p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-14 border-0 bg-white/90 pl-12 pr-4 text-lg text-gray-900 placeholder:text-gray-500 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Links */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/support">
            <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <MessageCircle className="mb-4 size-12 text-purple-600 group-hover:text-purple-700" />
                <h3 className="mb-2 text-xl font-bold">Contact Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Get personalized help from our team</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/help/seller-guidelines">
            <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Book className="mb-4 size-12 text-blue-600 group-hover:text-blue-700" />
                <h3 className="mb-2 text-xl font-bold">Seller Guidelines</h3>
                <p className="text-gray-600 dark:text-gray-400">Learn our content policies</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/help/commission">
            <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <FileText className="mb-4 size-12 text-green-600 group-hover:text-green-700" />
                <h3 className="mb-2 text-xl font-bold">Commission Rates</h3>
                <p className="text-gray-600 dark:text-gray-400">Understand our pricing structure</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Users className="mb-4 size-12 text-orange-600 group-hover:text-orange-700" />
                <h3 className="mb-2 text-xl font-bold">Creator Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage your products and earnings</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                        <Icon className="size-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link href="#" className="block rounded-lg p-3 text-gray-700 transition-colors hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-purple-900/20">
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700 dark:text-purple-300">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Still Need Help?</h2>
          <p className="mb-8 text-xl opacity-90">
            Our support team is here to help you succeed on ZENO
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/support">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <MessageCircle className="mr-2 size-5" />
                Contact Support
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
