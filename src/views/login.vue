<template>
  <div class="login-container">
    <div class="login-image">
      <img src="../assets/uinsuska.png" alt="UIN Suska" class="logo">
      <h2>SAMATIF</h2>
      <p class="logo-text">SETORAN AYAT MAHASISWA TIF</p>
  
    </div>
    <div class="login-form">
      <h2>Silahkan Login</h2>
      <form @submit.prevent="login">
        <input type="text" placeholder="Username" v-model="username" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
      <a href="#" @click.prevent="forgotPassword">Lupa Password?</a>
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
      signIn: false
    };
  },
  methods: {
    async login() {
      try {
        const loginUrl = 'https://samatif.xyz//login.php?action=login';
        const response = await axios.post(loginUrl, {
          username: this.username,
          password: this.password
        }, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        console.log('Response:', response);
        const data = response.data;

        if (data.token) {
          localStorage.setItem('token', data.token);

          // Fetch user data using the token
          const userResponse = await axios.get('https://samatif.xyz//login.php?action=get', {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          });

          console.log(userResponse);
          const userData = userResponse.data;  // Save userData

          // Save userData to localStorage
          localStorage.setItem('userData', JSON.stringify(userData));

          // Redirect based on user role
          if (userData.role === 'mahasiswa') {
            this.$router.push({ name: 'berandamahasiswa' });
          } else if (userData.role === 'dosen') {
            this.$router.push({ name: 'berandadosen' });
          }
        } else {
          console.log('Login response does not contain a token:', data.message);
        }
      } catch (error) {
        console.error('Error during login request:', error);
        // Handle errors
      }
    },

    forgotPassword() {
      this.$router.push({ name: 'lupapassword' });
    }
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #7FD625, #009345);
}

/* Gaya untuk gambar dan teks logo */
.login-image {
  position:fixed;
  top: 30px;
  left: 0;
  text-align: center;
  width: 100%;
}

.login-image .logo {
  width: 100px; /* Sesuaikan ukuran logo untuk mobile */
  height: 100px;
  margin-right: 50px;
}

.logo-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px; /* Sesuaikan ukuran teks untuk mobile */
  color: #fff;
}

/* Gaya untuk formulir login */
.login-form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px; /* Sesuaikan lebar maksimum untuk mobile */
  width: 100%;
  margin-top: 60px;
}

.login-form h2 {
  margin-bottom: 20px;
  color: #009345;
  font-size: 24px; /* Sesuaikan ukuran untuk mobile */
}

.login-form input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  background-color: #009345;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.login-form button:hover {
  background-color: #007a2e;
}

.login-form a {
  color: #009345;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  font-size: 14px; /* Sesuaikan ukuran untuk mobile */
}

h2 {
  color: white;
  font-size: 24px; /* Sesuaikan ukuran untuk mobile */
  margin: 0;
}
</style>