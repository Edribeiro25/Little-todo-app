<template>
    <div class="left">
        <h1>LEFT</h1>
    </div>
</template>

<script>
export default {
    name: 'Left',
    data() {
        return {
            elements: [
                { id: 1, name: 'Element 1' },
                { id: 2, name: 'Element 2' },
                { id: 3, name: 'Element 3' }
            ]
        };
    },
    methods: {
        handleClick(element) {
            // Handle click event for the element
            console.log('Clicked element:', element);
        },
        handleButtonClick(element) {
            // Handle button click event for the element
            console.log('Clicked button for element:', element);
        }
    }
}
</script>

<style scoped>
.left {
    /* Your component's styles here */
    float: right;
}
</style>