<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.CodeMirror {
  height: 100% !important;
  font-family: 'Fira Mono', monospace !important;
  font-size: 14px !important;
  padding: 10px 0 !important;
}

.CodeMirror-scroll {
  cursor: text !important;
}

@media (max-width: 768px) {
  .el-main {
    padding: 0px !important;
  }

  .el-card {
    border: none !important;
  }
}

@media (max-width: 480px) {
  .shrink-btn span {
    display: none;
  }

  .CodeMirror {
    font-size: 12px !important;
  }
}
</style>
