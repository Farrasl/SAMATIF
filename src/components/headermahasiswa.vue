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
}

.left-content {
  display: flex;
  align-items: center;
  margin-right: 700px; /* Adjust as needed */
}

.user-header p {
  color: var(--dark);
  opacity: 1;
  margin-right: 1rem;
  
}


.user-img {
  width: 50px;
  border-radius: 100%;
  border: 2px solid var(--primary-alt);
}

.dropdownheader button {
  font-size: 24px; 
  padding: 3px; 
}

.dropdownheader-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px; 
  box-shadow: 0px 8px 16px 0px rgba(2,5,5,5.2);
  z-index: 1;
  transition: transform 0.3s ease; /* Transition for dropdown animation */
  transform-origin: top right; /* Set transform origin to top right */
  right: 0; /* Position dropdown to the right */
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

.dropdownheader:hover .dropdownheader-content {
  display: block;
  transform: translateX(calc(-100% + 48px)); /* Slide to the left */
}

@media (max-width: 400px) {
    .user-header {
      display: none;
  }
}
  @media (max-width: 768px) {
    .user-img{
      margin-right: 20px;
      padding: 0;
  }
 .user-header span {
  margin-left: -50px;
 }
 .user-header p{
  margin-left: -690px;
 }
 .user-header button{
  margin-left: -20px;
 }
  .user-header {
  display: flex;
  width: 10px;
  align-items: center;
  padding: 1px;
  
}

    .dropdownheader{
      width: 50px;
     
    }
}

</style>
