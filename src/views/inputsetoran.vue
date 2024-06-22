<template>
  <div class="container">
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
        <div class="setoran-dosen">
          <h3><i class="bx bxs-book"></i>Setoran - Input Setoran</h3>
        </div>
      </div>
    </div>
    <div class="Mahasiswasetoran">
      <div>
        <span>Nama: {{ $route.params.name }}</span>
        <br>
        <span>NIM: {{ $route.params.nim }}</span>
      </div>
    </div>

    <div class="dropdown-container">
      <div class="row">
        <div class="dropdown">
          <label for="surah">Surah</label>
          <button class="dropbtn">{{ selectedSurah }}</button>
          <div class="dropdown-content">
            <a v-for="surah in surahList" :key="surah.id_surah" @click="selectSurah(surah)">
              {{ surah.name }}
            </a>
          </div>
        </div>

        <div style="display: none;">
          <input type="text" v-model="selectedSurahId" />
        </div>

        <div class="dropdown date-container">
          <label for="date">Tanggal</label>
          <input type="date" id="date" v-model="tanggal">
        </div>
      </div>

      <div class="row">
        <div class="dropdown">
          <label for="kelancaran">Kelancaran</label>
          <button class="dropbtn">{{ kelancaran }}</button>
          <div class="dropdown-content">
            <a @click="kelancaran = 'Sangat Baik'">Sangat Baik</a>
            <a @click="kelancaran = 'Baik'">Baik</a>
            <a @click="kelancaran = 'Cukup'">Cukup</a>
            <a @click="kelancaran = 'Kurang'">Kurang</a>
          </div>
        </div>

        <div class="dropdown">
          <label for="tajwid">Tajwid</label>
          <button class="dropbtn">{{ tajwid }}</button>
          <div class="dropdown-content">
            <a @click="tajwid = 'Sangat Baik'">Sangat Baik</a>
            <a @click="tajwid = 'Baik'">Baik</a>
            <a @click="tajwid = 'Cukup'">Cukup</a>
            <a @click="tajwid = 'Kurang'">Kurang</a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="dropdown2">
          <label for="makhrajul">Makhrajul Huruf</label>
          <button class="dropbtn2">{{ makhrajulHuruf }}</button>
          <div class="dropdown-content2">
            <a @click="makhrajulHuruf = 'Sangat Baik'">Sangat Baik</a>
            <a @click="makhrajulHuruf = 'Baik'">Baik</a>
            <a @click="makhrajulHuruf = 'Cukup'">Cukup</a>
            <a @click="makhrajulHuruf = 'Kurang'">Kurang</a>
          </div>
        </div>
      </div>

      <div class="Simpan">
        <button @click="simpanData">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Sidebar from '../components/sidebardosen.vue';
import Header from '../components/header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref(route.params.name);
const nim = ref(route.params.nim);

const surahList = ref([]);
const selectedSurah = ref('Pilih Surah');
const selectedSurahId = ref(null);
const tanggal = ref('');
const kelancaran = ref('Pilih Kelancaran');
const tajwid = ref('Pilih Tajwid');
const makhrajulHuruf = ref('Pilih Makhrajul Huruf');

onMounted(async () => {
  try {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get('https://samatif-ml.preview-domain.com/surah/get-all.php', config);
    surahList.value = response.data;
  } catch (error) {
    console.error('Error fetching surah data:', error);
    alert('Terjadi kesalahan saat mengambil data surah.');
  }

  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    const links = dropdown.querySelectorAll('.dropdown-content a');
    links.forEach(link => {
      link.addEventListener('click', function () {
        btn.innerText = link.innerText;
      });
    });
  });
});


const selectSurah = (surah) => {
  selectedSurah.value = surah.name;
  selectedSurahId.value = surah.id;
};

const simpanData = async () => {
  try {
    // Ambil nip dan token dari localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('token');
    if (!userData || !token) {
      console.error('User data or token not found in localStorage');
      return;
    }

    const { nip } = userData;

    const formData = new FormData();
    formData.append('nim', nim.value);
    formData.append('nip', nip);
    formData.append('id_surah', selectedSurahId.value);
    formData.append('tanggal', tanggal.value);
    formData.append('kelancaran', kelancaran.value);
    formData.append('tajwid', tajwid.value);
    formData.append('makhrajul_huruf', makhrajulHuruf.value);

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await axios.post('https://samatif-ml.preview-domain.com/setoran/insert.php', formData, config);

    if (response.data.status === 'success') {
      alert('Data setoran berhasil ditambahkan.');
    } else {
      alert('Gagal menambahkan data setoran: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Terjadi kesalahan saat menyimpan data.');
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

.Header-Setoran {
  background: #FFFFFF;
  position: absolute;
  top: 75px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 25px 10px 2px;
  box-sizing: border-box;
  width: calc(100% - 225px);
  border: 1px solid var(--dark);
}

.setoran-dosen {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setoran-dosen h3 {
  margin-left: -550px;
}

.Mahasiswasetoran {
  margin-top: 150px;
  margin-left: -700px;
  font-size: large;
}

.Mahasiswasetoran div {
  display: flex;
  flex-direction: column;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 50px 0 50px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.dropdown {
  position: relative;
  margin-left: 150px;
  margin-bottom: 30px;
}

.dropdown2 {
  position: relative;
  margin-left: 375px;
  margin-bottom: 30px;
}

label {
  font-size: 18px;
  display: block;
  margin-bottom: 8px;
}

.dropbtn {
  background-color: var(--primary-alt);
  color: var(--light);
  width: 300px;
  padding: 16px 24px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.dropbtn2 {
  background-color: var(--primary-alt);
  color: var(--light);
  width: 300px;
  padding: 16px 24px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}

.dropbtn2:hover, .dropbtn2:focus {
  background-color: #3e8e41;
}

input[type="date"] {
  padding: 8px;
  font-size: 16px;
  color: var(--light);
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  background-color: var(--primary-alt);
}

input[type="date"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content2 {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 16px 20px;
  text-decoration: none;
  display: block;
}

.dropdown-content2 a {
  color: black;
  padding: 16px 20px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

.dropdown-content2 a:hover {
  background-color: #f1f1f1;
}

.dropdown2:hover .dropdown-content2 {
  display: block;
}

.dropdown2:hover .dropbtn2 {
  background-color: #3e8e41;
}

.Simpan {
  margin-left: 75px;
  margin-top: 50px;
  text-align: center;
  width: 100%;
}

.Simpan button {
  background-color: var(--primary-alt);
  color: var(--light);
  width: 300px;
  padding: 16px 24px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}
</style>
