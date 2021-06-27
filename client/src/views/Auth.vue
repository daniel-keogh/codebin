<template>
  <el-container class="container">
    <el-main class="auth">
      <el-card>
        <el-page-header
          @back="$router.go(-1)"
          :content="'Codebin | ' + (isLogin ? 'Login' : 'Register')"
          class="auth__header"
        />

        <el-form
          class="auth__form"
          ref="form"
          :model="model"
          :rules="rules"
          status-icon
          @submit.native.prevent="submit"
        >
          <el-form-item prop="username" label="Username">
            <el-input
              autofocus
              v-model="model.username"
              placeholder="Username"
              prefix-icon="el-icon-user"
            />
          </el-form-item>

          <el-form-item prop="password" label="Password">
            <el-input
              v-model="model.password"
              placeholder="Password"
              type="password"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              native-type="submit"
              block
            >
              Submit
            </el-button>
          </el-form-item>
        </el-form>

        <div class="auth__redirect">
          <template v-if="isLogin">
            <p>Don't have an account?</p>
            <router-link to="/auth/register">Register</router-link>
          </template>
          <template v-else>
            <p>Already have an account?</p>
            <router-link to="/auth/login">Login</router-link>
          </template>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Auth',

  watch: {
    $route(to) {
      this.isLogin = to.params.action === 'login';
    },
  },

  data() {
    const checkUsername = (rule, value, callback) => {
      if (this.isLogin) {
        callback();
      } else {
        axios
          .post('/auth/check_username', {
            username: value,
          })
          .then(() => {
            callback();
          })
          .catch(() => {
            callback(new Error('Username is not available'));
          });
      }
    };

    return {
      isLogin: this.$route.params.action === 'login',

      model: {
        username: '',
        password: '',
      },

      loading: false,

      rules: {
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: 'blur',
          },
          {
            min: 3,
            message: 'Username should be at least 3 characters',
            trigger: 'blur',
          },
          {
            max: 20,
            message: 'Username should be under 20 characters',
            trigger: 'blur',
          },
          {
            validator: checkUsername,
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Password is required',
            trigger: 'blur',
          },
          {
            min: 8,
            message: 'Password should be at least 8 characters',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  mounted() {
    if (this.$store.state.auth.isAuthorized) {
      this.$router.replace('/');
    }
  },

  methods: {
    submit() {
      this.$refs.form
        .validate()
        .then(() => {
          this.loading = true;

          const { username, password } = this.model;

          this.$store
            .dispatch(this.isLogin ? 'login' : 'register', {
              username,
              password,
            })
            .then(() => {
              this.loading = false;
              this.$router.replace('/');
            })
            .catch(err => {
              this.loading = false;

              this.$message({
                showClose: true,
                message: err.message || 'Error sending that request',
                type: 'error',
              });
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
}

.auth {
  display: flex;
  justify-content: center;
  align-items: center;

  &__header {
    text-align: center;
    padding-top: 20px;
    margin-bottom: 50px;
  }

  &__form {
    width: 400px;

    button {
      width: 100%;
      margin-top: 30px;
    }
  }

  &__redirect {
    padding: 20px 0;
    text-align: center;

    p {
      margin-bottom: 10px;
    }
  }
}
</style>
