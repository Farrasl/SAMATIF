<template>
    <div class="Header" :style="{ width: headerWidth, transition: 'width 0.5s' }">
      <div class="user-header">
        <p>Thn. Akademik 2023/2024 Genap</p>
        <img src="../assets/gambar1.png" alt="foto" class="user-img">
        <div class="dropdownhederdosen" @click="toggleDropdown">
          <button><i class='bx bxs-down-arrow'></i></button>
          <div class="dropdownhederdosen-content" v-if="isDropdownOpen">
            <a href="#" @click.prevent="navigateTo('lupapassword')"><i class='bx bxs-user'></i> Ubah Password</a>
            <a href="#" @click.prevent="navigateTo('Login')"><i class='bx bxs-log-out'></i> Logout</a>
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
      },
      navigateTo(routeName) {
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
  
  
  
  .dropdownhederdosen button {
    font-size: 24px; 
    padding: 5px; 
  }
  
  .dropdownhederdosen-content{
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 140px; 
    box-shadow: 0px 8px 16px 0px rgba(2,5,5,5.2);
    z-index: 1;
  }
  
  .dropdownhederdosen-content a {
    color: black;
    padding: 16px 20px;
    text-decoration: none;
    display: block;
  }
  
  .dropdownhederdosen-content a:hover {
    background-color: #f1f1f1;
  }
  
  .dropdownhederdosen:hover .dropdownhederdosen-content{
    display: block;
  }
  
  .dropdownhederdosen:hover .dropbtn{
    background-color: #3e8e41;
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
  margin-left: -150px;
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
}

@media (max-width: 400px) {
    .user-header {
      display: none;
  }
}

  </style>