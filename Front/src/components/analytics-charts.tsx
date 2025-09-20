import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const threatTrendData = [
  { month: "Jan", malware: 45, phishing: 23, ransomware: 12, apt: 8 },
  { month: "Fév", malware: 52, phishing: 28, ransomware: 15, apt: 11 },
  { month: "Mar", malware: 48, phishing: 31, ransomware: 18, apt: 9 },
  { month: "Avr", malware: 61, phishing: 35, ransomware: 22, apt: 14 },
  { month: "Mai", malware: 55, phishing: 42, ransomware: 25, apt: 16 },
  { month: "Jun", malware: 67, phishing: 38, ransomware: 28, apt: 18 }
];

const severityData = [
  { name: "Critique", value: 234, color: "#ef4444" },
  { name: "Élevé", value: 456, color: "#f97316" },
  { name: "Moyen", value: 789, color: "#eab308" },
  { name: "Faible", value: 345, color: "#3b82f6" }
];

const sourceData = [
  { source: "OSINT", incidents: 145 },
  { source: "Honeypots", incidents: 89 },
  { source: "Feeds CTI", incidents: 234 },
  { source: "Partenaires", incidents: 67 },
  { source: "Internes", incidents: 123 },
  { source: "Signalements", incidents: 98 }
];

const geographicData = [
  { region: "Afrique de l'Ouest", incidents: 89, senegal: 34 },
  { region: "Europe", incidents: 234, senegal: 0 },
  { region: "Amérique du Nord", incidents: 345, senegal: 0 },
  { region: "Asie", incidents: 456, senegal: 0 },
  { region: "Océanie", incidents: 23, senegal: 0 },
  { region: "Amérique du Sud", incidents: 67, senegal: 0 }
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Threat Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tendances des Menaces (6 derniers mois)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="malware" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.7} />
              <Area type="monotone" dataKey="phishing" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.7} />
              <Area type="monotone" dataKey="ransomware" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.7} />
              <Area type="monotone" dataKey="apt" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution par Sévérité</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sources Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse des Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="source" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="incidents" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Géographique</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="incidents" fill="#3b82f6" name="Total Incidents" />
              <Bar dataKey="senegal" fill="#ef4444" name="Incidents Sénégal" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}