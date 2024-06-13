<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Header -->
		<Header />
		<!-- Content -->
		<router-view />
	</div>
    <div class="Isi-Riwayat">
    <div class="Header-Riwayat" >
        <div class="riwayat">
            <h3><i class="bx bxs-check-square"></i>Riwayat</h3>
            <span> PA. Siti Ramadhani</span>
        </div>
    </div>
    </div>

    <table border="2" class="Tabel-Riwayat">
		<tr>
			<th>No</th>
            <th>Tanggal</th>
			<th>Surah</th>
			<th>Kelancaran</th>
			<th>Tajwid</th>
            <th>Makhrajul Huruf</th>
        </tr>
		<tr v-for="(item, index) in setoranList" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ item.tanggal }}</td>
      <td>{{ item.nama_surah }}</td>
      <td>{{ item.kelancaran }}</td>
      <td>{{ item.tajwid }}</td>
      <td>{{ item.makhrajul_huruf }}</td>
    </tr>
    </table>
		
    <div class="box">
 		 <ul>
 		 	<li v-for="skill in skills" :key="skill.lang">
 		 		<div class="lang">{{skill.lang}}</div>
 				<div class="bar">
 					<div class="progress" :style="{ background: skill.color, width: skill.percent + '%' }"></div>
 		 			<span class="percent">{{skill.percent}}%</span>
 				</div>
 		 	</li>
 		 </ul>
 	</div>

</template>

<script setup>
import Sidebar from '../components/sidebarmahasiswa.vue';
import Header from '../components/header.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const setoranList = ref([]);
const skills = ref([
  { lang: "Kerja Praktek", percent: 0, color: "var(--dark)" },
  { lang: "Seminar Kerja Praktek", percent: 0, color: "var(--dark)" },
  { lang: "Judul Tugas Akhir", percent: 0, color: "var(--dark)" },
  { lang: "Seminar Proposal", percent: 0, color: "var(--dark)" },
  { lang: "Sidang Tugas Akhir", percent: 0, color: "var(--dark)" },
]);

onMounted(async () => {
  try {
    const setoranResponse = await axios.get('/api/setoran/by-nim.php?nim=122501');
    setoranList.value = setoranResponse.data.setoran; 

    const skillsResponse = await axios.get('/api/setoran/sudahbelum.php?nim=122501');
    const { percentages } = skillsResponse.data;
    percentages.forEach((item) => {
      const index = skills.value.findIndex((skill) => skill.lang === item.lang);
      if (index !== -1) {
        skills.value[index].percent = item.percent;
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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

.Header-Riwayat {
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

.riwayat {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.riwayat h3 {
    margin-right: 475px; 
}

.riwayat span {
    margin-left: 400px; 
}

.Tabel-Riwayat {
	width: 80%;
	margin-top:150px;
	margin-left: 250px;
	margin-bottom: 30px;
}

td {
	text-align: center;
}

.box{
	width: 1095px;
	padding: 10px;
    margin-left: 250px;
	margin-top: 30px;
    margin-bottom: 30px;
	background:#f3f3f3;
	box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.1);
}

ul li{
	list-style-type: none;
	padding:10px;
}

.lang{
	margin:5px;
	font-size: 15px;
}

.bar{
	width: 100%;
	background:#dfdfdf;
	overflow: hidden;
	padding:5px;
}

.progress{
	float:left;
	padding:15px;
}

.percent{
	float: right;
	font-weight: 600;
	height: 30px;
	line-height: 30px;
}


</style>