<template>
	<div class="app">
	  <!-- Sidebar -->
	  <Sidebar />
	  <!-- Header -->
	  <Header />
	  <!-- Content -->
	  <router-view />
	</div>
  
	<div class="Isi-Beranda">
	  <div class="Header-Beranda">
		<div class="beranda">
		  <h3><i class="bx bxs-home"></i>Beranda</h3>
		  <span>PA. {{ namaDosen }}</span>
		</div>
	  </div>
	</div>
  
	<div class="welcome">
	  <h2 class="Selamatdatang">Selamat Datang <span class="namauser" style="font-style: italic;">{{ nama }}</span></h2>
	</div>
  </template>
  
  <script>
  import Sidebar from '../components/sidebarmahasiswa.vue';
  import Header from '../components/header.vue';
  import axios from 'axios';
  
  export default {
	components: {
	  Sidebar,
	  Header
	},
	data() {
	  return {
		nama: '', // Inisialisasi variabel nama
		namaDosen: '' // Inisialisasi variabel nama dosen
	  };
	},
	mounted() {
	  this.getNamaUser(); // Panggil fungsi untuk mengambil nama pengguna saat komponen dimuat
	  this.getNamaDosen(); // Panggil fungsi untuk mengambil nama dosen saat komponen dimuat
	},
	methods: {
	  getNamaUser() {
		// Ambil data dari localStorage
		const userData = localStorage.getItem('userData');
		if (userData) {
		  const { nama } = JSON.parse(userData); // Ambil nilai nama dari data JSON
		  this.nama = nama; // Tetapkan nilai nama ke variabel data
		}
	  },
	  async getNamaDosen() {
		try {
		  // Ambil NIM dari localStorage
		  const userData = localStorage.getItem('userData');
		  if (userData) {
			const { nim } = JSON.parse(userData);
			// Panggil endpoint dengan NIM yang diambil dari localStorage
			const response = await axios.get(`/api/dosenpa/by-nim.php?nim=${nim}`);
			if (response.data.status === 'success') {
			  this.namaDosen = response.data.mahasiswa[0]['Nama Dosen PA']; // Tetapkan nama dosen PA ke variabel data
			} else {
			  console.error('Gagal mengambil data dosen:', response.data.message);
			}
		  }
		} catch (error) {
		  console.error('Error fetching dosen data:', error);
		}
	  }
	}
  };
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

.Header-Beranda {
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

.beranda {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.beranda h3 {
    margin-right: 475px; 
}

.beranda span {
    margin-left: 400px; 
}

.welcome {
	margin-top: 150px;
    margin-left: 250px; 
	width: 500px;
    height: 250px;
}

.desc {
    margin-top: 10px;
    margin-left: 250px;
    max-width: 700px;
    color: var(--dark);
    font-size: 1.1rem;
    line-height: 1.6;
}

.Selamatdatang {
    font-size: 2rem;
    text-align: center;
    color: var(--dark); 
  }
  
.namauser {
    color: var(--primary-alt);
  }
</style>