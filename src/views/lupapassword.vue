<template>
    <div class="lupapassword-body">
      <div id="aa">
        <h1>Reset Password</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" placeholder="Username" required>
          </div>
  
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Password" required>
          </div>
  
          <div class="form-group">
            <label for="confirmPassword">Konfirmasi Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Konfirmasi Password" required>
          </div>
  
          <button type="submit" class="login-btn">Reset Password</button>
        </form>
  
        <button class="login-btn" @click="redirectToLogin">Kembali ke Login</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      login() {
        if (this.password !== this.confirmPassword) {
          alert('Password dan Konfirmasi Password tidak sesuai.');
          return;
        }
        alert('Password berhasil direset!');
      },
      redirectToLogin() {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  
  <style scoped>
  .lupapassword-body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #ffffff, #009345); /* Ubah background sesuai preferensi Anda */
  }
  
  #aa {
    width: 400px;
    padding: 30px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 28px;
    color: #009345; /* Ubah warna teks sesuai preferensi Anda */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
  }
  
  input[type="text"]:focus,
  input[type="password"]:focus {
    outline: none;
    border-color: #009345; /* Ubah warna border saat focus sesuai preferensi Anda */
  }
  
  .login-btn {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #009345; /* Ubah warna background button sesuai preferensi Anda */
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-btn:hover {
    background-color: #005a32; /* Ubah warna background saat hover sesuai preferensi Anda */
  }
  
  .login-btn:focus {
    outline: none;
  }
  
  .login-btn:active {
    transform: translateY(1px);
  }
  
  </style>