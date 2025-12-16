
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2, LocateFixed, AlertTriangle, Building, Map } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { findBranchAction } from '@/app/actions';
import type { LocateNearbyBranchOutput } from '@/ai/flows/locate-nearby-branch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches, type Branch } from '@/lib/branches';
import { ScrollArea } from './ui/scroll-area';

export function BranchLocator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locatedBranch, setLocatedBranch] = useState<LocateNearbyBranchOutput | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);
    setLocatedBranch(null);
    setSelectedBranch(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const result = await findBranchAction({ latitude, longitude });
          setLocatedBranch(result);
        } catch (e: any) {
          setError(e.message || 'An unexpected error occurred.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(`Unable to retrieve your location: ${err.message}`);
        setLoading(false);
      }
    );
  };

  const handleBranchSelect = (branchName: string) => {
    const branch = branches.find(b => b.name === branchName);
    if (branch) {
      setSelectedBranch(branch);
      setLocatedBranch(null);
      setError(null);
    }
  }

  const handleShowOnMap = () => {
    if (selectedBranch) {
      const { lat, lng } = selectedBranch;
      const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <ScrollArea className="h-full pr-6">
      <div className="flex flex-col space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <LocateFixed className="h-5 w-5 text-primary" />
                Find a Nearby Branch
              </CardTitle>
              <CardDescription>
                Use your device's location to find the closest branch.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={handleLocate} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Use My Current Location'
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                      <Building className="h-5 w-5 text-primary" />
                      Select a Branch
                  </CardTitle>
                  <CardDescription>
                      Or, choose a branch from the list below.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                      <Select onValueChange={handleBranchSelect}>
                          <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a branch" />
                          </SelectTrigger>
                          <SelectContent>
                              {branches.map(branch => (
                                  <SelectItem key={branch.name} value={branch.name}>{branch.name}</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                      <Button
                          onClick={handleShowOnMap}
                          disabled={!selectedBranch}
                          variant="outline"
                          className="w-full sm:w-auto flex-shrink-0"
                      >
                          <Map className="mr-2 h-4 w-4" />
                          Show on Map
                      </Button>
                  </div>
              </CardContent>
          </Card>
        </div>

        {(error || locatedBranch || selectedBranch) && (
          <Card>
              <CardHeader>
                  <CardTitle>Branch Details</CardTitle>
              </CardHeader>
              <CardContent>
                  {error && (
                      <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                      </Alert>
                  )}
                  {locatedBranch && (
                      <Alert>
                          <AlertTitle>Nearest Branch Found!</AlertTitle>
                          <AlertDescription>
                              <p className="font-semibold">{locatedBranch.branchName}</p>
                              <p>{locatedBranch.branchAddress}</p>
                          </AlertDescription>
                      </Alert>
                  )}
                  {selectedBranch && (
                      <Alert>
                          <AlertTitle>{selectedBranch.name}</AlertTitle>
                          <AlertDescription>
                              <p>{selectedBranch.address}</p>
                          </AlertDescription>
                      </Alert>
                  )}
              </CardContent>
          </Card>
        )}

      </div>
    </ScrollArea>
  );
}
