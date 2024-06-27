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
		<p>Setoran ayat mahasiswa TIF adalah platform yang dirancang untuk memudahkan mahasiswa dalam mengatur dan melacak progres hafalan mereka. Dalam konteks ini, hafalan merujuk pada ayat-ayat Al-Qur'an, teks-teks klasik, atau materi akademis lain yang perlu dipelajari dan dihafal secara berkala.
      </p> <br>
		<p>Dengan aplikasi ini, mahasiswa dapat dengan mudah merekam setoran hafalan mereka, mendapatkan umpan balik dari dosen atau mentor, serta memantau perkembangan mereka dari waktu ke waktu. Fitur-fitur yang intuitif dan user-friendly memastikan pengalaman pengguna yang menyenangkan dan efektif.
      </p> <br>
		<p>Selamat menggunakan Aplikasi Setoran Hafalan Mahasiswa! Semoga alat ini membantu Anda dalam mencapai tujuan akademis dan spiritual Anda dengan lebih teratur dan sistematis. Teruslah berusaha dan jangan pernah berhenti belajar.
      </p> <br><br><br><br><br>
      <h3>Setiap hari, sedikit demi sedikit, mari kita tambahkan hafalan Al-Qur'an ke dalam hati kita.</h3>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/sidebarmahasiswa.vue';
  import Header from '../components/headermahasiswa.vue';
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
}
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
    background-color: var(--light)\\\; 
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
    flex-direction: column; 
}

.main {
    flex: 1; 
    padding: 2rem;

    @media (max-width: 1024px) {
        padding-left: 6rem;
    }
}

.welcome {
    margin-top: 90px;
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

.isiparagraf{
	margin-top: -150px;
	margin-left: 250px;
	margin-right: 100px;
}

@media (max-width: 1024px) {
    .main {
        padding-left: 6rem;
    }

    .Header-Beranda {
        width: calc(100% - 100px);
        padding: 5px 10px 10px 2px;
    }

    .beranda h3 {
        margin-right: 0;
    }

    .beranda span {
        margin-left: 0;
    }

    .welcome {
        margin-left: 0;
        width: 100%;
        padding: 0 1rem;
    }

    .desc {
        margin-left: 0;
        max-width: 100%;
        padding: 0 1rem;
    }

    .isiparagraf {
        margin-left: 0;
        margin-right: 0;
        padding: 0 1rem;
    }
}

@media (max-width: 768px) {
    .Header-Beranda {
        top: 60px;
        padding: 5px;
    }

    .welcome {
        margin-top: 100px;
    }

    .Selamatdatang {
        font-size: 1.5rem;
    }

    .isiparagraf {
        margin-top: -100px;
    }
}

@media (max-width: 480px) {
    .Header-Beranda {
        width: 100%;
        top: 50px;
    }

    .welcome {
        margin-top: 80px;
    }

    .isiparagraf {
        margin-top: -80px;
    }
}

</style>
