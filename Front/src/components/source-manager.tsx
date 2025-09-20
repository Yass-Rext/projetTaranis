import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Globe, Rss, Database, AlertCircle, CheckCircle, XCircle, Settings, Plus } from "lucide-react";

interface Source {
  id: string;
  name: string;
  type: "RSS" | "API" | "OSINT" | "CTI" | "Manual";
  url: string;
  status: "active" | "inactive" | "error";
  lastUpdate: string;
  reliability: number;
  articlesCount: number;
  category: string;
}

const mockSources: Source[] = [
  {
    id: "1",
    name: "CERT Sénégal",
    type: "RSS",
    url: "https://cert.sn/feeds/alerts",
    status: "active",
    lastUpdate: "2025-01-20T14:30:00Z",
    reliability: 95,
    articlesCount: 234,
    category: "Gouvernemental"
  },
  {
    id: "2",
    name: "MITRE ATT&CK",
    type: "API",
    url: "https://attack.mitre.org/api",
    status: "active", 
    lastUpdate: "2025-01-20T14:25:00Z",
    reliability: 98,
    articlesCount: 1456,
    category: "Threat Intelligence"
  },
  {
    id: "3",
    name: "AlienVault OTX",
    type: "API",
    url: "https://otx.alienvault.com/api",
    status: "active",
    lastUpdate: "2025-01-20T14:20:00Z", 
    reliability: 92,
    articlesCount: 3456,
    category: "IOC Feed"
  },
  {
    id: "4",
    name: "CyberThreat Alliance",
    type: "CTI",
    url: "https://cyberthreatalliance.org/feed",
    status: "error",
    lastUpdate: "2025-01-20T12:15:00Z",
    reliability: 89,
    articlesCount: 567,
    category: "Industry"
  },
  {
    id: "5",
    name: "Dark Web Monitoring",
    type: "OSINT", 
    url: "internal://darkweb-crawler",
    status: "active",
    lastUpdate: "2025-01-20T14:35:00Z",
    reliability: 75,
    articlesCount: 123,
    category: "Underground"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "RSS":
      return <Rss className="h-4 w-4" />;
    case "API":
      return <Database className="h-4 w-4" />;
    case "OSINT":
      return <Globe className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export function SourceManager() {
  const activeSourcesCount = mockSources.filter(s => s.status === "active").length;
  const totalArticles = mockSources.reduce((sum, s) => sum + s.articlesCount, 0);
  const avgReliability = mockSources.reduce((sum, s) => sum + s.reliability, 0) / mockSources.length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Sources Actives</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">{activeSourcesCount}</div>
            <p className="text-xs text-muted-foreground">
              /{mockSources.length} sources totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Articles Collectés</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-500">{totalArticles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Dernières 30 jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Fiabilité Moyenne</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">{avgReliability.toFixed(1)}%</div>
            <Progress value={avgReliability} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Dernière Sync</CardTitle>
            <Globe className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-500">2min</div>
            <p className="text-xs text-muted-foreground">
              Synchronisation auto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Source Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion des Sources</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Source
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="categories">Catégories</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sources" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Fiabilité</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Dernière MAJ</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(source.type)}
                          <div>
                            <div className="font-medium">{source.name}</div>
                            <div className="text-sm text-muted-foreground">{source.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{source.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(source.status)}
                          <span className="capitalize">{source.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{source.reliability}%</span>
                          <Progress value={source.reliability} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>{source.articlesCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(source.lastUpdate).toLocaleString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch checked={source.status === "active"} />
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Gouvernemental", "Threat Intelligence", "IOC Feed", "Industry", "Underground", "Commercial"].map((category) => (
                  <Card key={category}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{category}</h4>
                        <Badge variant="secondary">
                          {mockSources.filter(s => s.category === category).length}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="config" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Synchronisation Automatique</h4>
                    <p className="text-sm text-muted-foreground">Collecter automatiquement les nouvelles données</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alertes en Temps Réel</h4>
                    <p className="text-sm text-muted-foreground">Notifications pour les nouvelles menaces critiques</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Archivage Automatique</h4>
                    <p className="text-sm text-muted-foreground">Archiver les données anciennes automatiquement</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}