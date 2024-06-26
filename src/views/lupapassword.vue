<template>
  <div class="lupapassword-body">
    <div id="aa">
      <h1>Reset Password</h1>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" placeholder="Username" required>
        </div>

        <div class="form-group">
          <label for="password">Password Baru:</label>
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
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Password dan Konfirmasi Password tidak sesuai.');
        return;
      }

      axios.post('https://samatif.xyz/lupapassword.php', {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
      .then(response => {
        alert(response.data.message); // Tampilkan pesan dari backend
      })
      .catch(error => {
        alert('Gagal mereset password.'); // Tampilkan pesan kesalahan jika gagal
        console.error(error); // Cetak error ke konsol untuk debugging
      });
    },
    redirectToLogin() {
      this.$router.push({ name: 'Login' }); // Redirect ke halaman login
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
  
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

.form-group {
  margin-bottom: 15px;
}

.reset-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
  </style>