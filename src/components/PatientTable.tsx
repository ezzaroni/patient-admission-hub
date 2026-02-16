import { useState, useMemo } from "react";
import { Patient, SortField, SortOrder } from "@/types/patient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, Search, ChevronLeft, ChevronRight, Users } from "lucide-react";

const PAGE_SIZE = 5;

interface PatientTableProps {
  patients: Patient[];
  isLoading: boolean;
}

const PatientTable = ({ patients, isLoading }: PatientTableProps) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("tanggalMasuk");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return patients
      .filter((p) => p.nama.toLowerCase().includes(q) || p.nik.includes(q))
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        const cmp = valA.localeCompare(valB);
        return sortOrder === "asc" ? cmp : -cmp;
      });
  }, [patients, search, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari nama atau NIK..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState hasSearch={search.length > 0} />
      ) : (
        <>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <SortableHead label="Nama" field="nama" current={sortField} order={sortOrder} onSort={toggleSort} />
                  <TableHead>NIK</TableHead>
                  <TableHead>Diagnosa</TableHead>
                  <SortableHead label="Tgl Masuk" field="tanggalMasuk" current={sortField} order={sortOrder} onSort={toggleSort} />
                  <TableHead>Dokter PJ</TableHead>
                  <TableHead>Ruangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{p.nama}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{p.nik}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">{p.diagnosa}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(p.tanggalMasuk)}</TableCell>
                    <TableCell className="text-sm">{p.dokter}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.ruangan}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} pasien ditemukan</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[80px] text-center">{page} / {totalPages}</span>
              <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function SortableHead({ label, field, current, order, onSort }: {
  label: string; field: SortField; current: SortField; order: SortOrder; onSort: (f: SortField) => void;
}) {
  return (
    <TableHead>
      <button onClick={() => onSort(field)} className="flex items-center gap-1 hover:text-foreground transition-colors">
        {label}
        <ArrowUpDown className={`h-3.5 w-3.5 ${current === field ? "text-primary" : "text-muted-foreground/50"}`} />
      </button>
    </TableHead>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <Users className="h-12 w-12 mb-3 opacity-30" />
      <p className="font-medium">{hasSearch ? "Tidak ada hasil pencarian" : "Belum ada pasien rawat inap"}</p>
      <p className="text-sm mt-1">{hasSearch ? "Coba kata kunci lain" : "Tambahkan pasien baru melalui formulir"}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default PatientTable;
