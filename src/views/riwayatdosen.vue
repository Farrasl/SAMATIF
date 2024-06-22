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
      <div class="Isi-Riwayat">
        <div class="Header-Riwayat">
          <div class="riwayat-dosen">
            <h3><i class="bx bxs-check-square"></i>Riwayat</h3>
          </div>
        </div>
      </div>
      <div class="recycler-view-container">
        <div>
        <h2>Mahasiswa</h2>
        <div class="dropdownsemester">
        <button><i class="bx bx-menu"></i></button>
        <div class="dropdownsemester-content">
            <a href="#">Semester 1</a>
            <a href="#">Semester 2</a>
            <a href="#">Semester 3</a>
            <a href="#">Semester 4</a>
            <a href="#">Semester 5</a>
            <a href="#">Semester 6</a>
            <a href="#">Semester 7</a>
            <a href="#">Semester 8</a>
        </div>
        </div>
		</div>	
    <div class="recycler-view">
        <div class="list-item" v-for="item in items" :key="item.id" @click="handleItemClick(item)">
          <div class="list-item-content">
            <img :src="item.image" alt="Foto Mahasiswa" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <div class="item-info">
              <p>Nama: {{ item.name }}</p>
              <p>NIM: {{ item.nim }}</p>
              <p>Semester: {{ item.semester }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/sidebardosen.vue';
import Header from '../components/header.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const items = ref([]);
const router = useRouter();

const fetchData = async () => {
  try {
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      console.error('User data or token not found in localStorage');
      return;
    }

    const nip = userData.nip;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.get(`/api/dosenpa/by-nip.php?nip=${nip}`, config);

    // Pastikan respons memiliki properti dosen
    if (!response.data.dosen || response.data.dosen.length === 0) {
      console.error('Data dosen tidak ditemukan atau respons tidak sesuai:', response.data);
      return;
    }

    const dosen = response.data.dosen[0];
    items.value = dosen.Mahasiswa.map(item => ({
      id: item.NIM,
      name: item.Nama,
      nim: item.NIM,
      semester: item.Semester,
      image: 'src/assets/gambar1.png'
    }));
  } catch (error) {
    console.error('Error fetching data', error);
  }
};


const handleItemClick = (item) => {
  router.push({ name: 'riwayatmahasiswadosen', params: { id: item.id, name: item.name, nim: item.nim } });
};


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

.riwayat-dosen {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.riwayat-dosen h3 {
    margin-left: -550px; 
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recycler-view-container {
  margin-top: 150px; 
  margin-left: 200px;
  width: 1100px;
}

.recycler-view {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.list-item-content {
  display: flex;
  align-items: center;
}

.item-info {
  margin-left: 10px;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.list-item:hover {
  background-color: var(--primary);
}
</style>