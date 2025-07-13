'use client';

import {Fragment, JSX, useEffect, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    PencilIcon,
    TrashIcon,
    XMarkIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { services as serviceDefs } from '@/data/services';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from "clsx";

/* ---------- Tipler ---------- */
type Kayit = {
    plakaNo: string;
    garanti: { baslangic: string; bitis: string };
    notlar: string;
    islemler: string[];
    tarih: string;
    custom?: boolean;
};

/* ---------- Sabitler ---------- */
const BASE_NUM = 2378561284420001n;
const BASE_FMT = '2378 5612 8442 0001';
const initialServices = serviceDefs.map((s) => s.title);

import {
    CheckCircleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

type Variant = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: number;
    msg: string;
    variant: Variant;
}

const COLOR: Record<Variant, string> = {
    success: 'bg-green-600',
    error:   'bg-red-600',
    info:    'bg-slate-800',
    warning: 'bg-amber-500',
};

const ICON: Record<Variant, JSX.Element> = {
    success: <CheckCircleIcon       className="h-5 w-5" />,
    error:   <ExclamationTriangleIcon className="h-5 w-5" />,
    info:    <InformationCircleIcon className="h-5 w-5" />,
    warning: <ExclamationTriangleIcon className="h-5 w-5" />,
};

const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const push = (msg: string, variant: Variant = 'info', ms = 3000) => {
        const id = Date.now();
        setToasts((t) => [...t, { id, msg, variant }]);

        setTimeout(() => {
            setToasts((t) => t.filter((x) => x.id !== id));
        }, ms);
    };

    const ToastContainer = () => (
        <div className="fixed top-6 right-6 z-[9999] space-y-2">
            <AnimatePresence>
                {toasts.map(({ id, msg, variant }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className={`
              ${COLOR[variant]}
              text-white px-4 py-2 rounded shadow flex items-center gap-2
            `}
                    >
                        {ICON[variant]}
                        <span>{msg}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );

    return { push, ToastContainer };
}

function ConfirmDialog({
                           open,
                           onClose,
                           onConfirm,
                           title,
                           message,
                       }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-lg rounded bg-white py-10 px-8 space-y-6 shadow-2xl">
                            <Dialog.Title className="text-lg font-bold flex items-center gap-2">
                                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                                {title}
                            </Dialog.Title>
                            <p className="text-sm text-gray-700">{message}</p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="cursor-pointer transition-colors duration-200 px-5 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="cursor-pointer transition-colors duration-200 px-5 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Sil
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

/* ------------------------------------------------------------------ */
export default function AdminPage() {
    /* --- durumlar --- */
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [records, setRecords] = useState<[string, Kayit][]>([]);
    const [services, setServices] = useState<string[]>(initialServices);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [newSrv, setNewSrv] = useState('');

    const [code, setCode] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState<{ kod: string } | null>(null);

    const [plaka, setPlaka] = useState('');
    const [gStart, setGStart] = useState('');
    const [gEnd, setGEnd] = useState('');
    const [note, setNote] = useState('');

    /* toast hook */
    const { ToastContainer, push } = useToast();

    /* --- yardımcı fonksiyonlar --- */
    const fmt = (raw: string) =>
        raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

    const nextKod = (entries: [string, Kayit][]) => {
        if (!entries.length) return BASE_FMT;
        const used = new Set(entries.map(([k]) => k.replace(/\s/g, '')));
        const last = entries
            .filter(([, v]) => v.custom === false)
            .reduce<bigint>((m, [k]) => {
                const n = BigInt(k.replace(/\s/g, ''));
                return n > m ? n : m;
            }, 0n);
        let nxt = last >= BASE_NUM ? last + 1n : BASE_NUM;
        while (used.has(nxt.toString().padStart(16, '0'))) nxt++;
        return fmt(nxt.toString().padStart(16, '0'));
    };

    /* --- ilk açılışta token kontrolü --- */
    useEffect(() => {
        const t = localStorage.getItem('adminToken');
        if (t) {
            setToken(t);
            fetchAll(t);
        }
    }, []);

    /* --- API çağrıları --- */
    const fetchAll = async (tkn: string) => {
        try {
            const r = await fetch('/api/admin/kod-tum', {
                headers: { Authorization: `Bearer ${tkn}` },
            });
            if (!r.ok) throw new Error();
            const data = await r.json();
            const entries = (Object.entries(data || {}) as [string, Kayit][])
                .sort(
                    (t1, t2) =>
                        new Date(t2[1].tarih).getTime() - new Date(t1[1].tarih).getTime()
                )
            setRecords(entries);
            setCode(nextKod(entries));
        }
        catch {
            push('Veriler alınamadı');
        }
    };

    const login = async () => {
        try {
            const r = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const d = await r.json();
            if (d.token) {
                localStorage.setItem('adminToken', d.token);
                setToken(d.token);
                fetchAll(d.token);
                push('Giriş başarılı');
            } else push(d.message || 'Giriş başarısız');
        } catch {
            push('Sunucu hatası');
        }
    };

    const submit = async () => {
        if (!/^(\d{4} ){3}\d{4}$/.test(code))
            return push('Kod 16 haneli olmalı');
        if (!plaka || !gStart || !gEnd || selected.size === 0)
            return push('Zorunlu alanları doldurun');

        const body = {
            kod: code.replace(/\s/g, ''),
            plakaNo: plaka,
            garantiBaslangic: gStart,
            garantiBitis: gEnd,
            notlar: note,
            islemler: Array.from(selected),
            custom: isCustom,
        };

        const url = editMode ? '/api/admin/kod-guncelle' : '/api/admin/kod-kaydet';
        try {
            const r = await fetch(url, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (!r.ok) throw new Error();
            await fetchAll(token!);
            reset();
            push(editMode ? 'Kayıt güncellendi' : 'Kayıt eklendi');
        } catch {
            push('İşlem başarısız');
        }
    };

    const remove = async (kod: string) => {
        try {
            const r = await fetch(`/api/admin/kod-sil?kod=${kod}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!r.ok) throw new Error();
            fetchAll(token!);
            push('Silindi');
        } catch {
            push('Silme hatası');
        }
    };

    /* --- yardımcılar --- */
    const reset = () => {
        setEditMode(false);
        setPlaka('');
        setGStart('');
        setGEnd('');
        setNote('');
        setSelected(new Set());
        setIsCustom(false);
        setCode(nextKod(records));
    };

    const edit = (kod: string, v: Kayit) => {
        setEditMode(true);
        setIsCustom(true);
        setCode(fmt(kod));
        setPlaka(v.plakaNo);
        setGStart(v.garanti.baslangic);
        setGEnd(v.garanti.bitis);
        setNote(v.notlar);
        setSelected(new Set(v.islemler));
    };

    /* ----------------------- JSX ----------------------- */
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <ToastContainer />

            {/* --------- LOGIN --------- */}
            {!token && (
                <div className="max-w-md mx-auto bg-gray-200 p-6 shadow rounded mt-20">
                    <h2 className="text-2xl font-semibold text-center mb-4">
                        Yönetici Girişi
                    </h2>
                    <input
                        className="w-full px-3 py-2 border-none bg-white rounded mb-3"
                        placeholder="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full px-3 py-2 border-none bg-white rounded mb-5"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={login}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-800 transition-colors duration-200 cursor-pointer"
                    >
                        Giriş Yap
                    </button>
                </div>
            )}

            {/* --------- PANEL --------- */}
            {token && (
                <>
                    <header className="bg-white shadow">
                        {/* ► Ortalanmış, 7xl genişlikte flex konteyner */}
                        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                            <h2 className="text-2xl font-semibold text-gray-800">Mechano Yönetici Paneli</h2>

                            <button
                                onClick={() => {
                                    localStorage.removeItem('adminToken');
                                    setToken(null);
                                }}
                                className="px-4 py-1 rounded-sm border-2 border-red-700 cursor-pointer text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-200"
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </header>


                    <main className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded shadow">
                        {/* Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Kod */}
                            <div>
                                <label>Müşteri Kodu (16 Haneli)</label>
                                <input
                                    value={code}
                                    placeholder="0000 0000 0000 0000"
                                    onChange={(e) => isCustom && setCode(fmt(e.target.value))}
                                    className={clsx(
                                        "w-full px-3 py-2 border rounded font-semibold border-gray-400",
                                        !isCustom && "cursor-not-allowed bg-gray-200"
                                    )}
                                    readOnly={!isCustom}
                                />
                                <p className="text-gray-600 pt-2">🛈 Sistemdeki son müşteri kodu algılandı ve sıradaki kod otomatik olarak üretildi.</p>
                                <p className="text-gray-600 pt-2">🛈 Sıralı kod yerine kendi belirleyeceğiniz bir müşteri kodu tanımlamak istiyorsanız, lütfen alttaki kutucuğu işaretleyin ve alanı elle doldurun.</p>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={isCustom}
                                        onChange={(e) => {
                                            setIsCustom(e.target.checked);
                                            if (!e.target.checked) reset();
                                        }}
                                    />
                                    Özel Kod
                                </label>
                            </div>

                            <div>
                                <label>Araç Plaka No.</label>
                                <input
                                    value={plaka}
                                    placeholder="34 ABC 38"
                                    onChange={(e) => setPlaka(e.target.value)}
                                    className="w-full px-3 py-2 border rounded border-gray-400"
                                />
                            </div>

                            <div>
                                <label>Garanti Başlangıç (<b>ay-gün-yıl</b> cinsinden)</label>
                                <input
                                    type="date"
                                    value={gStart}
                                    onChange={(e) => setGStart(e.target.value)}
                                    className="w-full px-3 py-2 border rounded border-gray-400"
                                />
                            </div>

                            <div>
                                <label>Garanti Bitiş (<b>ay-gün-yıl</b> cinsinden)</label>
                                <input
                                    type="date"
                                    value={gEnd}
                                    onChange={(e) => setGEnd(e.target.value)}
                                    className="w-full px-3 py-2 border rounded border-gray-400"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label>Eklemek İstediğiniz Notlar (Opsiyonel)</label>
                                <textarea
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full px-3 py-2 border rounded border-gray-400"
                                />
                            </div>

                            {/* Hizmetler */}
                            <div className="md:col-span-2">
                                <label>Hizmetler</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {services.map((s) => (
                                        <label
                                            key={s}
                                            className="inline-flex items-center bg-gray-100 px-2 py-1 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                className="mr-1 border-gray-400"
                                                checked={selected.has(s)}
                                                onChange={() => {
                                                    const n = new Set(selected);
                                                    n.has(s) ? n.delete(s) : n.add(s);
                                                    setSelected(n);
                                                }}
                                            />
                                            {s}
                                        </label>
                                    ))}

                                    <input
                                        value={newSrv}
                                        onChange={(e) => setNewSrv(e.target.value)}
                                        placeholder="Yeni hizmet..."
                                        className="px-2 py-1 border rounded border-gray-400"
                                    />
                                    <button
                                        onClick={() => {
                                            const v = newSrv.trim();
                                            if (v && !services.includes(v)) {
                                                setServices([...services, v]);
                                                setNewSrv('');
                                                push('Hizmet eklendi');
                                            }
                                        }}
                                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-800 transition-colors duration-200"
                                    >
                                        Yeni Hizmet Ekle
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Aksiyon butonları */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={reset}
                                className="cursor-pointer px-6 py-2 transition-colors duration-200 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Temizle
                            </button>
                            <button
                                onClick={submit}
                                className="cursor-pointer px-8 py-2 transition-colors duration-200 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                {editMode ? 'Güncelle' : 'Kaydet'}
                            </button>
                        </div>

                        {/* Son Kayıtlar */}
                        <hr className="my-6" />
                        <div className="justify-between items-center mb-2">
                            <h2 className="font-semibold">Son 5 Kayıt</h2>
                            <p className="py-2 text-gray-500">
                                🛈 Aşağıda en son eklenen beş müşteri kaydını görüntülüyorsunuz. Kalem simgesiyle kaydı düzenleyebilir, Çöp kutusu simgesiyle silebilirsiniz. Tüm geçmişi incelemek için ise “Tüm Kayıtları Görüntüle” butonunu kullanabilirsiniz.</p>
                            {records.length > 5 && (
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="text-blue-700 underline cursor-pointer mb-3"
                                >
                                    Tüm Kayıtları Görüntüle
                                </button>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-3 py-2">Kod</th>
                                    <th className="px-3 py-2">Plaka</th>
                                    <th className="px-3 py-2">Garanti</th>
                                    <th className="px-3 py-2">Hizmetler</th>
                                    <th className="px-3 py-2">Tarih</th>
                                    <th className="px-3 py-2">Notlar</th>
                                    <th className="px-3 py-2">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {records.slice(0, 5).map(([k, v]) => (
                                    <tr key={k} className="border-t">
                                        <td className="px-3 py-2">{k}</td>
                                        <td className="px-3 py-2">{v.plakaNo}</td>
                                        <td className="px-3 py-2">
                                            {v.garanti.baslangic}→{v.garanti.bitis}
                                        </td>
                                        <td className="px-3 py-2">
                                            {v.islemler.join(', ')}
                                        </td>
                                        <td className="px-3 py-2">
                                            {new Date(v.tarih).toLocaleString('tr-TR')}
                                        </td>
                                        <td className="px-3 py-2">{v.notlar}</td>
                                        <td className="px-3 py-2 space-x-2">
                                            <button
                                                onClick={() => edit(k, v)}
                                                className="text-blue-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                                            >
                                                <PencilIcon className="h-6 w-6 inline" />
                                            </button>
                                            <button
                                                onClick={() => setConfirm({ kod: k })}
                                                className="text-red-600 hover:scale-110 transition-all duration-200 cursor-pointer"
                                            >
                                                <TrashIcon className="h-6 w-6 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </main>

                    {/* --- Tüm Kayıtlar Modal --- */}
                    <Transition appear show={modalOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-50" onClose={() => setModalOpen(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/40" />
                            </Transition.Child>

                            <div className="fixed inset-0 flex items-center justify-center p-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-200"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-100"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="bg-white w-full max-w-8xl p-6 rounded-lg shadow">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold">Tüm Kayıtlar</h3>
                                            <button onClick={() => setModalOpen(false)}>
                                                <XMarkIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto max-h-[60vh]">
                                            <table className="min-w-full text-sm">
                                                <thead className="bg-gray-200 sticky top-0">
                                                <tr>
                                                    <th className="px-3 py-2">Kod</th>
                                                    <th className="px-3 py-2">Plaka</th>
                                                    <th className="px-3 py-2">Garanti</th>
                                                    <th className="px-3 py-2">Hizmetler</th>
                                                    <th className="px-3 py-2">Tarih</th>
                                                    <th className="px-3 py-2">Notlar</th>
                                                    <th className="px-3 py-2">İşlem</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {records.map(([k, v]) => (
                                                    <tr key={k} className="border-t">
                                                        <td className="px-3 py-2">{k}</td>
                                                        <td className="px-3 py-2">{v.plakaNo}</td>
                                                        <td className="px-3 py-2">
                                                            {v.garanti.baslangic}→{v.garanti.bitis}
                                                        </td>
                                                        <td className="px-3 py-2">{v.islemler.join(', ')}</td>
                                                        <td className="px-3 py-2">
                                                            {new Date(v.tarih).toLocaleString('tr-TR')}
                                                        </td>
                                                        <td className="px-3 py-2">{v.notlar}</td>
                                                        <td className="px-3 py-2 space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    edit(k, v);
                                                                    setModalOpen(false);
                                                                }}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                <PencilIcon className="h-5 w-5 inline" />
                                                            </button>
                                                            <button
                                                                onClick={() => setConfirm({ kod: k })}
                                                                className="text-red-600 hover:underline"
                                                            >
                                                                <TrashIcon className="h-5 w-5 inline" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* --- Silme Onayı --- */}
                    {confirm && (
                        <ConfirmDialog
                            open={!!confirm}
                            onClose={() => setConfirm(null)}
                            onConfirm={() => remove(confirm.kod)}
                            title={`${code} Numaralı Kaydı Sil`}
                            message="Kayıt silme işlemi geri alınamaz."
                        />
                    )}
                </>
            )}
        </div>
    );
}
