
<template>
  <div>
    <label v-if="exibirLabel" :class="classes">{{ label }}</label>
    <br />
    <input
      :class="classes"
      :type="type"
      v-model="vmodel"
      dense
      :placeholder="placeholder"
      outlined
      required
    />
  </div>
</template>
<script>
export default {
  name: "input-text",
  props: {
    vmodel:{
      type: String,
      required: true
    },
    exibirLabel: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      default: "input-text",
    },
    placeholder: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: function (value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },
  computed: {
    classes() {
      return {
        "input-text": true,
        "input-text--primary": this.primary,
        "input-text--secondary": !this.primary,
        [`input-text--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>
<style scoped>
.input-text {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  display: inline-block;
  line-height: 1;
}

.input-text--primary {
  color: white;
  background-color: #ff914d;
}

.input-text--secondary {
  background-color: transparent;
  height:5vh
}

.input-text--small {
  font-size: 12px;
  padding: 10px 16px;
}

.input-text--medium {
  font-size: 14px;
  padding: 11px 20px;
}

.input-text--large {
  font-size: 16px;
  padding: 12px 24px;
}
</style>
