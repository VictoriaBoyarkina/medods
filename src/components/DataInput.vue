<template>
    <div class="form-group-item">
        <input
        onfocus="(this.type='date')"
        onblur="(this.type='text')"
        :placeholder="[[ placeholder ]]"
        v-bind="$attrs"
        :v-model="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ invalid: error }">
        <div class="invalid-tooltip" v-if="error">{{ errorMessage }}</div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
    label: {
        type: String,
        default: "",
    },
    modelValue: {
        type: String,
        default: "",
    },
    error: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    }  
});
</script>
