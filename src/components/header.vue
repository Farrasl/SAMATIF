<template>
    <div class="Header" :style="{ width: headerWidth, transition: 'width 0.5s' }">
      <div class="user-header">
        <p>Thn. Akademik 2023/2024 Genap</p>
        <img src="../assets/gambar1.jpg" alt="foto" class="user-img">
        <div class="dropdownheader" @click="toggleDropdown">
          <button><i class='bx bxs-down-arrow'></i></button>
          <div class="dropdownheader-content" v-if="isDropdownOpen">
            <a href="#"><i class='bx bxs-user'></i> Ubah Password</a>
            <a href="#"><i class='bx bxs-log-out'></i> Logout</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarActive: false,
        sidebarWidth: '225px',
        headerWidth: 'calc(100% - 225px)',
        isDropdownOpen: false 
      };
    },
    mounted() {
      const btn = document.querySelector('#btn');
      btn.addEventListener('click', this.toggleSidebar);
    },
    methods: {
      toggleSidebar() {
        this.sidebarActive = !this.sidebarActive;
        this.updateHeaderWidth();
      },
      updateHeaderWidth() {
        this.headerWidth = this.sidebarActive ? 'calc(100% - 80px)' : 'calc(100% - 225px)';
      },
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen; 
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
  padding: 5px; 
}

.dropdownheader-content{
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px; 
  box-shadow: 0px 8px 16px 0px rgba(2,5,5,5.2);
  z-index: 1;
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

.dropdownheader:hover .dropdownheader-content{
  display: block;
}

.dropdownheader:hover .dropbtn{
  background-color: #3e8e41;
}

</style>
