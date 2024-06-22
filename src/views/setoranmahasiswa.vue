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
        <span> Download</span>
        <i class='bx bxs-download'></i>
    </button>

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
    const nim = userData ? userData.nim : null;

    if (!nim) {
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
        const responseDosen = await axios.get(`/api/dosenpa/by-nim.php?nim=${nim}`, config);
        namaDosen.value = responseDosen.data.nama_dosen;

        // Fetch other data as before
        const responseNama = await axios.get(`/api/setoran/sudahbelum.php?nim=${nim}`, config);
        const dataNama = responseNama.data;
        mahasiswa.value = dataNama.Nama;

        const responseSetoran = await axios.get(`/api/setoran/by-nim.php?nim=${nim}`, config);
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
    // Combine setoran and surahBelumDisetorkan, maintaining the original order
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
        await nextTick(); // pastikan elemen telah di-render sebelum mengakses ref
        const table = tableRef.value;
        if (!table) {
            console.error('Error: Table reference is not set.');
            return;
        }
        
        const canvas = await html2canvas(table);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'landscape',
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('tabel-setoran.pdf');
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
	margin-top:10px;
	margin-left: 250px;
	margin-bottom: 30px;
}

td {
	text-align: center;
}


</style>