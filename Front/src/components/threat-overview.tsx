import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AlertTriangle, Shield, Activity, Globe } from "lucide-react";

interface ThreatData {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  type: string;
  location: string;
  timestamp: string;
  description: string;
}

const mockThreats: ThreatData[] = [
  {
    id: "1",
    title: "APT Group Targeting African Banking Sector",
    severity: "critical",
    type: "Advanced Persistent Threat",
    location: "Sénégal, Côte d'Ivoire",
    timestamp: "2025-01-20T14:30:00Z",
    description: "Nouveau groupe APT ciblant les institutions financières en Afrique de l'Ouest"
  },
  {
    id: "2", 
    title: "Ransomware Campaign - LockBit Variant",
    severity: "high",
    type: "Ransomware",
    location: "Global",
    timestamp: "2025-01-20T13:15:00Z",
    description: "Nouvelle variante de LockBit détectée ciblant les infrastructures critiques"
  },
  {
    id: "3",
    title: "Phishing Campaign Targeting Government",
    severity: "medium",
    type: "Phishing",
    location: "Sénégal",
    timestamp: "2025-01-20T12:45:00Z",
    description: "Campagne de phishing ciblant les employés gouvernementaux sénégalais"
  }
];

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500", 
  medium: "bg-yellow-500",
  low: "bg-blue-500"
};

const severityLabels = {
  critical: "Critique",
  high: "Élevé",
  medium: "Moyen", 
  low: "Faible"
};

export function ThreatOverview() {
  const criticalCount = mockThreats.filter(t => t.severity === "critical").length;
  const highCount = mockThreats.filter(t => t.severity === "high").length;
  const totalThreats = mockThreats.length;

  return (
    <div className="space-y-6">
      {/* Threat Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Menaces Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">
              Dernières 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Alertes Actives</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">{highCount + criticalCount}</div>
            <p className="text-xs text-muted-foreground">
              Nécessitent une action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Sources Actives</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-500">127</div>
            <p className="text-xs text-muted-foreground">
              Sources surveillées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Niveau de Sécurité</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">75%</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Threats */}
      <Card>
        <CardHeader>
          <CardTitle>Menaces Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockThreats.map((threat) => (
              <div key={threat.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${severityColors[threat.severity]}`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{threat.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {severityLabels[threat.severity]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{threat.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{threat.type}</span>
                    <span>•</span>
                    <span>{threat.location}</span>
                    <span>•</span>
                    <span>{new Date(threat.timestamp).toLocaleString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}