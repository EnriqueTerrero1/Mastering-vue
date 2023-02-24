<template>
    <div>
      <label v-if="label">{{ label }}</label>
      <select :value="option" @input="updateValue" v-bind="$attrs" v-on="$listeners">
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.id"
          :selected="option === value"
        >{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    inheritAttrs: false,
 
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        // type:Number,
        required:true
      },
      option:String,
      label: String
    },
    methods: {
      updateValue(event) {
   
        console.log(event.target.value);
        this.$emit('input', event.target.value)
      }
    }
  }
  </script>
  