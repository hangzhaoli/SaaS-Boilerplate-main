'use client';

import { Clock, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
    });
  };

  const supportChannels = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: '24/7 Available',
      action: 'Start Chat',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: 'Response within 4 hours',
      action: 'Send Email',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Contact Support</h1>
          <p className="text-xl opacity-90">∞ We're here to help you succeed on ZENO</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Support Channels */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="text-center transition-all hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full ${channel.bgColor}`}>
                    <Icon className={`size-8 ${channel.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{channel.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">{channel.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="size-4" />
                    {channel.availability}
                  </div>
                  <Button className="w-full">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-3xl">Send us a Message</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Subject *</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Account or billing issue</option>
                    <option value="high">High - Technical problem</option>
                    <option value="urgent">Urgent - Critical issue affecting earnings</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Please describe your issue in detail..."
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Send className="mr-2 size-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ & Resources */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Before You Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-600">Check our Help Center</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Most questions are answered in our comprehensive help documentation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">Search the Community</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Other creators may have experienced similar issues and found solutions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">Check System Status</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify if there are any ongoing platform issues or maintenance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Live Chat</span>
                  <span className="text-green-600">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Email Support</span>
                  <span className="text-blue-600">24/7 (4hr response)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Phone Support</span>
                  <span className="text-purple-600">Mon-Fri 9AM-6PM EST</span>
                </div>
                <div className="mt-4 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Priority Support:</strong>
                    {' '}
                    ZENO Pro subscribers receive priority handling and faster response times.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  For critical issues affecting your earnings or account security:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-red-600" />
                    <span className="font-mono">+1 (555) 123-ZENO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-red-600" />
                    <span className="font-mono">emergency@zeno.ai</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
