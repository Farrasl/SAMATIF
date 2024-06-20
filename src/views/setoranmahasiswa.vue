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
		  <span>PA. Siti Ramadhani</span> 
		</div>
	  </div>
	</div>
	<div class="download">
	  <span> Download</span>
	  <i class='bx bxs-download'></i>
	</div>
	<table border="2" class="Tabel">
	  <tr>
		<th>No</th>
		<th>Surah</th>
		<th>Tanggal</th>
		<th>Persyaratan</th>
		<th>Paraf Dosen PA</th>
	  </tr>
	  <tr v-for="(item, index) in sortedSetoran" :key="index">
		<td>{{ index + 1 }}</td>
		<td>{{ item.nama_surah }}</td>
		<td>{{ item.tanggal }}</td> 
		<td>{{ item.persyaratan }}</td> 
		<td>{{ item.paraf_dosen }}</td>
	  </tr>
	  <tr v-for="(surah, idx) in surahBelumDisetorkan" :key="'surah-' + idx">
		<td>{{ setoran.length + idx + 1 }}</td>
		<td>{{ surah.nama_surah }}</td>
		<td>-</td> 
		<td>{{ surah.persyaratan }}</td>
		<td>-</td> 
	  </tr>
	</table>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import Sidebar from '../components/sidebarmahasiswa.vue';
  import Header from '../components/header.vue';
  
  const setoran = ref([]);
  const mahasiswa = ref('');
  const surahBelumDisetorkan = ref([]);
  
  function getPersyaratan(namaSurah) {
	const kerjaPraktek = [
	  "An-Naba'", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar", 
	  "Al-Muthaffifiin", "Al-Insyiqaq", "Al-Buruj"
	];
	const seminarKerjaPraktek = [
	  "At-Tariq", "Al-A'la", "Al-Ghasyiyah", "Al-Fajr", "Al-Balad",
	  "Asy-Syams", "Al-Lail", "Ad-Duha"
	];
	const judulTugasAkhir = [
	  "Al-Insyirah", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah",
	  "Az-Zalzalah"
	];
	const seminarProposal = [
	  "Al-'Adiyat", "Al-Qari'ah", "At-Takasur", "Al-'Asr", "Al-Humazah",
	  "Al-Fil", "Quraisy", "Al-Ma'un", "Al-Kausar", "Al-Kafirun",
	  "An-Nasr", "Al-Lahab"
	];
	const sidangTugasAkhir = [
	  "Al-Ikhlas", "Al-Falaq", "An-Nas"
	];
  
	if (kerjaPraktek.includes(namaSurah)) return 'Kerja Praktek';
	if (seminarKerjaPraktek.includes(namaSurah)) return 'Seminar Kerja Praktek';
	if (judulTugasAkhir.includes(namaSurah)) return 'Judul Tugas Akhir';
	if (seminarProposal.includes(namaSurah)) return 'Seminar Proposal';
	if (sidangTugasAkhir.includes(namaSurah)) return 'Sidang Tugas Akhir';
	return '-';
  }
  
  async function fetchData() {
	const nim = '122501'; // Ganti dengan NIM yang sesuai
  
	try {
	  const responseNama = await fetch(`/api/setoran/sudahbelum.php?nim=122501`);
	  const dataNama = await responseNama.json();
	  mahasiswa.value = dataNama.Nama; 
  
	  const responseSetoran = await fetch(`/api/setoran/by-nim.php?nim=122501`);
	  const dataSetoran = await responseSetoran.json();
	  setoran.value = dataSetoran.setoran.map(item => ({
		...item,
		persyaratan: getPersyaratan(item.nama_surah)
	  })); 
  
	  const semuaSurah = dataNama.percentages.reduce((acc, curr) => acc.concat(curr.surah_names.map(surah => ({ nama_surah: surah }))), []);
	  
	  const namaSurahDisetorkan = setoran.value.map(item => item.nama_surah);
	  surahBelumDisetorkan.value = semuaSurah
		.filter(surah => !namaSurahDisetorkan.includes(surah.nama_surah))
		.map(surah => ({
		  ...surah,
		  persyaratan: getPersyaratan(surah.nama_surah)
		}));
  
	} catch (error) {
	  console.error('Error fetching data:', error);
	}
  }
  
  const sortedSetoran = computed(() => {
	return [...setoran.value].sort((a, b) => a.id_surah - b.id_surah);
  });
  
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