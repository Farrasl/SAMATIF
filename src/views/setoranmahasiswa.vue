<template>
    <div class="app">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Header -->
        <Header />
        <!-- Content -->
        <router-view />
    </div>

    <div class="Isi-Setoran">
        <div class="Header-Setoran">
            <div class="setoran">
                <h3><i class="bx bxs-book"></i>Setoran</h3>
                <span>PA. {{ namaDosen }}</span>
            </div>
        </div>
    </div>

    <button class="download" @click="downloadTable">
        <span>Download</span>
        <i class='bx bxs-download'></i>
    </button>

    <div class="table-container"> 
        <div class="head-card">
            <img src="../assets/uinsuska.png" alt="UIN Suska Logo" class="logo">
            <div class="isitable">
                <h2>KARTU SETORAN HAFALAN JUZ 30</h2>
                <p>PROGRAM STUDI TEKNIK INFORMATIKA</p>
                <p>FAKULTAS SAINS DAN TEKNOLOGI</p>
                <p>UNIVERSITAS ISLAM NEGERI SULTAN SYARIF KASIM RIAU</p>
            </div>
        </div>
        <div class="setoranmahasiswa">
            <div class="info-container">
                <span>Nama Mahasiswa: {{ mahasiswa }}</span>
                <span>NIM: {{ nim }}</span>
                <span>Penasehat Akademik: {{ namaDosen }}</span>
            </div>
        </div>
        <table border="3" class="Tabel" ref="tabel">
            <tr>
                <th>No</th>
                <th>Surah</th>
                <th>Tanggal</th>
                <th>Persyaratan</th>
                <th>Paraf Dosen PA</th>
            </tr>
            <tr v-for="(surah, index) in combinedSurahs" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ surah.nama_surah }}</td>
                <td>{{ surah.tanggal }}</td>
                <td>{{ surah.persyaratan }}</td>
                <td>{{ surah.paraf_dosen }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Sidebar from '../components/sidebarmahasiswa.vue';
import Header from '../components/header.vue';

const setoran = ref([]);
const mahasiswa = ref('');
const nim = ref('');
const surahBelumDisetorkan = ref([]);
const namaDosen = ref('');
const tableRef = ref(null);

const semuaSurah = [
  "An-Naba'", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar", 
  "Al-Muthaffifiin", "Al-Insyiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", 
  "Al-Ghasyiyah", "Al-Fajr", "Al-Balad", "Asy-Syams", "Al-Lail", "Ad-Duha",
  "Al-Insyirah", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah",
  "Al-'Adiyat", "Al-Qari'ah", "At-Takasur", "Al-'Asr", "Al-Humazah",
  "Al-Fil", "Quraisy", "Al-Ma'un", "Al-Kausar", "Al-Kafirun",
  "An-Nasr", "Al-Lahab", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

function getPersyaratan(namaSurah) {
    const kerjaPraktek = ["An-Naba'", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar", "Al-Muthaffifiin", "Al-Insyiqaq", "Al-Buruj"];
    const seminarKerjaPraktek = ["At-Tariq", "Al-A'la", "Al-Ghasyiyah", "Al-Fajr", "Al-Balad", "Asy-Syams", "Al-Lail", "Ad-Duha"];
    const judulTugasAkhir = ["Al-Insyirah", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah"];
    const seminarProposal = ["Al-'Adiyat", "Al-Qari'ah", "At-Takasur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraisy", "Al-Ma'un", "Al-Kausar", "Al-Kafirun", "An-Nasr", "Al-Lahab"];
    const sidangTugasAkhir = ["Al-Ikhlas", "Al-Falaq", "An-Nas"];

    if (kerjaPraktek.includes(namaSurah)) return 'Kerja Praktek';
    if (seminarKerjaPraktek.includes(namaSurah)) return 'Seminar Kerja Praktek';
    if (judulTugasAkhir.includes(namaSurah)) return 'Judul Tugas Akhir';
    if (seminarProposal.includes(namaSurah)) return 'Seminar Proposal';
    if (sidangTugasAkhir.includes(namaSurah)) return 'Sidang Tugas Akhir';
    return '-';
}

async function fetchData() {
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    nim.value = userData ? userData.nim : null;
    mahasiswa.value = userData ? userData.name : null;

    if (!nim.value) {
        console.error('NIM not found in localStorage');
        return;
    }

    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        // Include the token in headers for authorization
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        // Fetch PA's name
        const responseDosen = await axios.get(`https://samatif.xyz/dosenpa/by-nim.php?nim=${nim.value}`, config);
        const dosenData = responseDosen.data.mahasiswa[0];
        namaDosen.value = dosenData ? dosenData['Nama Dosen PA'] : 'Tidak ditemukan';

        // Fetch other data as before
        const responseNama = await axios.get(`https://samatif.xyz/setoran/sudahbelum.php?nim=${nim.value}`, config);
        const dataNama = responseNama.data;
        mahasiswa.value = dataNama.Nama;

        const responseSetoran = await axios.get(`https://samatif.xyz/setoran/by-nim.php?nim=${nim.value}`, config);
        const dataSetoran = responseSetoran.data.setoran;
        setoran.value = dataSetoran.map(item => ({ ...item, persyaratan: getPersyaratan(item.nama_surah) }));

        const namaSurahDisetorkan = setoran.value.map(item => item.nama_surah);
        surahBelumDisetorkan.value = semuaSurah
            .filter(nama_surah => !namaSurahDisetorkan.includes(nama_surah))
            .map(nama_surah => ({
                nama_surah,
                persyaratan: getPersyaratan(nama_surah)
            }));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const combinedSurahs = computed(() => {
    const combined = semuaSurah.map(nama_surah => {
        const submittedSurah = setoran.value.find(surah => surah.nama_surah === nama_surah);
        if (submittedSurah) {
            return submittedSurah;
        }
        const unsubmittedSurah = surahBelumDisetorkan.value.find(surah => surah.nama_surah === nama_surah);
        return unsubmittedSurah ? { ...unsubmittedSurah, tanggal: '', paraf_dosen: '' } : null;
    }).filter(surah => surah !== null);

    return combined;
});

const downloadTable = async () => {
    try {
        await nextTick(); // Ensure elements are rendered before accessing ref
        const tableContainer = document.querySelector('.table-container');
        if (!tableContainer) {
            console.error('Error: Table container not found.');
            return;
        }

        const canvas = await html2canvas(tableContainer);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'landscape'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Kartu Setoran.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style>
:root {
    --primary: #4ade80;
    --primary-alt: #22c55e;
    --grey: #64748b;
    --dark: #1e293b;
    --dark-alt: #334155;
    --light: #f1f5f9;
    --sidebar-width: 300px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

.app {
    display: flex;

    main {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 1024px) {
            padding-left: 6rem;
        }
    }
}

.Header-Setoran {
    background: #FFFFFF;
    position: absolute;
    top: 75px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -10px;
    padding: 5px 25px 10px 2px;
    box-sizing: border-box;
    width: calc(100% - 225px); 
    border: 1px solid var(--dark);
}

.setoran {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.setoran h3 {
    margin-right: 475px; 
}

.setoran span {
    margin-left: 400px; 
}

.download {
    margin-top: 150px;
    margin-right: 50px;
    margin-left: 1275px;
    box-sizing: border-box;
    border: 1px solid var(--dark);
}

.Tabel {
    width: 80%;
    margin-top: -20px;
    margin-left: 250px;
    margin-bottom: 30px;
}

td {
    text-align: center;
}

.head-card {
    display: flex;
    align-items: center;
    justify-content: center;
}

.head-card .logo{
    width: 100px;
    height: 100px;
}

.logo {
    margin-right: 20px;
}

.isitable {
    text-align: center;
}

.setoranmahasiswa {
    margin-left: 175px;
}

.info-container {
    display: flex;
    justify-content: space-between;
    width: 100%; /* Adjust as needed */
    margin-bottom: 20px;
}

.info-container span {
    flex: 1;
    text-align: center;
}
</style>
