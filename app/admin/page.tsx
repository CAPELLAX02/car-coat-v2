'use client';

import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Kayit = {
    plakaNo: string;
    garanti: {
        baslangic: string;
        bitis: string
    };
    notlar: string;
    islemler: string[];
    tarih: string;
    custom?: boolean;
};

const BASE_CODE_NUM = 2378561284420001n;
const BASE_CODE_FMT = '2378 5612 8442 0001';
const initialServices = [
    'Cam Filmi Hizmeti',
    'Seramik Kaplama Hizmeti',
    'PPF Kaplama Hizmeti',
    'Renk Değişim Hizmeti',
];


export default function AdminPage() {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [records, setRecords] = useState<[string, Kayit][]>([]);
    const [services, setServices] = useState<string[]>(initialServices);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
    const [newService, setNewService] = useState('');

    const [code, setCode] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const [plakaNo, setPlakaNo] = useState('');
    const [garantiBaslangic, setGarantiBaslangic] = useState('');
    const [garantiBitis, setGarantiBitis] = useState('');
    const [notlar, setNotlar] = useState('');

    useEffect(() => {
        const t = localStorage.getItem('adminToken');
        if (t) { setToken(t); fetchAll(t); }
    }, []);

    const formatKod = (raw: string) =>
        raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

    const calculateNextKod = (entries: [string, Kayit][]) => {
        if (!entries.length) return BASE_CODE_FMT;
        const used = new Set(entries.map(([k]) => k.replace(/\s/g, '')));

        const lastAuto = entries
            .filter(([, v]) => v.custom === false)
            .reduce<bigint>((max, [k]) => {
                const num = BigInt(k.replace(/\s/g, ''));
                return num > max ? num : max;
            }, 0n);

        let next = lastAuto >= BASE_CODE_NUM ? lastAuto + 1n : BASE_CODE_NUM;
        while (used.has(next.toString().padStart(16, '0'))) next++;

        return formatKod(next.toString().padStart(16, '0'));
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) {
            setToken(storedToken);
            fetchAll(storedToken);
        }
    }, []);

    const fetchAll = async (tkn: string) => {
        try {
            const res = await fetch('/api/admin/kod-tum', {
                headers: { Authorization: `Bearer ${tkn}` }
            });
            const data = await res.json();
            const entries = Object.entries(data || {}) as [string, Kayit][];
            setRecords(entries);
            setCode(calculateNextKod(entries));
        } catch (err) {
            alert("Veriler alınırken hata oluştu.");
        }
    };


    const login = () => {
        fetch('/api/admin/login',{
            method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username,password})
        }).then(r=>r.json()).then(d=>{
            if (d.token) {
                localStorage.setItem('adminToken', d.token);
                setToken(d.token);
                fetchAll(d.token);
            } else alert(d.message);
        });
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null); setRecords([]); resetForm();
    };

    const resetForm = () => {
        setEditMode(false);
        setPlakaNo(''); setGarantiBaslangic(''); setGarantiBitis(''); setNotlar('');
        setSelectedServices(new Set()); setIsCustom(false);
        setCode(calculateNextKod(records));
    };

    const submit = () => {
        if (!/^(\d{4} ){3}\d{4}$/.test(code)) return alert('16 haneli kod girin.');
        if (!plakaNo||!garantiBaslangic||!garantiBitis||selectedServices.size===0)
            return alert('Gerekli alanları doldurun.');
        const body = {
            kod: code.replace(/\s/g,''),
            plakaNo,garantiBaslangic,garantiBitis,
            notlar,islemler:Array.from(selectedServices),custom:isCustom
        };
        const url = editMode? '/api/admin/kod-guncelle':'/api/admin/kod-kaydet';
        fetch(url,{
            method: editMode?'PUT':'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },body: JSON.stringify(body)
        }).then(r=>r.ok? fetchAll(token!): r.json().then(j=>alert(j.message)));
        setSuccessMsg(editMode?'Güncellendi!':'Kaydedildi!');
        setTimeout(()=> setSuccessMsg(''),2000);
    };

    const edit = (kod:string, v:Kayit) => {
        setEditMode(true); setIsCustom(true);
        setCode(formatKod(kod));
        setPlakaNo(v.plakaNo); setGarantiBaslangic(v.garanti.baslangic);
        setGarantiBitis(v.garanti.bitis); setNotlar(v.notlar);
        setSelectedServices(new Set(v.islemler));
    };

    const remove = (kod:string) => {
        if (!confirm('Silinsin mi?')) return;
        fetch(`/api/admin/kod-sil?kod=${kod}`,{
            method:'DELETE',headers:{Authorization:`Bearer ${token}`}
        }).then(()=>fetchAll(token!));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {!token ? (
                <div className="max-w-md mx-auto bg-white shadow rounded p-6 mt-20">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Admin Girişi</h2>
                    <input type="text" className="w-full mb-3 px-3 py-2 border rounded" placeholder="Kullanıcı Adı" value={username} onChange={e=>setUsername(e.target.value)}/>
                    <input type="password" className="w-full mb-5 px-3 py-2 border rounded" placeholder="Şifre" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button onClick={login} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Giriş Yap</button>
                </div>
            ) : (
                <div>
                    <header className="flex justify-between items-center bg-white p-4 shadow">
                        <h2 className="text-xl font-bold">Mechano Yönetici Paneli</h2>
                        <button onClick={logout} className="text-red-600 hover:underline">Çıkış Yap</button>
                    </header>

                    <main className="mt-6 max-w-4xl mx-auto bg-white p-6 rounded shadow">
                        {successMsg && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{successMsg}</div>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Müşteri Kodu</label>
                                <input value={code} onChange={e=>isCustom && setCode(formatKod(e.target.value))}
                                       className="w-full px-3 py-2 border rounded bg-gray-100"
                                       readOnly={!isCustom}/>
                                <label className="inline-flex items-center mt-2">
                                    <input type="checkbox" className="mr-2" checked={isCustom} onChange={e=>{setIsCustom(e.target.checked); resetForm();}}/>
                                    Özel Kod
                                </label>
                            </div>
                            <div>
                                <label>Plaka No</label>
                                <input value={plakaNo} onChange={e=>setPlakaNo(e.target.value)}
                                       className="w-full px-3 py-2 border rounded"/>
                            </div>
                            <div>
                                <label>Garanti Başlangıç</label>
                                <input type="date" value={garantiBaslangic} onChange={e=>setGarantiBaslangic(e.target.value)}
                                       className="w-full px-3 py-2 border rounded"/>
                            </div>
                            <div>
                                <label>Garanti Bitiş</label>
                                <input type="date" value={garantiBitis} onChange={e=>setGarantiBitis(e.target.value)}
                                       className="w-full px-3 py-2 border rounded"/>
                            </div>
                            <div className="md:col-span-2">
                                <label>Notlar</label>
                                <textarea rows={3} value={notlar} onChange={e=>setNotlar(e.target.value)}
                                          className="w-full px-3 py-2 border rounded"/>
                            </div>
                            <div className="md:col-span-2">
                                <label>Hizmetler</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {services.map((s,i)=>
                                        <label key={i} className="inline-flex items-center bg-gray-100 px-2 py-1 rounded">
                                            <input type="checkbox" className="mr-1" checked={selectedServices.has(s)}
                                                   onChange={()=> {
                                                       const n = new Set(selectedServices);
                                                       n.has(s)? n.delete(s): n.add(s);
                                                       setSelectedServices(n);
                                                   }}/>
                                            {s}
                                        </label>
                                    )}
                                    <input placeholder="Yeni hizmet..." value={newService}
                                           onChange={e=>setNewService(e.target.value)}
                                           className="px-2 py-1 border rounded"/>
                                    <button onClick={()=>{if(newService&&!services.includes(newService)){setServices([...services,newService]); setNewService('');}}}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Ekle</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button onClick={resetForm} className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Temizle</button>
                            <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">{editMode? 'Güncelle':'Kaydet'}</button>
                        </div>

                        <hr className="my-6"/>

                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Son 5 Kayıt</h2>
                            {records.length>5 && <button onClick={()=>setModalOpen(true)} className="text-blue-600 hover:underline">Tümünü Gör</button>}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-3 py-2">Kod</th>
                                    <th className="px-3 py-2">Plaka</th>
                                    <th className="px-3 py-2">Garanti</th>
                                    <th className="px-3 py-2">Hizmetler</th>
                                    <th className="px-3 py-2">Tarih</th>
                                    <th className="px-3 py-2">İşlem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {records.slice(0,5).map(([k,v])=>(
                                    <tr key={k} className="border-t">
                                        <td className="px-3 py-2">{k}</td>
                                        <td className="px-3 py-2">{v.plakaNo}</td>
                                        <td className="px-3 py-2">{v.garanti.baslangic}→{v.garanti.bitis}</td>
                                        <td className="px-3 py-2">{v.islemler.join(', ')}</td>
                                        <td className="px-3 py-2">{new Date(v.tarih).toLocaleString('tr-TR')}</td>
                                        <td className="px-3 py-2 space-x-2">
                                            <button onClick={()=>edit(k,v)} className="text-blue-600 hover:underline"><PencilIcon className="h-5 w-5 inline"/></button>
                                            <button onClick={()=>remove(k)} className="text-red-600 hover:underline"><TrashIcon className="h-5 w-5 inline"/></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </main>

                    <Dialog open={modalOpen} onClose={()=>setModalOpen(false)} className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30">
                        <div className="flex items-center justify-center min-h-screen p-4">
                            <Dialog.Panel className="bg-white w-full max-w-4xl p-6 rounded-lg shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold">Tüm Kayıtlar</h3>
                                    <button onClick={()=>setModalOpen(false)}><XMarkIcon className="h-6 w-6"/></button>
                                </div>
                                <div className="overflow-x-auto max-h-[60vh]">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-200 sticky top-0">
                                        <tr>
                                            <th className="px-3 py-2">Kod</th>
                                            <th className="px-3 py-2">Plaka</th>
                                            <th className="px-3 py-2">Garanti</th>
                                            <th className="px-3 py-2">Hizmetler</th>
                                            <th className="px-3 py-2">Tarih</th>
                                            <th className="px-3 py-2">İşlem</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {records.map(([k,v])=>(
                                            <tr key={k} className="border-t">
                                                <td className="px-3 py-2">{k}</td>
                                                <td className="px-3 py-2">{v.plakaNo}</td>
                                                <td className="px-3 py-2">{v.garanti.baslangic}→{v.garanti.bitis}</td>
                                                <td className="px-3 py-2">{v.islemler.join(', ')}</td>
                                                <td className="px-3 py-2">{new Date(v.tarih).toLocaleString('tr-TR')}</td>
                                                <td className="px-3 py-2 space-x-2">
                                                    <button onClick={()=>{edit(k,v);setModalOpen(false)}} className="text-blue-600 hover:underline"><PencilIcon className="h-5 w-5 inline"/></button>
                                                    <button onClick={()=>remove(k)} className="text-red-600 hover:underline"><TrashIcon className="h-5 w-5 inline"/></button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            )}
        </div>
    );
}
