<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />
		<!-- Header -->
		<Header />
		<!-- Content -->
		<router-view />
	</div>
	<div class="Biodata-content">
            <div class="Biodata-item"> 
                <h2>Informasi Pribadi </h2>
                <ul>
                    <li><strong>Nama:</strong> Farras Lathief</li>
                    <li><strong>Usia:</strong> 19 tahun</li>
                    <li><strong>Alamat:</strong> Jl Swakarya gg Emas no 13 </li>
                    <li><strong>Email:</strong> farraslathief@gmail.com</li>
                    <li><strong>Telepon:</strong> 081267572201</li>
                </ul>            
            </div>
            <div class="Biodata-item">
                <h2>Pendidikan</h2>
                <ul>
                    <li><strong>SMA</strong>, SMA IT Imam Syafii 2 Pekanbaru, 2019 - 2022</li>
                    <li><strong>Teknik Informatika</strong>, UIN Sultan Syarif Kasim Riau, 2022 - sekarang</li>
                </ul>           
             </div>
            <div class="Biodata-item">
                <h2>Hobi</h2>
                <ul>
                    <li><strong>Ngoding</strong> </li>
                    <li><strong>Olahraga</strong> </li>
                    <li><strong>Main Game</strong></li>
                </ul>
            </div>
        </div>  
		
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
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
.Biodata-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px; 
    padding: 15px; 
}

.Biodata-item {
    border: 2px solid #fff; 
    padding: 20px; 
    color: #fff; 
    text-align: center; 
    border: 5px solid #00abf0; 
    padding: 20px; 
}

.Biodata-item ul {
  padding-left: 0; 
}

.Biodata-item ul li {
  text-align: left; 
  margin-top: 10px;
}
</style>