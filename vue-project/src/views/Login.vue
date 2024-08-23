<template>
    <div>
        <h1>Connexion</h1>
        <form @submit="login">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login(event) {
            event.preventDefault();
            // Ajoutez ici la logique de connexion
            console.log('Connexion en cours...');
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
}
form {
    display: flex;
    
    flex-direction: column;
    align-items: center;
}
label {
    margin-bottom: 0.5rem;
}
input {
    padding: 0.5rem;
    margin-bottom: 1rem;
}
button {
    padding: 0.5rem 1rem;
}
</style>