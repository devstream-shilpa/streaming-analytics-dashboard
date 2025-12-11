import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./App.css";

// --- Mock data ---

const dailyWatchTime = [
  { date: "Mon", hours: 1200 },
  { date: "Tue", hours: 1450 },
  { date: "Wed", hours: 1600 },
  { date: "Thu", hours: 1550 },
  { date: "Fri", hours: 1900 },
  { date: "Sat", hours: 2200 },
  { date: "Sun", hours: 2100 },
];

const topShows = [
  { title: "Midnight Code", hours: 850 },
  { title: "Data Dreams", hours: 720 },
  { title: "Cloud City", hours: 610 },
  { title: "Bug Hunters", hours: 540 },
  { title: "Fintech Files", hours: 480 },
];

const deviceUsage = [
  { device: "TV", percentage: 45 },
  { device: "Mobile", percentage: 30 },
  { device: "Tablet", percentage: 10 },
  { device: "Web", percentage: 15 },
];

const sessionStats = [
  { day: "Mon", avgMinutes: 38, completionRate: 0.62 },
  { day: "Tue", avgMinutes: 41, completionRate: 0.66 },
  { day: "Wed", avgMinutes: 43, completionRate: 0.69 },
  { day: "Thu", avgMinutes: 40, completionRate: 0.64 },
  { day: "Fri", avgMinutes: 48, completionRate: 0.72 },
  { day: "Sat", avgMinutes: 52, completionRate: 0.76 },
  { day: "Sun", avgMinutes: 50, completionRate: 0.74 },
];

// Aggregate metrics
const totalWatchHours = dailyWatchTime.reduce((sum, d) => sum + d.hours, 0);
const avgSessionLength = Math.round(
  sessionStats.reduce((sum, d) => sum + d.avgMinutes, 0) / sessionStats.length
);
const avgCompletion =
  sessionStats.reduce((sum, d) => sum + d.completionRate, 0) /
  sessionStats.length;
const completionPercentage = Math.round(avgCompletion * 100);
const estimatedActiveUsers = 48000; // mock metric

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

function KpiCard({ label, value, subtitle }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
  );
}

function App() {
  const [selectedShow, setSelectedShow] = useState(null);

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1 className="app-title">Streaming Engagement Analytics</h1>
          <p className="app-subtitle">
            A mock dashboard inspired by streaming platforms like Netflix, built
            to demonstrate data storytelling, front-end development, and
            visualization design.
          </p>
        </div>
        <div className="badge">React + Recharts</div>
      </header>

      {/* KPI Row */}
      <section className="kpi-row">
        <KpiCard
          label="Total Weekly Watch Time"
          value={`${(totalWatchHours / 1000).toFixed(1)}k hrs`}
          subtitle="Across all shows & devices"
        />
        <KpiCard
          label="Estimated Active Users"
          value={estimatedActiveUsers.toLocaleString()}
          subtitle="Weekly active viewers"
        />
        <KpiCard
          label="Avg Session Length"
          value={`${avgSessionLength} min`}
          subtitle="Per viewing session"
        />
        <KpiCard
          label="Avg Completion Rate"
          value={`${completionPercentage}%`}
          subtitle="Episodes watched to completion"
        />
      </section>

      {/* Main chart grid */}
      <section className="grid">
        {/* Watch time over time */}
        <div className="panel panel-large">
          <div className="panel-header">
            <h2>Watch Time Trend</h2>
            <p>Daily total hours watched across the catalog.</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyWatchTime}>
              <defs>
                <linearGradient id="colorWatch" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorWatch)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top shows */}
        <div className="panel">
          <div className="panel-header">
            <h2>Top Shows by Watch Time</h2>
            <p>Which titles are driving the most engagement this week?</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topShows}
              layout="vertical"
              margin={{ left: 60, right: 10 }}
              onClick={(e) => {
                if (e && e.activeLabel) {
                  setSelectedShow(e.activeLabel);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="title" type="category" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="hours"
                name="Watch hours"
                radius={[4, 4, 4, 4]}
                fill="#82ca9d"
              />
            </BarChart>
          </ResponsiveContainer>
          {selectedShow && (
            <p className="panel-footnote">
              You selected <strong>{selectedShow}</strong> — imagine drilling
              into retention, completion, and cohort trends for this title.
            </p>
          )}
        </div>

        {/* Device usage */}
        <div className="panel">
          <div className="panel-header">
            <h2>Device Breakdown</h2>
            <p>How viewers are watching content across platforms.</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={deviceUsage}
                dataKey="percentage"
                nameKey="device"
                outerRadius={80}
                label={(entry) => `${entry.device} (${entry.percentage}%)`}
              >
                {deviceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Session stats */}
        <div className="panel">
          <div className="panel-header">
            <h2>Session Length & Completion</h2>
            <p>
              Are viewers sticking around longer on weekends? How does that
              affect completion rates?
            </p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sessionStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 1]}
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "completionRate") {
                    return `${Math.round(value * 100)}%`;
                  }
                  return value;
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="avgMinutes"
                name="Avg session (min)"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="completionRate"
                name="Completion rate"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Storytelling section */}
      <section className="story-panel">
        <h2>Data Story: How This Dashboard Would Be Used</h2>
        <p>
          This dashboard is designed for a content or product analytics team at
          a streaming company. Watch time and active users indicate overall
          health, while top shows help identify breakout titles that may deserve
          more marketing or similar content investment.
        </p>
        <p>
          Device breakdown reveals where engagement is strongest (for example,
          TVs vs. mobile), which can inform UI experiments, platform-specific
          optimizations, or release strategies. Session length and completion
          rate trends across days of the week can help teams decide when to
          launch new seasons, how to tune recommendation algorithms, or which
          cohorts to target with retention campaigns.
        </p>
        <p>
          While this example uses synthetic data, the same structure could be
          extended to real-world metrics, A/B test results, and personalization
          experiments—making it a practical foundation for streaming analytics
          at scale.
        </p>
      </section>
    </div>
  );
}

export default App;
