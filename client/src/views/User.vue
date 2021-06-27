<template>
  <div>
    <el-page-header
      class="header"
      @back="$router.go(-1)"
      content="Your Pastes"
    />

    <el-main>
      <div v-if="!isLoading && items.length === 0" class="no-content">
        <h2>You don't have any pastes.</h2>
        <el-button
          type="primary"
          icon="el-icon-document-add"
          @click="$router.push('/')"
        >
          Create One
        </el-button>
      </div>

      <div class="container" v-else>
        <paste-card
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          @delete="onDelete(item, index)"
        />
      </div>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios';

import PasteCard from '@/components/PasteCard';

export default {
  name: 'User',

  components: {
    PasteCard,
  },

  data() {
    return {
      items: [],
      isLoading: true,
    };
  },

  mounted() {
    const headers = {
      Authorization: `Bearer ${this.$store.state.auth.token}`,
    };

    axios
      .get('/pastes', {
        headers,
      })
      .then(res => {
        this.items = res.data
          .map(item => ({
            ...item,
            content: item.content
              .split(/\r\n|\r|\n/)
              .slice(0, 10)
              .join('\n'),
          }))
          .sort(this.itemComparer);
      })
      .catch(err => {
        this.$message({
          showClose: true,
          message: err?.response?.statusText || 'Error sending that request',
          type: 'error',
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  methods: {
    onDelete(item, index) {
      const headers = {
        Authorization: `Bearer ${this.$store.state.auth.token}`,
      };

      axios
        .delete(`/pastes/${item.id}`, {
          headers,
        })
        .then(() => {
          this.items.splice(index, 1);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err?.response?.statusText || 'Error sending that request',
            type: 'error',
          });
        });
    },

    itemComparer(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 20px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > * {
    width: 100%;
    max-width: 1000px;
  }
}

.no-content {
  position: absolute;
  text-align: center;
  top: 45%;
  right: 50%;
  transform: translateX(50%);

  h2 {
    padding-bottom: 1.5rem;
  }
}
</style>
