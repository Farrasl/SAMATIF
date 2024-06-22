  <template>
    <article>
      <div class="containerlogin" :class="{'sign-in-active' : signIn}">
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-right">
              <img src="../assets/uinsuska.png" alt="UIN Suska" class="logo">
              <h2>Selamat Datang Silahkan Login</h2>
            </div>
          </div>
        </div>
        <div id="a">
          <form class="sign-in" @submit.prevent="login">
            <h2>Login</h2>
            <div>Masukkan Akun Anda</div>
            <input type="text" placeholder="Username" v-model="username" required />
            <input type="password" placeholder="Password" v-model="password" required />
            <div>
              <a class="lupa" href="#" @click.prevent="forgotPassword">Lupa Password?</a>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </article>
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
      const loginUrl = 'https://samatif-ml.preview-domain.com/login.php?action=login';
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
        const userResponse = await axios.get('https://samatif-ml.preview-domain.com/login.php?action=get', {
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

  <style lang="scss" scoped>
    .containerlogin {

      position: relative;
      margin: 125px auto;
      width: 768px;
      height: 480px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                  0 10px 10px rgba(0, 0, 0, .2);
      background: linear-gradient(to bottom, #efefef, #ccc);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
  
      .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .5s ease-in-out;
        z-index: 100;
      }
  
      .overlay {
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        background: linear-gradient(to bottom right, #7FD625, #009345);
        color: #fff;
        transform: translateX(0);
        transition: transform .5s ease-in-out;
      }
      .logo{
        width: 200px ;
        height: 200px;
        margin-right: 50px;
      }
  
      @mixin overlays($property) {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 70px 70px;
        width: 50%;
        height: 100%;
        text-align: center;
        transform: translateX($property);
        transition: transform .5s ease-in-out;
      }
  
      .overlay-left {
        @include overlays(-20%);
      }
  
      .overlay-right {
        @include overlays(0);
        right: 0;
      }
    }
  
    h2 {
     margin-left: 0px;
    }
  
    p {
      margin-left: 100px 50px;
      align-content: center;
      top:100px
    }
  
    a {
      color: #009345;
      text-decoration: none;
      margin: 15px 0;
      font-size: 1rem;
    }
  
    button {
      border-radius: 20px;
      border: 1px solid #009345;
      background-color: #009345;
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 40px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-in;
  
      &:active {
        transform: scale(.9);
      }
  
      &:focus {
        outline: none;
      }
    }
  
    button.invert {
      background-color: transparent;
      border-color: #fff;
    }
  
    form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px 60px;
    width: 50%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;
  
      div {
        font-size: 1rem;
      }
  
      input {
      background-color: #eee;
      border: none;
      padding: 8px 15px;
      margin: 6px 0;
      width: calc(100% - 30px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                        0 -1px 1px #fff, 
                        0 1px 0 #fff;
      overflow: hidden;

      &:focus {
        outline: none;
        background-color: #fff;
      }
    }
  }
  
    .sign-in {
      left: 0;
      z-index: 0;
      
    }

    .forgot-password {
      margin-top: 10px;
      text-align: center;
    }
  
    .sign-in-active {
      .sign-in {
        transform: translateX(-100%);
      }

  
      .overlay-container {
        transform: translateX(-100%);
      }
  
      .overlay {
        transform: translateX(50%);
      }
  
      .overlay-left {
        transform: translateX(0);
      }
  
      .overlay-right {
        transform: translateX(0);
      }
    }
  
    @keyframes show {
      0% {
        opacity: 0;
        z-index: 1;
      }
      49% {
        opacity: 0;
        z-index: 1;
      }
      50% {
        opacity: 1;
        z-index: 5;
      }
    }
  </style>