import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type Tone, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';

interface Kendaraan {
    id: number;
    nama: string;
    plat: string;
    status: ToneLabel;
}

interface KalenderItem {
    kendaraanId: number;
    kode: string;
    pinjam: string;
    kembali: string;
    pelanggan: string;
    status: ToneLabel;
}

const toneBar: Record<Tone, string> = {
    success: 'bg-success/20 text-success-foreground border-success/40',
    warning: 'bg-warning/20 text-warning-foreground border-warning/40',
    destructive: 'bg-destructive/20 text-destructive border-destructive/40',
    info: 'bg-info/20 text-info border-info/40',
};

const TAHUN = 2026;
const BULAN = 9; // Oktober (0-based)

export default function Kalender({
    kendaraans,
    kalender,
}: {
    kendaraans: Kendaraan[];
    kalender: KalenderItem[];
}) {
    const [unitAktif, setUnitAktif] = useState<number | null>(null);

    const hariDalamBulan = new Date(TAHUN, BULAN + 1, 0).getDate();
    const hariPertama = (new Date(TAHUN, BULAN, 1).getDay() + 6) % 7; // Senin = 0
    const hariIni = 8;

    const booked = useMemo(() => {
        const map: Record<number, { tanggal: number; kode: string; tone: Tone }[]> = {};
        for (const item of kalender) {
            if (unitAktif !== null && item.kendaraanId !== unitAktif) continue;
            for (let d = 1; d <= hariDalamBulan; d++) {
                const iso = `2026-10-${String(d).padStart(2, '0')}`;
                if (iso >= item.pinjam && iso <= item.kembali) {
                    (map[d] ||= []).push({ tanggal: d, kode: item.kode, tone: item.status.tone });
                }
            }
        }
        return map;
    }, [kalender, unitAktif, hariDalamBulan]);

    const sel: (number | null)[] = [
        ...Array(hariPertama).fill(null),
        ...Array.from({ length: hariDalamBulan }, (_, i) => i + 1),
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kalender Ketersediaan"
                description="Jadwal sewa armada Oktober 2026, klik unit untuk menyaring."
                breadcrumbs={[{ label: 'Rental', href: '/rental' }, { label: 'Kalender' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Oktober 2026</CardTitle>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setUnitAktif(null)}
                            className={cn(
                                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                                unitAktif === null
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'hover:bg-muted/60',
                            )}
                        >
                            Semua unit
                        </button>
                        {kendaraans.map((k) => (
                            <button
                                key={k.id}
                                type="button"
                                onClick={() => setUnitAktif(unitAktif === k.id ? null : k.id)}
                                className={cn(
                                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                                    unitAktif === k.id
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'hover:bg-muted/60',
                                )}
                            >
                                {k.nama}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-1.5">
                        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((h) => (
                            <div
                                key={h}
                                className="text-muted-foreground pb-1 text-center text-xs font-semibold uppercase"
                            >
                                {h}
                            </div>
                        ))}
                        {sel.map((d, i) =>
                            d === null ? (
                                <div key={`e-${i}`} />
                            ) : (
                                <div
                                    key={d}
                                    className={cn(
                                        'min-h-20 rounded-lg border p-1.5',
                                        d === hariIni && 'border-primary ring-1 ring-primary/40',
                                    )}
                                >
                                    <p
                                        className={cn(
                                            'mb-1 text-xs font-semibold',
                                            d === hariIni ? 'text-primary' : 'text-muted-foreground',
                                        )}
                                    >
                                        {d}
                                    </p>
                                    <div className="space-y-1">
                                        {(booked[d] ?? []).slice(0, 3).map((b, j) => (
                                            <span
                                                key={j}
                                                className={cn(
                                                    'block truncate rounded border px-1 py-0.5 text-[10px] font-medium',
                                                    toneBar[b.tone],
                                                )}
                                                title={b.kode}
                                            >
                                                {b.kode}
                                            </span>
                                        ))}
                                        {(booked[d] ?? []).length > 3 && (
                                            <span className="text-muted-foreground block text-[10px]">
                                                +{(booked[d] ?? []).length - 3} lagi
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                            <ToneBadge label="Berjalan" tone="info" />
                            <span className="text-muted-foreground">unit sedang disewa</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <ToneBadge label="Dipesan" tone="warning" />
                            <span className="text-muted-foreground">terjadwal ke depan</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <ToneBadge label="Selesai" tone="success" />
                            <span className="text-muted-foreground">riwayat bulan ini</span>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
