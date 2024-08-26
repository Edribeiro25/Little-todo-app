```vue
<template>
    <div id="List">
        <button class="toggle-button" @click="toggleSidebar">
            {{ sidebarVisible ? '<<<' : '>>>' }}
        </button>
        <div class="sidebar" :class="{ hidden: !sidebarVisible }">
            <button class="add-button" @click="showModal">Ajouter un élément</button>
            <ul>
                <li v-for="element in elements" :key="element.id" @click="handleClick(element)">
                    <span class="element-name">{{ element.title }}</span>
                    <button @click.stop="handleButtonClick(element)">X</button>
                </li>
            </ul>
        </div>
        <Modal v-if="isModalVisible" @close="hideModal">
            <form @submit.prevent="submitForm">
                <label for="name">Name:</label>
                <input type="text" v-model="newElementName" required />
                <button type="submit">Add Element</button>
            </form>
        </Modal>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';


import { defineEmits } from 'vue';

// Définir l'émission de l'événement
const emit = defineEmits();

function handleClick(element){
    console.log('Clicked element:', element);
    emit('value-emitted', 'wdwad');
};

export default {
    name: 'LeftComponent',

    setup() {
        const elements = ref([]);
        const sidebarVisible = ref(true);
        const isModalVisible = ref(false);
        const newElementName = ref('');

        const toggleSidebar = () => {
            sidebarVisible.value = !sidebarVisible.value;
        };

        

        const handleButtonClick = async (element) => {
            try {
                const response = await axios.delete('http://localhost:3000/api/deletelist', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Suppression réussie:', response.data);
            } catch (error) {
                console.error('Erreur de suppression:', error.message);
            }
            console.log('Clicked button for element:', element);
        };

        const submitForm = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/createlist', {
                    name: newElementName.value,
                    userId: 1 // Remplacez par l'ID utilisateur approprié
                });
                elements.value.push(response.data);
                newElementName.value = '';
                hideModal();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'élément:', error.message);
            }
        };

        const fetchElements = async () => {
            console.log('Fetching elements...');
            try {
                const response = await axios.get('http://localhost:3000/api/list/1'); // Remplacez par l'ID utilisateur approprié
                elements.value = response.data;
            } catch (error) {
                console.error('Erreur de récupération des éléments:', error.message);
            }
        };

        onMounted(() => {
            fetchElements();
        });

        return {
            elements,
            sidebarVisible,
            isModalVisible,
            newElementName,
            toggleSidebar,
            handleClick,
            handleButtonClick,
            submitForm
        };
    }
};
</script>

<style>
/* Ajoutez ces styles pour gérer le dépassement de texte */
.sidebar li span:hover {
    color: #0056b3;
}
.element-name {
    max-width: calc(100% - 60px); 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
}

#List {
    display: flex;
    position: relative;
    justify-content: center;
}

.toggle-button {
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: #20d70b;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    z-index: 1000;
}

.toggle-button:hover {
    background-color: #0056b3;
}

.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 15vw;
    height: 100vh;
    background-color: #f8f9fa;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    padding-top: 60px; /* Adjust padding to make space for the toggle button */
}

.sidebar.hidden {
    transform: translateX(-100%);
}

.add-button {
    display: block;
    margin: auto;
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
}

.add-button:hover {
    background-color: #218838;
}

.sidebar ul {
    list-style-type: none;
    justify-content: center;
    padding: 0;
    margin-top: 20px; /* Add margin to separate the list from the add button */
}

.sidebar li {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sidebar li button {
   background-color: crimson;
}

.sidebar li span {
    flex-grow: 1;
}

.sidebar button {
    background-color: #0066ff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 3px;
}

.sidebar button:hover {
    background-color: #0056b3;
}
</style>