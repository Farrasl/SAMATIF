import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue'
import lupapassword from '../views/lupapassword.vue'
import berandamahasiswa from '../views/berandamahasiswa.vue'
import setoranmahasiswa from '../views/setoranmahasiswa.vue'
import riwayatmahasiswa from '../views/riwayatmahasiswa.vue'
import berandadosen from '../views/berandadosen.vue'
import setorandosen from '../views/setorandosen.vue'
import riwayatdosen from '../views/riwayatdosen.vue'
import inputsetoran from '../views/inputsetoran/1.vue'
import riwayatmahasiswadosen from '../views/riwayatmahasiswadosen/a.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: login
        },
        {
            path: '/LupaPassword',
            name: 'lupapassword',
            component: lupapassword
        },
        {
            path: '/Beranda',
            name: 'berandamahasiswa',
            component: berandamahasiswa
        },
        {
            path: '/Setoran',
            name: 'Setoran',
            component: setoranmahasiswa
        },
        {
            path: '/Riwayat',
            name: 'Riwayat',
            component: riwayatmahasiswa
        },  
        {
            path: '/BerandaDosen',
            name: 'berandadosen',
            component: berandadosen
        },  
        {
            path: '/SetoranDosen',
            name: 'setorandosen',
            component: setorandosen
        },  
        {
            path: '/RiwayatDosen', 
            name: 'riwayatdosen', 
            component: riwayatdosen
        },  
		{
            path: '/InputSetoran/1', 
            name: 'inputsetoran/1', 
            component: inputsetoran
        },    
		{
            path: '/RiwayatMahasiswa/a', 
            name: 'riwayatmahasiswadosen/a', 
            component: riwayatmahasiswadosen
        }            
    ],
})
