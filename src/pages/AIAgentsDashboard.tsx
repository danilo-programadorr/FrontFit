import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Lightbulb,
  LineChart,
  DollarSign,
  Megaphone,
  AlertTriangle
} from 'lucide-react';

const tabs = [
  { id: 'innovation', label: 'Innovation Agent', icon: Lightbulb },
  { id: 'indicators', label: 'KPI Monitor', icon: LineChart },
  { id: 'finance', label: 'Financial Agent', icon: DollarSign },
  { id: 'marketing', label: 'Smart Marketing', icon: Megaphone },
];

const sampleChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 600 },
];

const AIAgentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('innovation');

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'innovation':
        return (
          <motion.div
            key="innovation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">New Trends & Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The agent constantly analyzes competitors and trends. Recent discovery: Competitor A is gaining traction with short-form content on TikTok.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Suggested Strategic Action</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recommend launching a weekly TikTok series aligned with fitness trends, leveraging current engagement opportunities.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'indicators':
        return (
          <motion.div
            key="indicators"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">User Growth Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sampleChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Performance Highlights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Conversion rates increased by 12% this quarter. Retention improved after UI overhaul.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'finance':
        return (
          <motion.div
            key="finance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sampleChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Financial Observations</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Revenue saw a 20% increase compared to the last quarter. Marketing spend remained stable.
              </p>
            </motion.div>
          </motion.div>
        );

      case 'marketing':
        return (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Marketing Efficiency</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sampleChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">Recent Campaign Alerts</h3>
              <div className="space-y-4">
                {['Low CTR detected on Facebook Ads', 'Email open rates dropped', 'Content campaign exceeded goals'].map((alert, index) => (
                  <div key={index} className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm">{alert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent(activeTab)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AIAgentsDashboard;
