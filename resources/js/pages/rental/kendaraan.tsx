import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Kendaraan {
    id: number;
    nama: string;
    plat: string;
    tipe: string;
    hargaHari: number;
    gambar?: string;
    status: ToneLabel;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Kendaraan({ kendaraans }: { kendaraans: Record<string, any>[] }) {
    const rows: Kendaraan[] = kendaraans.map((k, i) => ({
        id: Number(k.id) || i + 1,
        nama: String(k.nama),
        plat: String(k.plat),
        tipe: String(k.tipe),
        hargaHari: Number(k.hargaHari),
        gambar: String(k.gambar ?? ''),
        status: k.status as ToneLabel,
    }));

    const columns: Column<Kendaraan>[] = [
        {
            key: 'gambar',
            header: 'Foto',
            render: (r) =>
                r.gambar ? (
                    <img
                        src={r.gambar}
                        alt={r.nama}
                        loading="lazy"
                        className="h-10 w-16 rounded-md border object-cover"
                    />
                ) : (
                    <span className="text-xs text-muted-foreground">, </span>
                ),
        },
        { key: 'nama', header: 'Kendaraan', sortValue: (r) => r.nama },
        {
            key: 'plat',
            header: 'Plat',
            render: (r) => <span className="font-mono text-xs font-semibold">{r.plat}</span>,
            sortValue: (r) => r.plat,
        },
        { key: 'tipe', header: 'Tipe', sortValue: (r) => r.tipe, mobileHidden: true },
        {
            key: 'hargaHari',
            header: 'Harga / Hari',
            render: (r) => <span className="tnum font-medium">{rp(r.hargaHari)}</span>,
            sortValue: (r) => r.hargaHari,
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
                { value: 'Tersedia', label: 'Tersedia' },
                { value: 'Disewa', label: 'Disewa' },
                { value: 'Perawatan', label: 'Perawatan' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
        {
            key: 'tipe',
            label: 'Tipe',
            options: [...new Set(rows.map((r) => r.tipe))].map((t) => ({ value: t, label: t })),
            match: (row: any, value: string) => row.tipe === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Armada"
                description="10 unit kendaraan: plat, tipe, tarif harian, dan status."
                breadcrumbs={[{ label: 'Rental', href: '/rental' }, { label: 'Armada' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Kendaraan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'plat', 'tipe']}
                        filters={filters}
                        emptyTitle="Belum ada kendaraan"
                        emptyDescription="Kendaraan yang didaftarkan akan tercatat di halaman Kendaraan."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
