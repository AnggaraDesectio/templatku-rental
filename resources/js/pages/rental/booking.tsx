import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function Booking({ bookings }: { bookings: Record<string, any>[] }) {
    const rows: Booking[] = bookings.map((b, i) => ({
        id: Number(b.id) || i + 1,
        kode: String(b.kode),
        kendaraan: String(b.kendaraan),
        pelanggan: String(b.pelanggan),
        pinjam: String(b.pinjam),
        kembali: String(b.kembali),
        hari: Number(b.hari),
        total: Number(b.total),
        status: b.status as ToneLabel,
    }));

    const columns: Column<Booking>[] = [
        {
            key: 'kode',
            header: 'Kode',
            render: (r) => <span className="text-primary font-mono text-xs font-semibold">{r.kode}</span>,
            sortValue: (r) => r.kode,
        },
        { key: 'kendaraan', header: 'Kendaraan', sortValue: (r) => r.kendaraan },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan, mobileHidden: true },
        {
            key: 'periode',
            header: 'Periode',
            render: (r) => (
                <span className="text-xs">
                    {r.pinjam} → {r.kembali}
                    <span className="text-muted-foreground block">{r.hari} hari</span>
                </span>
            ),
        },
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

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Berjalan', label: 'Berjalan' },
                { value: 'Dipesan', label: 'Dipesan' },
                { value: 'Selesai', label: 'Selesai' },
                { value: 'Batal', label: 'Batal' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Booking"
                description="Semua pemesanan sewa: periode, total, dan status."
                breadcrumbs={[{ label: 'Rental', href: '/rental' }, { label: 'Booking' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Booking</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['kode', 'kendaraan', 'pelanggan']}
                        filters={filters}
                        emptyTitle="Belum ada booking"
                        emptyDescription="Pemesanan sewa baru dibuat dari halaman Booking."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
