<template>
    <div class="main-page">
        <div class="left">
            <Left @value-emitted="handleValueEmitted" />
        </div>
        <div class="center">
            <CenterPage :selectedList="selectedList" @task-selected="handleTaskSelected" />
        </div>
        <div class="right">
            <Right :selectedTask="selectedTask" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import Left from "@/components/Left.vue";
import CenterPage from "@/components/Center.vue";
import Right from "@/components/Right.vue";

export default {
    name: "MainPage",
    components: {
        Left,
        CenterPage,
        Right,
    },
    setup() {
        const handleValueEmitted = (value) => {
            console.log('Value emitted from Left:', value);
            // Handle the emitted value here
        };

        return {
            handleValueEmitted,
        };
    },
};
</script>

<style scoped>
.main-page {
    display: flex;
}

.left, .center, .right {
    flex: 1;
    padding: 10px;
}

.left {
    background-color: #f0f0f0;
}

.center {
    background-color: #ffffff;
}

.right {
    background-color: #f0f0f0;
}
</style>