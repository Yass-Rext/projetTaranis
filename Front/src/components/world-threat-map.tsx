import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ThreatIncident {
  id: string;
  country: string;
  city: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  count: number;
  lat: number;
  lng: number;
}

const mockIncidents: ThreatIncident[] = [
  {
    id: "1",
    country: "Sénégal",
    city: "Dakar", 
    type: "Phishing",
    severity: "high",
    count: 23,
    lat: 14.7167,
    lng: -17.4677
  },
  {
    id: "2",
    country: "France",
    city: "Paris",
    type: "Ransomware", 
    severity: "critical",
    count: 47,
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: "3",
    country: "États-Unis",
    city: "New York",
    type: "APT",
    severity: "critical", 
    count: 89,
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: "4",
    country: "Chine",
    city: "Beijing",
    type: "Espionnage",
    severity: "high",
    count: 156,
    lat: 39.9042,
    lng: 116.4074
  },
  {
    id: "5",
    country: "Russie",
    city: "Moscou",
    type: "Cyberwarfare",
    severity: "critical",
    count: 234,
    lat: 55.7558,
    lng: 37.6173
  }
];

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500", 
  low: "bg-blue-500"
};

export function WorldThreatMap() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Carte Mondiale des Menaces</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* World Map Background */}
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGRpZ2l0YWx8ZW58MXx8fHwxNzU4MzcwMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Carte mondiale"
              className="w-full h-full object-cover opacity-20"
            />
            
            {/* Threat Indicators */}
            <div className="absolute inset-0">
              {/* Sénégal - Dakar */}
              <div className="absolute" style={{ left: '45%', top: '60%' }}>
                <div className={`w-4 h-4 rounded-full ${severityColors.high} animate-pulse`} />
                <div className="text-xs mt-1 text-center">Dakar</div>
              </div>
              
              {/* France - Paris */}
              <div className="absolute" style={{ left: '52%', top: '30%' }}>
                <div className={`w-5 h-5 rounded-full ${severityColors.critical} animate-pulse`} />
                <div className="text-xs mt-1 text-center">Paris</div>
              </div>
              
              {/* États-Unis - New York */}
              <div className="absolute" style={{ left: '25%', top: '35%' }}>
                <div className={`w-6 h-6 rounded-full ${severityColors.critical} animate-pulse`} />
                <div className="text-xs mt-1 text-center">NY</div>
              </div>
              
              {/* Chine - Beijing */}
              <div className="absolute" style={{ left: '80%', top: '40%' }}>
                <div className={`w-5 h-5 rounded-full ${severityColors.high} animate-pulse`} />
                <div className="text-xs mt-1 text-center">Beijing</div>
              </div>
              
              {/* Russie - Moscou */}
              <div className="absolute" style={{ left: '65%', top: '25%' }}>
                <div className={`w-6 h-6 rounded-full ${severityColors.critical} animate-pulse`} />
                <div className="text-xs mt-1 text-center">Moscou</div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Critique</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm">Élevé</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm">Moyen</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Faible</span>
            </div>
          </div>
        </div>
        
        {/* Incident Summary */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium">Incidents par Région</h4>
          {mockIncidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${severityColors[incident.severity]}`} />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{incident.city}, {incident.country}</span>
                    <Badge variant="outline" className="text-xs">{incident.type}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{incident.count} incidents</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}