<template>
  <el-popover
    placement="bottom"
    width="250"
    trigger="click"
    transition="el-zoom-in-top"
  >
    <div class="popover">
      <template v-if="isAuth">
        <h2>{{ $store.state.auth.username }}</h2>
        <el-divider></el-divider>
        <el-button class="popover__btn" @click="$router.push('/user')">
          My Pastes
        </el-button>
        <el-button class="popover__btn" type="danger" @click="logout">
          Logout
        </el-button>
      </template>
      <template v-else>
        <el-button
          class="popover__btn"
          type="primary"
          @click="$router.push('/auth/login')"
          >Login
        </el-button>
        <el-button
          class="popover__btn"
          type="success"
          @click="$router.push('/auth/register')"
          >Register
        </el-button>
      </template>
    </div>

    <el-button slot="reference" icon="el-icon-user" type="info" circle />
  </el-popover>
</template>

<script>
export default {
  name: "ProfilePopover",

  computed: {
    isAuth() {
      return this.$store.state.auth.isAuthorized;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.popover {
  margin: 10px 0;

  h2 {
    text-align: center;
  }

  &__btn {
    width: 100%;
    margin: 0 0 0 0 !important;

    & + & {
      margin-top: 10px !important;
    }
  }
}
</style>
