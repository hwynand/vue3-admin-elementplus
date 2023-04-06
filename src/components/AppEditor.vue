<script setup lang="ts">
import { defineEmits } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const emit = defineEmits(['update:modelValue'])
const tinymceToken = import.meta.env.VITE_TINYMCE_API_TOKEN || 'tinymce-token'

const initOptions = {
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar:
    'undo redo | formatselect | table | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
}
function handleContentChange(e: string) {
  emit("update:modelValue", e)
} 
</script>

<template>
  <editor :init="initOptions" :api-key="tinymceToken" @update:modelValue="handleContentChange" />
</template>