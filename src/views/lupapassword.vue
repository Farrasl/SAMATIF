<template>
    <div id="aa">
        <h1>Reset Password</h1>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" placeholder="Username Anda" required>
            </div>
            <button type="submit" class="login-btn" @click="Linkreset">Kirim Reset Link Ke Email</button>
            <button type="button" class="login-btn" @click="redirectToLogin">Kembali Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    methods: {
        login() {
        },
        Linkreset() {
            alert('Terimakasih, Link reset akan kami kirim melalui email!');
        },
        redirectToLogin() {
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>

<style>

#aa {
    width: 500px;
    padding: 20px;
    border-radius: 5px;
    background-color: #3A8980;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin: 0 auto; 
    margin-top: 250px; 
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