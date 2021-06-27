<template>
  <el-container class="container">
    <el-main>
      <el-card class="card" :body-style="{ padding: '0px', height: '100%' }">
        <slot name="header" slot="header"></slot>
        <slot></slot>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "EditorCard"
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.card {
  height: calc(100vh - 40px);

  @media (max-width: 768px) {
    height: 100vh;
  }
}
</style>
