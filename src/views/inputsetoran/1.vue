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
    </div>
    <div class="Mahasiswa">
  <div>
    <span>Nama: Farras Lathief</span>
    <br>
    <span>Nim: 12250111328</span>
  </div>
</div>
<div class="dropdown">
    <div class="dropdown1">
      <label for="surah">Surah</label>
        <button class="dropbtn">Surah</button>
        <div class="dropdown1-content">
            <a href="#">An-Naba’</a>
            <a href="#">AN-Naazi’at</a>
            <a href="#">‘Abasa</a>
            <a href="#">At-Takwir</a>
            <a href="#">Al-Infithar</a>
            <a href="#">Al-Muthaffifin</a>
            <a href="#">Al-Insyiqaaq</a>
            <a href="#">Al-Buruj</a>
            <a href="#">Ath-Thaariq</a>
            <a href="#">Al-A’la</a>
            <a href="#">Al-Ghaasyiyah</a>
            <a href="#">Al-Fajr</a>
            <a href="#">Al-Balad</a>
            <a href="#">Asy-Syams </a>
            <a href="#">Al-Lail</a>
            <a href="#">Adh-Dhuha</a>
            <a href="#">Al-Insyirah</a>
            <a href="#">At-Tiin</a>
            <a href="#">Al-‘Alaq</a>
            <a href="#">Al-Qadr</a>
            <a href="#">Al-Bayyinah</a>
            <a href="#">Az-Zalzalah</a>
            <a href="#">Al-‘Aadiyaat</a>
            <a href="#">Al-Qaari’ah</a>
            <a href="#">At-Takaatsur</a>
            <a href="#">Al-‘Ashr</a>
            <a href="#">Al-Humazah</a>
            <a href="#">Al-Fiil</a>
            <a href="#">Quraisy</a>
            <a href="#">Al-Maa’un</a>
            <a href="#">Al-Kautsar</a>
            <a href="#">Al-Kaafirun</a>
            <a href="#">An-Nashr</a>
            <a href="#">Al-Lahab</a>
            <a href="#">Al-Ikhlash</a>
            <a href="#">Al-Falaq</a>
            <a href="#">An-Naas</a>
        </div>
    </div>

    <div class="date-container">
        <label for="date">Tanggal</label>
        <input type="date" id="date" name="date">
    </div>
    <div class="dropdown3">
      <label for="Kelancaran">Kelancaran</label>
        <button class="dropbtn">Kelancaran</button>
        <div class="dropdown3-content">
            <a href="#">Sangat Baik</a>
            <a href="#">Baik</a>
            <a href="#">Cukup</a>
            <a href="#">Kurang</a>
          </div>
    </div>
    <div class="dropdown4">
      <label for="tajwid">Tajwid</label>
        <button class="dropbtn">Tajwid</button>
        <div class="dropdown4-content">
          <a href="#">Sangat Baik</a>
            <a href="#">Baik</a>
            <a href="#">Cukup</a>
            <a href="#">Kurang</a>
        </div>
    </div>
    <div class="dropdown5">
      <label for="makhrajul">Makhrajul Huruf</label>
        <button class="dropbtn">Makhrajul Huruf</button>
        <div class="dropdown5-content">
          <a href="#">Sangat Baik</a>
            <a href="#">Baik</a>
            <a href="#">Cukup</a>
            <a href="#">Kurang</a>
        </div>
    </div>
    <div class="Simpan">
      <button @click="simpanData">Simpan</button>
    </div>
    </div>
  </template>
  
  
  <script setup>
  import Sidebar from '../../components/sidebardosen.vue';
  import Header from '../../components/header.vue';  
  import { onMounted } from 'vue';
  
  onMounted(() => {
    const dropdowns = document.querySelectorAll('.dropdown1, .dropdown3, .dropdown4, .dropdown5');
  
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector('.dropbtn');
      const links = dropdown.querySelectorAll('.dropdown1-content a, .dropdown3-content a, .dropdown4-content a, .dropdown5-content a');
  
      links.forEach(link => {
        link.addEventListener('click', function() {
          btn.innerText = link.innerText;
        });
      });
    });
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

.Header-Setoran {
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

.setoran-dosen {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.setoran-dosen h3 {
    margin-left: -550px; 
}

.Mahasiswa {
  margin-top: 150px;
  margin-left: 250px;
  font-size: large;
}

.Mahasiswa div {
  display: flex;
  flex-direction: column;
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

.dropbtn:hover, .dropbtn:focus {
  background-color: #3e8e41;
}

.dropdown {
  margin-top: -30px;
}
.dropdown1 {
  margin-top: 50px;
  margin-left: 400px;  
  position: relative;
  display: inline-block;
}

.date-container {
  margin-top: 50px; 
  margin-left: 200px; 
  position: relative;
  display: inline-block;
}

label {
  font-size: 18px;
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

.dropdown3 {
  margin-top: 30px;
  margin-left: 400px;
  display: inline-block;
}

.dropdown4 {
  margin-top: 30px;
  margin-left: 200px;
  display: inline-block;
}

.dropdown5 {
  margin-top: 30px;
  margin-left: 650px;
  display: inline-block;
}

.dropdown1-content,
.dropdown3-content,
.dropdown4-content,
.dropdown5-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 340px;
  max-height: 200px; 
  overflow-y: auto; 
  box-shadow: 0px 8px 16px 0px rgba(2, 5, 5, 5.2);
  z-index: 1;
}


.dropdown1-content a, .dropdown2-content a, .dropdown3-content a, .dropdown4-content a, .dropdown5-content a {
  color: black;
  padding: 16px 20px;
  text-decoration: none;
  display: block;
}

.dropdown1-content a:hover, .dropdown2-content a:hover, .dropdown3-content a:hover, 
.dropdown4-content a:hover, .dropdown5-content a:hover {
  background-color: #f1f1f1;
}

.dropdown1:hover .dropdown1-content, .dropdown2:hover .dropdown2-content, .dropdown3:hover .dropdown3-content, 
.dropdown4:hover .dropdown4-content, .dropdown5:hover .dropdown5-content {
  display: block;
}

.dropdown1:hover .dropbtn, .dropdown2:hover .dropbtn, .dropdown3:hover .dropbtn, .dropdown4:hover .dropbtn,
.dropdown5:hover .dropbtn {
  background-color: #3e8e41;
}

.Simpan {
  margin-top: 50px;
  margin-left: 650px;  
  position: relative;
  display: inline-block;
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