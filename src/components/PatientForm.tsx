import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PatientFormData } from "@/types/patient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const schema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  diagnosa: z.string().min(3, "Diagnosa minimal 3 karakter"),
  tanggalMasuk: z.string().min(1, "Tanggal masuk wajib diisi"),
  dokter: z.string().min(1, "Dokter wajib dipilih"),
  ruangan: z.string().min(1, "Ruangan wajib dipilih"),
});

const DOKTER_LIST = [
  "dr. Budi Santoso, Sp.PD",
  "dr. Rina Wati, Sp.P",
  "dr. Agus Pratama, Sp.OT",
  "dr. Hendra Wijaya, Sp.B",
];

const RUANGAN_LIST = [
  "Melati 101", "Melati 102", "Melati 104", "Melati 106",
  "Anggrek 201", "Anggrek 202", "Anggrek 203", "Anggrek 205",
  "Dahlia 103", "Dahlia 105", "Dahlia 107",
  "ICU 01", "ICU 02",
];

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => Promise<void>;
}

const PatientForm = ({ onSubmit }: PatientFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: new Date().toISOString().split("T")[0],
      dokter: "",
      ruangan: "",
    },
  });

  const handleFormSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Nama Pasien" error={errors.nama?.message}>
          <Input placeholder="Masukkan nama lengkap" {...register("nama")} />
        </FormField>

        <FormField label="NIK" error={errors.nik?.message}>
          <Input placeholder="16 digit NIK" maxLength={16} {...register("nik")} />
        </FormField>

        <FormField label="Diagnosa Masuk" error={errors.diagnosa?.message}>
          <Input placeholder="Diagnosa awal" {...register("diagnosa")} />
        </FormField>

        <FormField label="Tanggal Masuk" error={errors.tanggalMasuk?.message}>
          <Input type="date" {...register("tanggalMasuk")} />
        </FormField>

        <FormField label="Dokter Penanggung Jawab" error={errors.dokter?.message}>
          <Select onValueChange={(v) => setValue("dokter", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih dokter" />
            </SelectTrigger>
            <SelectContent>
              {DOKTER_LIST.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Ruangan" error={errors.ruangan?.message}>
          <Select onValueChange={(v) => setValue("ruangan", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih ruangan" />
            </SelectTrigger>
            <SelectContent>
              {RUANGAN_LIST.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Pasien"
          )}
        </Button>
      </div>
    </form>
  );
};

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default PatientForm;
