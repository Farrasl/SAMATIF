<template>
    <body class="login-body">
        <div class="Selamat">
        <h1>Selamat Datang Di SAMATIF</h1>
        <span>Setoran Ayat Mahasiswa TIF</span>
    </div>
    <div id="a">
        <h1>Silahkan Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" placeholder="Username Anda" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" placeholder="Password Anda" required>
            </div>
            <div >
                <a   class="lupa"    href="#" @click="forgotPassword">Lupa Password?</a>
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
    </div>
</body>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loggedInUser: null, 
            users: [
                { username: 'mahasiswa1', password: '123', role: 'mahasiswa'},
                { username: 'dosen1', password: 'qwe', role: 'dosen'}
            ]
        }
    },
    methods: {
        login() {
            const user = this.users.find(u => u.username === this.username && u.password === this.password);
            if (user) {
                this.loggedInUser = user; 
                if (user.role === 'mahasiswa') {
                    this.$router.push({ name: 'berandamahasiswa' });
                } else if (user.role === 'dosen') {
                    this.$router.push({ name: 'berandadosen' });
                }
            } else {
                alert('Login gagal. Username atau password salah.');
            }
        },
        forgotPassword() {
            this.$router.push({ name: 'lupapassword' });
        }
    }
}
</script>

<style>

.login-body{
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url('../assets/bg-login.jpg');
}
.Selamat {
    text-align: center; 
    vertical-align: top; 
    color:#fff;
}

#a {
    width: 500px;
    padding: 20px;
    border-radius: 5px;
    background-color: transparent;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border:2px rgb solid (255, 255,255, .2);
    margin: 0 auto; 
    margin-bottom: 150px;
    justify-content: center;
    align-items: center;
    display: absolute;
    backdrop-filter: blur(20px);
    color:#fff;
}

.lupa{
color:#fff
}

h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
}
.form-group {
    margin-bottom: 20px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.login-btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
.login-btn:hover {
    background-color: #0056b3;
}
.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
}
.forgot-password {
    margin-top: 10px;
    text-align: center;
}
</style>