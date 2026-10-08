import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Car, CircleDollarSign, Wrench } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Ringkasan {
    totalKendaraan: number;
    tersedia: number;
    disewa: number;
    perawatan: number;
    bookingAktif: number;
    pendapatan: number;
}

interface Booking {
    id: number;
    kode: string;
    kendaraan: string;
    pelanggan: string;
    pinjam: string;
    kembali: string;
    hari: number;
    total: number;
    status: ToneLabel;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function RentalIndex({
    ringkasan,
    pendapatan,
    bookings,
}: {
    ringkasan: Ringkasan;
    pendapatan: ChartData;
    bookings: Record<string, any>[];
}) {
    const aktif = bookings
        .filter((b) => ['Berjalan', 'Dipesan'].includes(b.status?.label))
        .map((b, i) => ({
            id: Number(b.id) || i + 1,
            kode: String(b.kode),
            kendaraan: String(b.kendaraan),
            pelanggan: String(b.pelanggan),
            pinjam: String(b.pinjam),
            kembali: String(b.kembali),
            hari: Number(b.hari),
            total: Number(b.total),
            status: b.status as ToneLabel,
        })) as Booking[];

    const columns: Column<Booking>[] = [
        { key: 'kode', header: 'Kode', render: (r) => <span className="text-primary font-mono text-xs font-semibold">{r.kode}</span>, sortValue: (r) => r.kode },
        { key: 'kendaraan', header: 'Kendaraan', sortValue: (r) => r.kendaraan },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan, mobileHidden: true },
        { key: 'periode', header: 'Periode', render: (r) => <span className="text-xs">{r.pinjam} → {r.kembali}</span>, mobileHidden: true },
        {
            key: 'total',
            header: 'Total',
            render: (r) => <span className="tnum font-medium">{rp(r.total)}</span>,
            sortValue: (r) => r.total,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Rental Mobil"
                description="Pastikan unit siap jalan dan tidak ada booking yang bentrok."
                breadcrumbs={[{ label: 'Rental' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/rental/booking">Buat Booking</Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Armada Tersedia" value={`${ringkasan.tersedia} unit`} delta={`dari ${ringkasan.totalKendaraan} unit armada`} trend="up" icon={Car} hint="Unit yang siap disewa kapan pun hari ini." />
                <StatCard label="Sedang Disewa" value={`${ringkasan.disewa} unit`} delta="unit aktif di jalan" trend="flat" icon={CalendarCheck} hint="Unit yang sedang dipakai penyewa saat ini." />
                <StatCard label="Dalam Perawatan" value={`${ringkasan.perawatan} unit`} delta="servis berkala" trend="down" icon={Wrench} hint="Unit yang masuk bengkel, belum bisa disewa." />
                <StatCard label="Pendapatan Oktober" value={rp(ringkasan.pendapatan)} delta={`${ringkasan.bookingAktif} booking aktif`} trend="up" icon={CircleDollarSign} hint="Uang masuk dari sewa unit bulan ini." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Pendapatan Bulanan</CardTitle>
                        <p className="text-muted-foreground text-sm">Juta rupiah, Januari, Oktober 2026.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={pendapatan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status Armada</CardTitle>
                        <p className="text-muted-foreground text-sm">Kondisi 10 unit hari ini.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            { label: 'Tersedia', count: ringkasan.tersedia, tone: 'success' as const },
                            { label: 'Disewa', count: ringkasan.disewa, tone: 'info' as const },
                            { label: 'Perawatan', count: ringkasan.perawatan, tone: 'warning' as const },
                        ].map((s) => (
                            <div key={s.label} className="flex items-center justify-between">
                                <ToneBadge label={s.label} tone={s.tone} />
                                <span className="tnum text-2xl font-bold">{s.count}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={aktif}
                    searchKeys={['kode', 'kendaraan', 'pelanggan']}
                    pageSize={5}
                    emptyTitle="Tidak ada booking aktif"
                    emptyDescription="Booking yang berjalan atau dipesan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
