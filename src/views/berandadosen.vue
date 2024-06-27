<template>
	<div class="app">
	  <!-- Sidebar -->
	  <Sidebar />
	  <!-- Header -->
	  <Header />
	  <!-- Content -->
	  <router-view />
	</div>
	<div class="welcome">
	  <h2 class="Selamatdatang">Assalamualaikum <span class="namauser" style="font-style: italic;">{{ nama }}</span></h2>
	</div>
	<div class="isiparagraf">
	  <p>Setoran ayat mahasiswa TIF adalah platform yang dirancang untuk memudahkan mahasiswa dalam mengatur dan melacak progres hafalan mereka. Dalam konteks ini, hafalan merujuk pada ayat-ayat Al-Qur'an, teks-teks klasik, atau materi akademis lain yang perlu dipelajari dan dihafal secara berkala.</p>
	  <br>
	  <p>Dengan aplikasi ini, mahasiswa dapat dengan mudah merekam setoran hafalan mereka, mendapatkan feedback dari dosen pa atau mentor, serta memantau perkembangan mereka dari waktu ke waktu. Fitur-fitur yang intuitif dan user-friendly memastikan pengalaman pengguna yang menyenangkan dan efektif.</p>
	  <br>
	  <p>Selamat menggunakan Aplikasi Setoran Hafalan Mahasiswa! Semoga alat ini membantu Anda dalam mencapai tujuan akademis dan spiritual Anda dengan lebih teratur dan sistematis. Teruslah berusaha dan jangan pernah berhenti belajar.</p>
	  <br><br><br><br><br>
	  <h3>Setiap hari, sedikit demi sedikit, mari kita tambahkan hafalan Al-Qur'an ke dalam hati kita.</h3>
	</div>
  </template>
  
  <script>
  import Sidebar from '../components/sidebardosen.vue';
  import Header from '../components/headerdosen.vue';
  
  export default {
	components: {
	  Sidebar,
	  Header
	},
	data() {
	  return {
		nama: ''
	  };
	},
	mounted() {
	  this.getNamaUser(); // Panggil fungsi untuk mengambil nama pengguna saat komponen dimuat
	},
	methods: {
	  getNamaUser() {
		// Ambil data dari localStorage
		const userData = localStorage.getItem('userData');
		if (userData) {
		  const { nama } = JSON.parse(userData); // Ambil nilai nama dari data JSON
		  this.nama = nama; // Tetapkan nilai nama ke variabel data
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
  }
  
  .main {
	flex: 1 1 0;
	padding: 2rem;
  }
  
  .welcome {
	text-align: center;
  }
  
  .isiparagraf {
	padding: 1rem;
  }
  
  @media (min-width: 1024px) {
	.app {
	  .main {
		padding-left: 6rem;
	  }
	}
  }
  
  @media (min-width: 768px) {
	.Beranda-item {
	  display: inline-block;
	  width: calc(50% - 2rem);
	}
  }
  
  @media (min-width: 1024px) {
	.Beranda-item {
	  width: calc(33.333% - 2rem);
	}
  }
  </style>
  