import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

import { ThreatOverview } from "./components/threat-overview";
import { WorldThreatMap } from "./components/world-threat-map";
import { AnalyticsCharts } from "./components/analytics-charts";
import { SourceManager } from "./components/source-manager";
import { IncidentTracker } from "./components/incident-tracker";
import { ThreatIntelligence } from "./components/threat-intelligence";

import { 
  Shield, 
  Globe, 
  AlertTriangle, 
  Activity, 
  Brain, 
  Database, 
  FileText, 
  Settings, 
  Bell,
  Menu,
  Search,
  User,
  LogOut
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">Taranis AI Enhanced</h1>
                <p className="text-sm text-muted-foreground">Plateforme de Cybersécurité Avancée</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rechercher menaces, IOCs..."
              />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                12
              </Badge>
            </Button>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card h-[calc(100vh-73px)] overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Button 
              variant={activeTab === "overview" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Activity className="mr-2 h-4 w-4" />
              Vue d'ensemble
            </Button>
            
            <Button 
              variant={activeTab === "threats" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("threats")}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Menaces
            </Button>
            
            <Button 
              variant={activeTab === "incidents" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("incidents")}
            >
              <Globe className="mr-2 h-4 w-4" />
              Incidents
            </Button>
            
            <Button 
              variant={activeTab === "intelligence" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("intelligence")}
            >
              <Brain className="mr-2 h-4 w-4" />
              Threat Intelligence
            </Button>
            
            <Button 
              variant={activeTab === "sources" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("sources")}
            >
              <Database className="mr-2 h-4 w-4" />
              Sources
            </Button>
            
            <Button 
              variant={activeTab === "analytics" ? "default" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Analyses
            </Button>
          </nav>

          {/* Status Panel */}
          <div className="p-4 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Statut Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Sources</span>
                  <Badge variant="default" className="bg-green-500">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Collecte</span>
                  <Badge variant="default" className="bg-green-500">Actif</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Analyses</span>
                  <Badge variant="default" className="bg-blue-500">En cours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="p-6">
            {/* Hero Section */}
            {activeTab === "overview" && (
              <div className="mb-8">
                <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1655036387197-566206c80980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1ODM3MDAzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Cybersecurity Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-2">Centre de Cybersécurité du Sénégal</h2>
                      <p className="text-lg">Surveillance et analyse des menaces en temps réel</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <ThreatOverview />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <WorldThreatMap />
                  <Card>
                    <CardHeader>
                      <CardTitle>Alertes Récentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="flex-1">
                            <p className="font-medium">Détection APT</p>
                            <p className="text-sm text-muted-foreground">Infrastructure bancaire compromise</p>
                            <span className="text-xs text-muted-foreground">Il y a 15 min</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                          <div className="flex-1">
                            <p className="font-medium">Campagne Phishing</p>
                            <p className="text-sm text-muted-foreground">Ciblage ministères gouvernementaux</p>
                            <span className="text-xs text-muted-foreground">Il y a 32 min</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="flex-1">
                            <p className="font-medium">Scan de Ports</p>
                            <p className="text-sm text-muted-foreground">Activité suspecte détectée</p>
                            <span className="text-xs text-muted-foreground">Il y a 1h</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "threats" && <ThreatOverview />}
            {activeTab === "incidents" && <IncidentTracker />}
            {activeTab === "intelligence" && <ThreatIntelligence />}
            {activeTab === "sources" && <SourceManager />}
            {activeTab === "analytics" && <AnalyticsCharts />}
          </div>
        </main>
      </div>
    </div>
  );
}