import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Pelanggan {
    id: number;
    nama: string;
    telepon: string;
    tipe: string;
    sewa: number;
}

export default function Pelanggan({ pelanggans }: { pelanggans: Record<string, any>[] }) {
    const rows: Pelanggan[] = pelanggans.map((p, i) => ({
        id: Number(p.id) || i + 1,
        nama: String(p.nama),
        telepon: String(p.telepon),
        tipe: String(p.tipe),
        sewa: Number(p.sewa),
    }));

    const columns: Column<Pelanggan>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'telepon', header: 'Telepon', sortValue: (r) => r.telepon, mobileHidden: true },
        {
            key: 'tipe',
            header: 'Tipe',
            render: (r) => <Badge variant="secondary">{r.tipe}</Badge>,
            sortValue: (r) => r.tipe,
        },
        {
            key: 'sewa',
            header: 'Total Sewa',
            render: (r) => <span className="tnum">{r.sewa}x</span>,
            sortValue: (r) => r.sewa,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'tipe',
            label: 'Tipe',
            options: [
                { value: 'Perorangan', label: 'Perorangan' },
                { value: 'Perusahaan', label: 'Perusahaan' },
            ],
            match: (row: any, value: string) => row.tipe === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Pelanggan"
                description="Penyewa perorangan dan perusahaan beserta riwayat sewa."
                breadcrumbs={[{ label: 'Rental', href: '/rental' }, { label: 'Pelanggan' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Pelanggan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'telepon']}
                        filters={filters}
                        emptyTitle="Belum ada pelanggan"
                        emptyDescription="Penyewa yang memesan akan tercatat otomatis di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
