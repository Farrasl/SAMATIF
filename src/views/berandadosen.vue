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
	<div>
            <div class="Beranda-item1"> 
				<i class='bx bxs-message-dots'></i>
				<span>04 April 2024</span>
            </div>
            <div class="Beranda-item2">
				<span>05 April 2024</span>
				<i class='bx bxs-message-dots'></i>
             </div>
            <div class="Beranda-item3">
				<i class='bx bxs-message-dots'></i>
				<span>06 April 2024</span>
            </div>
        </div>  
    </div>
		
</template>

<script>
import Sidebar from '../components/sidebardosen.vue';
import Header from '../components/header.vue';

export default {
    components: {
        Sidebar,
        Header
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