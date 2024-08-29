<template>
    <div class="form-wrapper">
        <div class="form-container">
            <div class="toggle-buttons">
                <button :class="{ active: isLoginForm }" @click="setForm(true)">Se connecter</button>
                <button :class="{ active: !isLoginForm }" @click="setForm(false)">S'inscrire</button>
            </div>
            
            <form v-if="isLoginForm" @submit="login">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" v-model="loginData.email" required>
                <label for="login-password">Mot de passe:</label>
                <input type="password" id="login-password" v-model="loginData.password" required>
                <button type="submit" :disabled="isLoading">Se connecter</button>
            </form>
            
            <form v-else @submit="register">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" v-model="registerData.email" required>
                <label for="register-password">Mot de passe:</label>
                <input type="password" id="register-password" v-model="registerData.password" required>
                <label for="register-surname">Prénom:</label>
                <input type="text" id="register-surname" v-model="registerData.surname" required>
                <label for="register-name">Nom:</label>
                <input type="text" id="register-name" v-model="registerData.name" required>
                <button type="submit" :disabled="isLoading">S'inscrire</button>
            </form>
            
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        return { router };
    },
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            },
            registerData: {
                email: '',
                password: '',
                surname: '',
                name: ''
            },
            errorMessage: '',
            isLoading: false,
            isLoginForm: true
        };
    },
    methods: {
        async login(event) {
            event.preventDefault();
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    email: this.loginData.email,
                    password: this.loginData.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$cookies.set('access_token', response.data.token , { expires: '7d' });
                this.router.push("/home");
            } catch (error) {
                console.error('Erreur de connexion:', error.message);
                this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos informations.';
            } finally {
                this.isLoading = false;
            }
        },
        async register(event) {
            event.preventDefault();
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:3000/api/register', {
                    email: this.registerData.email,
                    password: this.registerData.password,
                    surname: this.registerData.surname,
                    name: this.registerData.name
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.$cookies.set('access_token', response.data.token , { expires: '7d' });
                this.router.push("/home");
            } catch (error) {
                console.error('Erreur d\'inscription:', error.message);
                this.errorMessage = 'Échec de l\'inscription. Veuillez vérifier vos informations.';
            } finally {
                this.isLoading = false;
            }
        },
        setForm(isLogin) {
            this.isLoginForm = isLogin;
            this.errorMessage = '';
        }
    }
};
</script>

<style>
.form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
}

.toggle-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
}

.toggle-buttons button {
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.toggle-buttons button.active {
    background-color: #007bff;
    color: white;
}

form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

label, input, button {
    margin-bottom: 10px;
}

button {
    align-self: center;
}

.error {
    color: red;
}
</style>