import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Shield, Brain, FileText, Target, AlertTriangle, TrendingUp, Globe, Hash } from "lucide-react";

interface ThreatIntel {
  id: string;
  title: string;
  type: "IOC" | "TTPs" | "Campaign" | "Actor" | "Malware";
  confidence: number;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  tags: string[];
  description: string;
  indicators: string[];
  mitreAttack: string[];
  createdAt: string;
  lastSeen: string;
}

interface Analysis {
  id: string;
  title: string;
  analyst: string;
  status: "draft" | "review" | "published";
  threats: string[];
  summary: string;
  recommendations: string[];
  createdAt: string;
}

const mockThreatIntel: ThreatIntel[] = [
  {
    id: "TI-2025-001",
    title: "Lazarus Group - Nouvelles campagnes en Afrique",
    type: "Actor",
    confidence: 85,
    severity: "critical",
    source: "MITRE ATT&CK",
    tags: ["APT", "North Korea", "Banking", "Africa"],
    description: "Le groupe Lazarus élargit ses opérations vers l'Afrique de l'Ouest, ciblant spécifiquement les infrastructures financières.",
    indicators: ["192.168.1.100", "lazarus-banking.exe", "btc1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"],
    mitreAttack: ["T1566.001", "T1059.003", "T1041"],
    createdAt: "2025-01-20T10:00:00Z",
    lastSeen: "2025-01-20T14:30:00Z"
  },
  {
    id: "TI-2025-002",
    title: "LockBit 3.0 - Nouvelle variante détectée",
    type: "Malware",
    confidence: 92,
    severity: "high",
    source: "CyberThreat Alliance",
    tags: ["Ransomware", "LockBit", "Encryption"],
    description: "Nouvelle variante de LockBit avec des capacités d'évasion améliorées et un chiffrement plus rapide.",
    indicators: ["lockbit3.exe", "C2: 45.33.32.156", "mutex: LB3_MUTEX_2025"],
    mitreAttack: ["T1486", "T1083", "T1012"],
    createdAt: "2025-01-19T16:20:00Z",
    lastSeen: "2025-01-20T13:45:00Z"
  },
  {
    id: "TI-2025-003",
    title: "Campagne Phishing - Faux Ministères",
    type: "Campaign",
    confidence: 78,
    severity: "medium",
    source: "CERT-SN",
    tags: ["Phishing", "Government", "Social Engineering"],
    description: "Campagne de phishing imitant les communications officielles des ministères sénégalais.",
    indicators: ["ministere-economie-sn.com", "gouv-senegal.net"],
    mitreAttack: ["T1566.002", "T1204.002"],
    createdAt: "2025-01-19T09:15:00Z",
    lastSeen: "2025-01-20T11:20:00Z"
  }
];

const mockAnalyses: Analysis[] = [
  {
    id: "ANAL-2025-001",
    title: "Analyse Mensuelle - Menaces Cyber Sénégal",
    analyst: "Dr. Fatou Diop",
    status: "published",
    threats: ["TI-2025-001", "TI-2025-003"],
    summary: "Augmentation significative des attaques ciblant le secteur public sénégalais avec une sophistication croissante des techniques utilisées.",
    recommendations: [
      "Renforcer la sensibilisation des employés gouvernementaux",
      "Mettre à jour les systèmes de détection d'intrusion",
      "Améliorer la coordination entre CERT-SN et les institutions"
    ],
    createdAt: "2025-01-15T14:00:00Z"
  },
  {
    id: "ANAL-2025-002", 
    title: "Rapport Tactique - Groupe Lazarus",
    analyst: "Amadou Ba",
    status: "review",
    threats: ["TI-2025-001"],
    summary: "Analyse détaillée des TTPs du groupe Lazarus et de leur adaptation au contexte africain.",
    recommendations: [
      "Surveillance accrue des flux financiers internationaux",
      "Partage d'IOC avec les partenaires régionaux",
      "Formation spécialisée pour les équipes SOC"
    ],
    createdAt: "2025-01-18T10:30:00Z"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Actor":
      return <Target className="h-4 w-4" />;
    case "Malware":
      return <AlertTriangle className="h-4 w-4" />;
    case "Campaign":
      return <TrendingUp className="h-4 w-4" />;
    case "IOC":
      return <Hash className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500"
};

export function ThreatIntelligence() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Intel Actifs</CardTitle>
            <Brain className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-500">{mockThreatIntel.length}</div>
            <p className="text-xs text-muted-foreground">
              Renseignements disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Confiance Moyenne</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">
              {Math.round(mockThreatIntel.reduce((sum, t) => sum + t.confidence, 0) / mockThreatIntel.length)}%
            </div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Analyses Publiées</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-500">
              {mockAnalyses.filter(a => a.status === "published").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Sources CTI</CardTitle>
            <Globe className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">12</div>
            <p className="text-xs text-muted-foreground">
              Sources actives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Intelligence Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Threat Intelligence</CardTitle>
            <Button size="sm">
              Nouvel Intel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="intelligence">
            <TabsList>
              <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="reports">Rapports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="intelligence" className="mt-4">
              <div className="space-y-4">
                {mockThreatIntel.map((intel) => (
                  <Card key={intel.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(intel.type)}
                            <span className="font-mono text-sm">{intel.id}</span>
                            <Badge variant="outline">{intel.type}</Badge>
                            <div className={`w-3 h-3 rounded-full ${severityColors[intel.severity]}`} />
                          </div>
                          
                          <h4 className="font-medium">{intel.title}</h4>
                          <p className="text-sm text-muted-foreground">{intel.description}</p>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">Confiance:</span>
                              <Progress value={intel.confidence} className="w-16" />
                              <span className="text-xs">{intel.confidence}%</span>
                            </div>
                            <Badge variant="secondary">{intel.source}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {intel.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                              <h5 className="font-medium mb-2">Indicateurs:</h5>
                              <ul className="space-y-1">
                                {intel.indicators.map((indicator, idx) => (
                                  <li key={idx} className="font-mono bg-gray-100 p-1 rounded">
                                    {indicator}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">MITRE ATT&CK:</h5>
                              <div className="flex flex-wrap gap-1">
                                {intel.mitreAttack.map((technique) => (
                                  <Badge key={technique} variant="outline" className="text-xs">
                                    {technique}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Créé: {new Date(intel.createdAt).toLocaleString('fr-FR')} • 
                            Dernière observation: {new Date(intel.lastSeen).toLocaleString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analyses" className="mt-4">
              <div className="space-y-4">
                {mockAnalyses.map((analysis) => (
                  <Card key={analysis.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-4 w-4" />
                            <span className="font-mono text-sm">{analysis.id}</span>
                            <Badge variant={analysis.status === "published" ? "default" : "secondary"}>
                              {analysis.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir Détails
                          </Button>
                        </div>
                        
                        <h4 className="font-medium">{analysis.title}</h4>
                        <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                        
                        <div>
                          <h5 className="font-medium mb-2">Recommandations:</h5>
                          <ul className="text-sm space-y-1">
                            {analysis.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-blue-500">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Analyste: {analysis.analyst} • 
                          Créé: {new Date(analysis.createdAt).toLocaleString('fr-FR')}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Générateur de Rapports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Titre du Rapport</label>
                    <input 
                      className="w-full mt-1 p-2 border rounded-md"
                      placeholder="Rapport mensuel des menaces..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Période</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <input type="date" className="p-2 border rounded-md" />
                      <input type="date" className="p-2 border rounded-md" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Résumé Exécutif</label>
                    <Textarea 
                      className="mt-1"
                      placeholder="Résumé des principales menaces et tendances observées..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button>Générer Rapport</Button>
                    <Button variant="outline">Prévisualiser</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}