<template>
    <div class="main-page">
        <div class="left">
            <Left :lists="lists" @listSelected="handleListSelected" />
        </div>
        <div class="center">
            <Center :selectedList="selectedList" @taskSelected="handleTaskSelected" />
        </div>
        <div class="right">
            <Right :selectedTask="selectedTask" />
        </div>
    </div>
</template>

<script>
import Left from "@/components/Left.vue";
import Center from "@/components/Center.vue";
import Right from "@/components/Right.vue";

export default {
    name: "MainPage",
    components: {
        Left,
        Center,
        Right,
    },
    data() {
        return {
            lists: [], // Liste des tâches
            selectedList: null, // Liste sélectionnée
            selectedTask: null, // Tâche sélectionnée
        };
    },
    methods: {
        handleListSelected(list) {
            this.selectedList = list;
            this.selectedTask = null; // Réinitialiser la tâche sélectionnée
        },
        handleTaskSelected(task) {
            this.selectedTask = task;
        },
    },
};
</script>

<style scoped>
.main-page {
    display: flex;
    justify-content: space-between;
}

.left {
    flex: 1;
}

.center {
    flex: 2;
}

.right {
    flex: 1;
}
</style>