import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Car, CircleDollarSign, Download, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface Ringkasan {
    totalKendaraan: number;
    tersedia: number;
    disewa: number;
    perawatan: number;
    bookingAktif: number;
    pendapatan: number;
}

interface Kendaraan {
    id: number;
    nama: string;
    plat: string;
    tipe: string;
    hargaHari: number;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

function exportCsv(kendaraans: Kendaraan[]) {
    const header = 'Kendaraan,Plat,Tipe,Harga per Hari';
    const lines = kendaraans.map((k) =>
        [k.nama, k.plat, k.tipe, k.hargaHari]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(','),
    );
    const blob = new Blob([[header, ...lines].join('\n')], {
        type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-rental.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Laporan berhasil diunduh');
}

export default function Laporan({
    ringkasan,
    pendapatan,
    kendaraans,
}: {
    ringkasan: Ringkasan;
    pendapatan: ChartData;
    kendaraans: Kendaraan[];
}) {
    const utilisasi = Math.round(
        ((ringkasan.disewa + ringkasan.tersedia) / ringkasan.totalKendaraan) * 100,
    );

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan Rental"
                description="Rekap operasional dan keuangan periode Oktober 2026."
                breadcrumbs={[{ label: 'Rental', href: '/rental' }, { label: 'Laporan' }]}
                actions={
                    <Button variant="outline" size="sm" onClick={() => exportCsv(kendaraans)}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Pendapatan Oktober" value={rp(ringkasan.pendapatan)} delta="booking berjalan + selesai" trend="up" icon={CircleDollarSign} hint="Uang masuk dari sewa unit pada periode laporan." />
                <StatCard label="Booking Aktif" value={String(ringkasan.bookingAktif)} delta="berjalan + dipesan" trend="up" icon={CalendarCheck} hint="Pemesanan sewa yang sedang berjalan." />
                <StatCard label="Unit Siap Jalan" value={`${ringkasan.tersedia + ringkasan.disewa}`} delta={`${utilisasi}% utilisasi armada`} trend="flat" icon={Car} hint="Unit yang siap disewa kapan pun." />
                <StatCard label="Unit Perawatan" value={`${ringkasan.perawatan}`} delta="servis berkala" trend="down" icon={Wrench} hint="Unit yang masuk bengkel dan belum bisa disewa." />
            </div>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Tren Pendapatan</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Juta rupiah, Januari, Oktober 2026.
                    </p>
                </CardHeader>
                <CardContent>
                    <BarChartCard data={pendapatan} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
