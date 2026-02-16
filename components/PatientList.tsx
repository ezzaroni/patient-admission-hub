
import React, { useState, useMemo } from 'react';
import { Patient, Status } from '../types';
import { DOCTORS, ROOMS, PAYMENT_METHODS } from '../constants';

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  onAdd: () => void;
  onViewDetails: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, loading, onAdd, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'Semua'>('Semua');
  
  // Advanced Filters State
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    doctor: 'Semua',
    roomName: 'Semua',
    paymentMethod: 'Semua',
    gender: 'Semua'
  });

  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' }>({ 
    key: 'admissionDate', 
    direction: 'desc' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Diubah dari 8 ke 15

  const handleSort = (key: keyof Patient) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      doctor: 'Semua',
      roomName: 'Semua',
      paymentMethod: 'Semua',
      gender: 'Semua'
    });
    setStatusFilter('Semua');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.nik.includes(searchTerm) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Semua' || p.status === statusFilter;
      const matchesDoctor = filters.doctor === 'Semua' || p.doctor === filters.doctor;
      const matchesRoom = filters.roomName === 'Semua' || p.roomName === filters.roomName;
      const matchesPayment = filters.paymentMethod === 'Semua' || p.paymentMethod === filters.paymentMethod;
      const matchesGender = filters.gender === 'Semua' || p.gender === filters.gender;
      
      return matchesSearch && matchesStatus && matchesDoctor && matchesRoom && matchesPayment && matchesGender;
    });
  }, [patients, searchTerm, statusFilter, filters]);

  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (sortConfig.key === 'admissionDate') {
        const dateA = new Date(aVal as string).getTime();
        const dateB = new Date(bVal as string).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredPatients, sortConfig]);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedPatients.slice(start, start + itemsPerPage);
  }, [sortedPatients, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);

  // CSV Export Logic
  const handleExportCSV = () => {
    if (sortedPatients.length === 0) {
      alert('Tidak ada data untuk diekspor.');
      return;
    }

    const headers = ["No. RM", "Nama Pasien", "NIK", "Gender", "Diagnosa", "Tanggal Masuk", "Dokter", "Ruangan", "Metode Bayar", "Status"];
    const csvRows = sortedPatients.map(p => [
      p.id,
      `"${p.name}"`,
      `'${p.nik}`,
      p.gender,
      `"${p.diagnosis}"`,
      p.admissionDate,
      `"${p.doctor}"`,
      `"${p.roomName}"`,
      `"${p.paymentMethod}"`,
      p.status
    ]);

    const csvContent = [headers, ...csvRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Pasien_Inap_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'Semua').length + (statusFilter !== 'Semua' ? 1 : 0);

  const criticalCount = patients.filter(p => p.status === 'Kritis').length;
  const criticalPatient = patients.find(p => p.status === 'Kritis');
  const recoveryPatient = patients.find(p => p.status === 'Pemulihan');
  const newEntryPatient = patients[0];

  // Logic for intelligent pagination with ellipsis
  const getPaginationGroup = () => {
    const delta = 2; // Neighbors to show
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Search & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-text-muted-light dark:text-text-muted-dark font-medium mb-1 uppercase tracking-wider text-[10px]">Hospital Administration</p>
          <h2 className="text-3xl font-bold">Daftar Pasien <span className="text-primary">Rawat Inap</span></h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <input 
              className="pl-10 pr-4 py-2.5 rounded-full border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark focus:ring-primary focus:border-primary w-64 text-sm transition-all shadow-sm" 
              placeholder="Cari Nama / NIK / No. RM..." 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light text-lg">search</span>
          </div>

          <div className="relative group">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="pl-10 pr-10 py-2.5 rounded-full border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark focus:ring-primary focus:border-primary text-sm transition-all shadow-sm appearance-none min-w-[160px] font-medium"
            >
              <option value="Semua">Semua Status</option>
              <option value="Stabil">🟢 Stabil</option>
              <option value="Pemulihan">🔵 Pemulihan</option>
              <option value="Kritis">🔴 Kritis</option>
            </select>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light text-lg pointer-events-none">filter_alt</span>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-light text-lg pointer-events-none">expand_more</span>
          </div>

          <button 
            onClick={onAdd}
            className="bg-primary text-black font-semibold px-6 py-2.5 rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="hidden lg:inline">Tambah Pasien</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 relative overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 -mr-8 -mt-8 rounded-full"></div>
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
            </div>
            <div className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-full uppercase tracking-tighter">Kritis ({criticalCount})</div>
          </div>
          <h3 className="text-lg font-bold mb-1 truncate">{criticalPatient?.name || 'Tidak Ada'}</h3>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-6 truncate">{criticalPatient?.roomName || 'Standby'}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">MD</div>
              <span className="text-xs font-medium truncate max-w-[80px]">{criticalPatient?.doctor.split(',')[0] || 'N/A'}</span>
            </div>
            <button 
              disabled={!criticalPatient}
              onClick={() => criticalPatient && onViewDetails(criticalPatient)}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
            </button>
          </div>
        </div>

        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">fiber_new</span>
            </div>
            <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">Pasien Baru</div>
          </div>
          <h3 className="text-lg font-bold mb-1 truncate">{newEntryPatient?.name || 'N/A'}</h3>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-6 truncate">{newEntryPatient?.roomName || 'N/A'}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">DP</div>
              <span className="text-xs font-medium truncate max-w-[80px]">{newEntryPatient?.doctor.split(',')[0]}</span>
            </div>
            <button 
              onClick={() => newEntryPatient && onViewDetails(newEntryPatient)}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
            </button>
          </div>
        </div>

        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">medical_information</span>
            </div>
            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-tighter">Pemulihan</div>
          </div>
          <h3 className="text-lg font-bold mb-1 truncate">{recoveryPatient?.name || 'Tidak Ada'}</h3>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-6 truncate">{recoveryPatient?.roomName || 'N/A'}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">DP</div>
              <span className="text-xs font-medium truncate max-w-[80px]">{recoveryPatient?.doctor.split(',')[0] || 'N/A'}</span>
            </div>
            <button 
              disabled={!recoveryPatient}
              onClick={() => recoveryPatient && onViewDetails(recoveryPatient)}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
            </button>
          </div>
        </div>

        <div 
          onClick={onAdd}
          className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 border-dashed border-2 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-all hover:scale-[1.02]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-text-muted-light group-hover:text-primary">person_add</span>
          </div>
          <p className="text-sm font-semibold mb-1">Pendaftaran Baru</p>
          <p className="text-xs text-text-muted-light">Klik untuk registrasi pasien</p>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-card-light dark:bg-card-dark p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">List Pasien Inap</h2>
            <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">{sortedPatients.length} HASIL</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isAdvancedFilterOpen ? 'bg-primary text-black' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              {isAdvancedFilterOpen ? 'Tutup Filter' : 'Filter Lanjut'}
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full text-xs font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Ekspor CSV
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {isAdvancedFilterOpen && (
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dokter DPJP</label>
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
                  value={filters.doctor}
                  onChange={(e) => handleFilterChange('doctor', e.target.value)}
                >
                  <option value="Semua">Semua Dokter</option>
                  {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ruangan / Kelas</label>
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
                  value={filters.roomName}
                  onChange={(e) => handleFilterChange('roomName', e.target.value)}
                >
                  <option value="Semua">Semua Ruangan</option>
                  {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Metode Bayar</label>
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
                  value={filters.paymentMethod}
                  onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                >
                  <option value="Semua">Semua Jaminan</option>
                  {PAYMENT_METHODS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Jenis Kelamin</label>
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <option value="Semua">Semua Gender</option>
                  <option value="Laki-laki">Pria</option>
                  <option value="Perempuan">Wanita</option>
                </select>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button 
                onClick={resetFilters}
                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Reset Semua Filter
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-text-muted-light font-medium">Memuat data...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-text-muted-light border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                      Nama Pasien <span className="material-symbols-outlined text-sm">unfold_more</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 font-semibold">No. RM / NIK</th>
                  <th className="px-4 py-4 font-semibold">Diagnosa Masuk</th>
                  <th className="px-4 py-4 font-semibold">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('admissionDate')}>
                      Tgl Masuk <span className="material-symbols-outlined text-sm">unfold_more</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 font-semibold">Dokter (DPJP)</th>
                  <th className="px-4 py-4 font-semibold">Ruangan</th>
                  <th className="px-4 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {paginatedPatients.length > 0 ? paginatedPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-background-light dark:hover:bg-background-dark/30 transition-colors group">
                    <td className="px-4 py-5">
                      <span className="font-bold text-sm text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">{p.name}</span>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-primary">{p.id}</span>
                        <span className="text-[10px] font-mono text-text-muted-light">{p.nik.slice(0, 6)}XXXXXXXXXX</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          p.status === 'Kritis' ? 'bg-red-500' :
                          p.status === 'Pemulihan' ? 'bg-blue-500' :
                          'bg-primary'
                        }`}></span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                          {p.diagnosis.length > 25 ? p.diagnosis.slice(0, 25) + '...' : p.diagnosis}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm">{new Date(p.admissionDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-4 py-5 text-sm font-medium">{p.doctor.split(',')[0]}</td>
                    <td className="px-4 py-5">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md font-bold">{p.roomName}</span>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => onViewDetails(p)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-text-muted-light text-sm italic">
                      Tidak ada pasien yang sesuai dengan kriteria filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Section */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
            <p className="text-sm text-text-muted-light">
              Menampilkan {paginatedPatients.length} dari {sortedPatients.length} pasien
            </p>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-25"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              
              <div className="flex items-center gap-1">
                {getPaginationGroup().map((item, index) => {
                  if (item === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-slate-400">
                        ...
                      </span>
                    );
                  }
                  
                  return (
                    <button 
                      key={`page-${item}`}
                      onClick={() => setCurrentPage(Number(item))}
                      className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all ${
                        currentPage === item 
                          ? 'bg-primary text-black shadow-md shadow-primary/20 scale-105' 
                          : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-25"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
