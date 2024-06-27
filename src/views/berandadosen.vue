<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Header -->
		<Header />
		<!-- Content -->
		<router-view />
	</div>
    <div class="Isi-Beranda" >
    <div class="Header-Beranda" >
        <div class="beranda-dosen">
            <h3><i class="bx bxs-home"></i>Beranda</h3>
        </div>
    </div>
    </div>
	<div class="welcome">
		<h2 class="Selamatdatang">Assalamualaikum <span class="namauser" style="font-style: italic;">{{ nama }}</span></h2>
	</div>
	<div class="isiparagraf">
		<p>Setoran ayat mahasiswa TIF adalah platform yang dirancang untuk memudahkan mahasiswa dalam mengatur dan melacak progres hafalan mereka. Dalam konteks ini, hafalan merujuk pada ayat-ayat Al-Qur'an, teks-teks klasik, atau materi akademis lain yang perlu dipelajari dan dihafal secara berkala.
      </p> <br>
		<p>Dengan aplikasi ini, mahasiswa dapat dengan mudah merekam setoran hafalan mereka, mendapatkan feedback dari dosen pa atau mentor, serta memantau perkembangan mereka dari waktu ke waktu. Fitur-fitur yang intuitif dan user-friendly memastikan pengalaman pengguna yang menyenangkan dan efektif.
      </p> <br>
		<p>Selamat menggunakan Aplikasi Setoran Hafalan Mahasiswa! Semoga alat ini membantu Anda dalam mencapai tujuan akademis dan spiritual Anda dengan lebih teratur dan sistematis. Teruslah berusaha dan jangan pernah berhenti belajar.
      </p> <br><br><br><br><br>
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
		nama: '' // Inisialisasi variabel nama
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

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}




.beranda-dosen h3 {
    margin-left: -550px; 
}

.Beranda-item1 {
	display: grid;
    gap: 50px; 
    padding: 15px;
    margin-top: 150px;
    margin-left: 250px; 
	width: 500px;
    height: 250px;
    border: 2px solid #fff; 
    padding: 20px; 
    color:var(--dark); 
    text-align: center; 
    border: 5px solid var(--primary-alt); 
}

.Beranda-item1 i {
	font-size: 3rem;
	margin-top: -25px;
	margin-left: 490px;
}

.Beranda-item1 span {
	margin-left: 300px;
	margin-top: 125px;
}

.Beranda-item2 {
	display: grid;
    gap: 50px; 
    padding: 15px;
    margin-top: 30px;
    margin-left: 850px; 
	width: 500px;
    height: 250px;
    border: 2px solid #fff; 
    padding: 20px; 
    color:var(--dark); 
    text-align: center; 
    border: 5px solid var(--primary-alt); 
}

.Beranda-item2 i {
	font-size: 3rem;
	margin-top: -300px;
	margin-left: -575px;
}

.Beranda-item2 span {
	margin-left: 355px;
	margin-top: 200px;
}

.Beranda-item3 {
	display: grid;
    gap: 50px; 
    padding: 15px;
    margin-top: 30px;
    margin-left: 250px;
	margin-bottom: 50px; 
	width: 500px;
    height: 250px;
    border: 2px solid #fff; 
    padding: 20px; 
    color:var(--dark); 
    text-align: center; 
    border: 5px solid var(--primary-alt); 
}

.Beranda-item3 i {
	font-size: 3rem;
	margin-top: -25px;
	margin-left: 490px;
}

.Beranda-item3 span {
	margin-left: 300px;
	margin-top: 125px;
}


</style>