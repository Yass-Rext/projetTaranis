import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { AlertTriangle, Clock, CheckCircle, XCircle, Eye, Edit, Filter } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "investigating" | "resolved" | "closed";
  type: string;
  affected: string[];
  reporter: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  impact: "high" | "medium" | "low";
}

const mockIncidents: Incident[] = [
  {
    id: "INC-2025-001",
    title: "Compromission Infrastructure Bancaire",
    description: "Détection d'activités suspectes sur les serveurs de la Banque Centrale du Sénégal",
    severity: "critical",
    status: "investigating",
    type: "Data Breach",
    affected: ["Banque Centrale", "Système SWIFT"],
    reporter: "CERT-SN",
    assignee: "Équipe Réponse",
    createdAt: "2025-01-20T10:30:00Z",
    updatedAt: "2025-01-20T14:15:00Z",
    location: "Dakar, Sénégal",
    impact: "high"
  },
  {
    id: "INC-2025-002", 
    title: "Campagne Phishing Gouvernementale",
    description: "Emails malveillants ciblant les employés du Ministère de l'Économie",
    severity: "high",
    status: "open",
    type: "Phishing Campaign",
    affected: ["Ministère Économie", "Fonctionnaires"],
    reporter: "Employé Ministère",
    assignee: "Analyste Junior",
    createdAt: "2025-01-20T09:15:00Z",
    updatedAt: "2025-01-20T13:45:00Z",
    location: "Dakar, Sénégal",
    impact: "medium"
  },
  {
    id: "INC-2025-003",
    title: "Défacement Site Web Municipal",
    description: "Site officiel de la Mairie de Thiès défacé par des cybercriminels",
    severity: "medium",
    status: "resolved",
    type: "Website Defacement",
    affected: ["Mairie Thiès", "Services Citoyens"],
    reporter: "Administrateur IT",
    assignee: "Équipe Web",
    createdAt: "2025-01-19T16:20:00Z",
    updatedAt: "2025-01-20T08:30:00Z",
    location: "Thiès, Sénégal",
    impact: "low"
  },
  {
    id: "INC-2025-004",
    title: "Ransomware Hôpital Principal",
    description: "Infection ransomware paralysant les systèmes de l'Hôpital Principal de Dakar",
    severity: "critical",
    status: "investigating",
    type: "Ransomware",
    affected: ["Hôpital Principal", "Systèmes Médicaux"],
    reporter: "DSI Hôpital",
    assignee: "Équipe Urgence",
    createdAt: "2025-01-19T22:45:00Z",
    updatedAt: "2025-01-20T14:00:00Z",
    location: "Dakar, Sénégal",
    impact: "high"
  }
];

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500"
};

const statusColors = {
  open: "bg-red-500",
  investigating: "bg-orange-500", 
  resolved: "bg-green-500",
  closed: "bg-gray-500"
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "investigating":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "closed":
      return <XCircle className="h-4 w-4 text-gray-500" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export function IncidentTracker() {
  const openIncidents = mockIncidents.filter(i => i.status === "open").length;
  const criticalIncidents = mockIncidents.filter(i => i.severity === "critical").length;
  const investigatingIncidents = mockIncidents.filter(i => i.status === "investigating").length;
  const resolvedToday = mockIncidents.filter(i => 
    i.status === "resolved" && 
    new Date(i.updatedAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Incidents Ouverts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500">{openIncidents}</div>
            <p className="text-xs text-muted-foreground">
              Nécessitent une action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Incidents Critiques</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{criticalIncidents}</div>
            <p className="text-xs text-muted-foreground">
              Priorité maximale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">En Investigation</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-500">{investigatingIncidents}</div>
            <p className="text-xs text-muted-foreground">
              En cours de traitement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Résolus Aujourd'hui</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-500">{resolvedToday}</div>
            <p className="text-xs text-muted-foreground">
              Incidents fermés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Incident Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Suivi des Incidents</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                Nouvel Incident
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Actifs ({openIncidents + investigatingIncidents})</TabsTrigger>
              <TabsTrigger value="resolved">Résolus</TabsTrigger>
              <TabsTrigger value="all">Tous</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Assigné à</TableHead>
                    <TableHead>Dernière MAJ</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIncidents
                    .filter(i => i.status === "open" || i.status === "investigating")
                    .map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono text-sm">{incident.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-muted-foreground">{incident.type}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${severityColors[incident.severity]}`} />
                          <Badge variant="outline" className="capitalize">
                            {incident.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(incident.status)}
                          <span className="capitalize">{incident.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell>{incident.assignee}</TableCell>
                      <TableCell>
                        {new Date(incident.updatedAt).toLocaleString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Résolution</TableHead>
                    <TableHead>Temps de Résolution</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockIncidents
                    .filter(i => i.status === "resolved" || i.status === "closed")
                    .map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono text-sm">{incident.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-muted-foreground">{incident.type}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Résolu
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {Math.round((new Date(incident.updatedAt).getTime() - new Date(incident.createdAt).getTime()) / (1000 * 60 * 60))}h
                      </TableCell>
                      <TableCell>
                        <Badge variant={incident.impact === "high" ? "destructive" : "secondary"}>
                          {incident.impact}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {mockIncidents.map((incident) => (
                  <Card key={incident.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm">{incident.id}</span>
                            <Badge variant="outline" className="capitalize">
                              {incident.severity}
                            </Badge>
                            {getStatusIcon(incident.status)}
                          </div>
                          <h4 className="font-medium">{incident.title}</h4>
                          <p className="text-sm text-muted-foreground">{incident.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{incident.location}</span>
                            <span>•</span>
                            <span>{incident.assignee}</span>
                            <span>•</span>
                            <span>{new Date(incident.createdAt).toLocaleString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}