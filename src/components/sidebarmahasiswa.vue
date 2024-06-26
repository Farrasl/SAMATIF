<template>
	<div class="sidebar active">
		<div class="top"></div>
		<div class="logo"> 
			<h3>SAMATIF</h3>
			<i class="bx bx-menu" id="btn" @click="MenuSidebar"></i>
		</div>
		<div class="user">
    <img src="../assets/gambar1.png" alt="foto" class="user-img">
    <div>
        <p class="bold">{{ userData.nama }}</p>
        <p>{{ userData.nim }}</p>
        <p>Semester {{ userData.semester }}</p>
    </div>
</div>
		<ul>
			<li>
				<router-link to="/Beranda" class="button">
                    <i class="bx bxs-home"></i>
					<span class="nav-item">Beranda</span>
				</router-link>
				<span class="tooltip">Beranda</span>
			</li>
			<li>
				<router-link to="/Setoran" class="button">
                    <i class="bx bxs-book"></i>
                    <span class="nav-item">Setoran</span>
				</router-link>
				<span class="tooltip">Setoran</span>
			</li>			
			<li>
				<router-link to="/Riwayat" class="button">
                    <i class="bx bxs-check-square"></i>
                    <span class="nav-item">Riwayat</span>
				</router-link>
				<span class="tooltip">Riwayat</span>
			</li>
			<li class="logout">
				<router-link to="/" class="logout-button">
					<i class="bx bxs-log-out"></i>
					<span class="nav-item">Logout</span>
				</router-link>
				<span class="tooltip">Logout</span>
			</li>
		</ul>
	</div>

</template>

<script>
export default {
  data() {
    return {
      userData: {}  // Initialize userData
    };
  },
  mounted() {
    // Retrieve userData from localStorage or Vuex
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.userData = userData;
    }
  },
  methods: {
    MenuSidebar() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('active');
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
	margin-left: 3rem;
	color: var(--light);

}
.user-img {
    width: 50px;
    border-radius: 100%;
    border: 2px solid var(--primary-alt);
}

.sidebar {
    position: fixed; 
    top: 0;
    left: 0;
    height: 100vh;
    width: 80px;
    background-color: var(--dark);
    padding: 0.4rem 0.8rem;
    transition: width 0.5s ease; 
}

.sidebar.active {
	width: 225px;
}


.sidebar #btn {
	position: absolute;
	color: var(--light);
	top: .4rem;
	left: 50%;
	font-size: 2rem;
	line-height: 50px;
	transform: translateX(-50%);
	cursor: pointer;
}

.sidebar h3 {
	opacity: 0;
}

.sidebar.active h3 {
	opacity: 1;
}

.sidebar.active #btn {
	left: 90%;
}

.sidebar .top .logo {
	color: var(--light);
	display: flex;
	height: 50px;
	width: 100%;
	align-items: center;
	pointer-events: none;
	opacity: 0;
}

.sidebar.active .top .logo {
	opacity: 1;
}

.top .logo i {
	font-size: 2rem;
	margin-right: 5px;
}

.user {
	display: flex;
	align-items: center;
	margin: 1rem 0;
}

.user p {
	color: var(--light);
	opacity: 1;
	margin-left: 1rem;
}

.bold {
	font-weight: 600;
}

.sidebar p {
	opacity: 0;
}

.sidebar.active p {
	opacity: 1;
}

.sidebar ul li {
	position: relative;
	list-style-type: none;
	height: 50px;
	width: 90%;
	margin: 0.8rem auto;
	line-height: 50px;
}

.sidebar ul li a {
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	border-radius: 0.8rem;
}

.sidebar ul li a:hover {
	background-color: #fff;
	color: #12171e;
}

.sidebar ul li a i {
	min-width: 50px;
	text-align: center;
	height: 50px;
	border-radius: 12px;
	line-height: 50px;
	margin-left: -10px;
}

.sidebar .nav-item {
	opacity: 0;
}

.sidebar.active .nav-item {
	opacity: 1;
}

.sidebar ul li .tooltip {
	position: absolute;
	left: 125px;
	top: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.2);
	border-radius: .6rem;
	padding: .4rem 1.2rem;
	line-height: 1.8rem;
	z-index: 20;
	opacity: 0;
}

.sidebar ul li:hover .tooltip {
	opacity: 1;
} 

.sidebar.active ul li .tooltip {
	display: none;
}

.button {
	.material-icons {
		margin-right: 1rem;
	}
}

.logout {
	position: absolute;
	top: 350px;
	width: 100%; 
}


</style>


