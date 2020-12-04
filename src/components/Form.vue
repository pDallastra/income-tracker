<template>
<form @submit.prevent="FormHandler">
    <input type="text" placeholder="Type" v-model="formData.desc">
    <input type="number" placeholder="Amount" v-model="formData.value">
    <input type="date" placeholder="Date" v-model="formData.date">
    <input type="submit" placeholder="Submit">
</form>
</template>

<script>
import {
    reactive
} from 'vue'
export default {
    props: {
        state: Object
    },
    setup(props, {
        emit
    }) {
        const formData = reactive({
            desc: null,
            value: null,
            date: null
        });

        function FormHandler() {
            emit("add-income", {
                desc: formData.desc,
                value: formData.value,
                date: formData.date
            });

            formData.desc = null,
                formData.value = null,
                formData.date = null
        }

        return {
            FormHandler,
            formData
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

form input {
    display: block;
    border: none;
    outline: none;
    padding: 5px 15px;
    background-color: #fff;
    color: #888;
    font-size: 20px;
}

form input::placeholder {
    color: #AAA;
}

form input[type="submit"] {
    background: none;
    color: #fff;
    font-weight: 500;
    text-shadow: 0px 1px 3px #00000033;
    background-color: #ffce00;
    cursor: pointer;
}

form input:first-of-type {
    border-radius: 8px 0px 0px 8px;
}

form input:last-of-type {
    border-radius: 0px 8px 8px 0px;
}
</style>
