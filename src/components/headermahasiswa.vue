<template>
  <div class="Header" :style="{ width: headerWidth, transition: 'width 0.5s' }">
    <div class="user-header">
      <div class="left-content">
        <span>PA. {{ namaDosen }}</span>
      </div>
      <p>Thn. Akademik 2023/2024 Genap</p>
      <img src="../assets/gambar1.png" alt="foto" class="user-img">
      <div class="dropdownheader" @click="toggleDropdown">
        <button><i class='bx bxs-down-arrow'></i></button>
        <div class="dropdownheader-content" v-if="isDropdownOpen" @click.stop>
          <a href="#" @click.prevent="navigateTo('lupapassword')"><i class='bx bxs-user'></i> Ubah Password</a>
          <a href="#" @click.prevent="navigateTo('Login')"><i class='bx bxs-log-out'></i> Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nama: '',
      namaDosen: '',
      sidebarActive: false,
      sidebarWidth: '225px',
      headerWidth: 'calc(100% - 225px)',
      isDropdownOpen: false
    };
  },
  mounted() {
    this.getNamaUser(); // Panggil fungsi untuk mengambil nama pengguna saat komponen dimuat
    this.getNamaDosen(); // Panggil fungsi untuk mengambil nama dosen saat komponen dimuat
    const btn = document.querySelector('#btn');
    btn.addEventListener('click', this.toggleSidebar);
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
          // Ambil token dari localStorage
          const token = localStorage.getItem('token');
          // Panggil endpoint dengan NIM yang diambil dari localStorage dan sertakan header otorisasi
          const response = await axios.get(`https://samatif.xyz/dosenpa/by-nim.php?nim=${nim}`, {
            headers: {
              Authorization: `Bearer ${token}` // Sertakan token dalam header otorisasi
            }
          });
          if (response.data.status === 'success') {
            this.namaDosen = response.data.mahasiswa[0]['Nama Dosen PA']; // Tetapkan nama dosen PA ke variabel data
          } else {
            console.error('Gagal mengambil data dosen:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching dosen data:', error);
      }
    },
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
      this.updateHeaderWidth();
    },
    updateHeaderWidth() {
      this.headerWidth = this.sidebarActive ? 'calc(100% - 80px)' : 'calc(100% - 225px)';
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    navigateTo(routeName) {
      this.isDropdownOpen = false; // Close dropdown on navigation
      this.$router.push({ name: routeName });
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
  --sidebar-width: 225px;
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

.Header {
  background: #FFFFFF;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 25px 10px 2px;
  box-sizing: border-box;
  width: calc(100% - 225px);
  border: 1px solid var(--dark);
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.left-content {
  display: flex;
  align-items: center;
}

.user-header p {
  color: var(--dark);
  opacity: 1;
}

.user-img {
  width: 50px;
  border-radius: 100%;
  border: 2px solid var(--primary-alt);
}

.dropdownheader {
  position: relative;
}

.dropdownheader button {
  font-size: 24px;
  padding: 5px;
}

.dropdownheader-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
  transition: transform 0.3s ease;
}

.dropdownheader:hover .dropdownheader-content {
  display: block;
}

.dropdownheader-content a {
  color: black;
  padding: 16px 20px;
  text-decoration: none;
  display: block;
}

.dropdownheader-content a:hover {
  background-color: #f1f1f1;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .Header {
    width: calc(100% - 80px);
  }
}

@media (max-width: 768px) {
  .Header {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
  }

  .user-header {
    flex-direction: column;
    align-items: center;
  }

  .left-content {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .user-header p {
    margin: 5px 0;
  }

  .dropdownheader-content {
    left: 0;
    right: auto;
  }
}

@media (max-width: 480px) {
  .user-header {
    flex-direction: column;
  }

  .user-header p {
    font-size: small;
  }

  .user-img {
    width: 40px;
  }

  .dropdownheader-content a {
    padding: 10px 15px;
    font-size: small;
  }
}
</style>
