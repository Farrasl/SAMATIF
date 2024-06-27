<template>
	<div class="app">
	  <!-- Sidebar -->
	  <Sidebar />
	  <!-- Header -->
	  <Header />
	  <!-- Content -->
	  <router-view />
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
		  <div class="lang">{{ skill.lang }}</div>
		  <div class="bar">
			<div class="progress" :style="{ background: skill.color, width: skill.percent + '%' }"></div>
			<span class="percent">{{ skill.percent }}%</span>
		  </div>
		</li>
	  </ul>
	</div>
  </template>
  
  <script setup>
  import Sidebar from '../components/sidebarmahasiswa.vue';
  import Header from '../components/headermahasiswa.vue';
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
  
  const namaDosen = ref('');
  
  onMounted(async () => {
	try {
	  const userData = localStorage.getItem('userData');
	  const nim = userData ? JSON.parse(userData).nim : null;
	  if (!nim) {
		console.error('NIM not found in localStorage');
		return;
	  }
  
	  const token = localStorage.getItem('token');
	  if (!token) {
		console.error('User not authenticated');
		return;
	  }
  
	  // Fetch Setoran
	  const setoranResponse = await axios.get(`https://samatif.xyz/setoran/by-nim.php?nim=${nim}`, {
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  });
	  setoranList.value = setoranResponse.data.setoran;
  
	  // Fetch Skills
	  const skillsResponse = await axios.get(`https://samatif.xyz/setoran/sudahbelum.php?nim=${nim}`, {
		headers: {
		  'Authorization': `Bearer ${token}`
		}
	  });
	  if (skillsResponse.data.status === 'error') {
		console.error('Error fetching skills data:', skillsResponse.data.message);
	  } else {
		const { percentages } = skillsResponse.data;
		percentages.forEach((item) => {
		  const index = skills.value.findIndex((skill) => skill.lang === item.lang);
		  if (index !== -1) {
			skills.value[index].percent = item.percent;
		  }
		});
	  }
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
  }
  
  main {
	flex: 1 1 0;
	padding: 2rem;
  
	@media (max-width: 1024px) {
	  padding-left: 6rem;
	}
  }
  
  .Tabel-Riwayat {
	width: 80%;
	margin-top: 90px;
	margin-left: 250px;
	margin-bottom: 30px;
  }
  
  td {
	text-align: center;
  }
  
  .box {
	width: 1095px;
	padding: 10px;
	margin-left: 250px;
	margin-top: 30px;
	margin-bottom: 30px;
	background: #f3f3f3;
	box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.1);
  }
  
  ul li {
	list-style-type: none;
	padding: 10px;
  }
  
  .lang {
	margin: 5px;
	font-size: 15px;
  }
  
  .bar {
	width: 100%;
	background: #dfdfdf;
	overflow: hidden;
	padding: 5px;
  }
  
  .progress {
	float: left;
	padding: 15px;
  }
  
  .percent {
	float: right;
	font-weight: 600;
	height: 30px;
	line-height: 30px;
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
	.Header-Riwayat {
	  width: calc(100% - 50px);
	}
  
	.riwayat h3 {
	  margin-right: 0;
	  text-align: center;
	}
  
	.riwayat span {
	  margin-left: 0;
	}
  
	.Tabel-Riwayat {
	  margin-left: 20px;
	  width: calc(100% - 40px);
	}
  
	.box {
	  margin-left: 20px;
	  width: calc(100% - 40px);
	}
  }
  
  @media (max-width: 768px) {
	.Tabel-Riwayat {
	  margin-top: 100px;
	}
  
	.Header-Riwayat {
	  top: 60px;
	}
  }
  
  @media (max-width: 480px) {
	.Tabel-Riwayat {
	  margin-top: 80px;
	}
  
	.Header-Riwayat {
	  padding: 5px;
	}
  
	.Tabel-Riwayat th,
	.Tabel-Riwayat td {
	  font-size: small;
	  padding: 5px;
	}
  
	.box {
	  padding: 5px;
	}
  }
  </style>
  