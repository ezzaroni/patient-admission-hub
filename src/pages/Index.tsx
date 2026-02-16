import { useState, useEffect, useCallback } from "react";
import { Patient, PatientFormData } from "@/types/patient";
import { fetchPatients, addPatient } from "@/data/mockPatients";
import PatientForm from "@/components/PatientForm";
import PatientTable from "@/components/PatientTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ClipboardPlus, Users, Activity } from "lucide-react";

const Index = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const loadPatients = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const handleAddPatient = async (data: PatientFormData) => {
    await addPatient(data);
    await loadPatients();
    toast({ title: "Pasien berhasil ditambahkan", description: `${data.nama} telah terdaftar rawat inap.` });
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Rawat Inap</h1>
            <p className="text-sm text-muted-foreground">Sistem Manajemen Pasien</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            {patients.length} pasien aktif
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="list" className="gap-2">
              <Users className="h-4 w-4" />
              Daftar Pasien
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <ClipboardPlus className="h-4 w-4" />
              Pasien Masuk
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Pasien Rawat Inap Aktif</CardTitle>
                <CardDescription>Daftar seluruh pasien yang sedang menjalani rawat inap</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientTable patients={patients} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Formulir Pasien Masuk</CardTitle>
                <CardDescription>Isi data pasien baru untuk pendaftaran rawat inap</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientForm onSubmit={handleAddPatient} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
