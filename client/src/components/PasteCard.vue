<template>
  <div class="container">
    <el-card class="card">
      <div slot="header" class="card__header">
        <h3>Created {{ item.createdAt | timeago }}</h3>
        <div>
          <el-button
            class="shrink-btn"
            @click="$router.push(`/${item.id}`)"
            icon="el-icon-document"
          >
            View
          </el-button>

          <el-popover
            class="popover"
            placement="bottom-end"
            width="200"
            v-model="deletePopoverVisible"
          >
            <h3 class="popover__heading">Delete</h3>
            <p>Are you sure?</p>
            <div class="popover__buttons">
              <el-button size="small" @click="deletePopoverVisible = false">
                No
              </el-button>
              <el-button type="danger" size="small" @click="onConfirmDelete">
                Yes
              </el-button>
            </div>
            <el-button
              class="shrink-btn"
              type="danger"
              slot="reference"
              icon="el-icon-delete"
            >
              Delete
            </el-button>
          </el-popover>
        </div>
      </div>

      <codemirror :options="options" :value="item.content" />

      <el-divider></el-divider>

      <div class="card__footer">
        <el-tag v-if="item.expireAfterMinutes">
          <i class="el-icon-time"></i>
          <span style="padding-left: 5px">
            Expires: {{ item.expireAfterMinutes | timeuntil(item.createdAt) }}
          </span>
        </el-tag>
        <el-tag v-else type="info">
          <i class="el-icon-time"></i>
          <span style="padding-left: 5px">Expires: Never</span>
        </el-tag>
        <el-tag type="info">{{ item.mimeType | getlang }}</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment';

import { CodeMirror } from 'vue-codemirror';

export default {
  name: 'PasteCard',

  props: {
    item: Object,
  },

  data() {
    return {
      options: {
        readOnly: true,
        styleActiveLine: false,
        cursorBlinkRate: -1,
        mode: 'text/plain',
        tabSize: 4,
      },
      deletePopoverVisible: false,
    };
  },

  methods: {
    onConfirmDelete() {
      this.deletePopoverVisible = false;
      this.$emit('delete');
    },
  },

  filters: {
    timeago(date) {
      return moment(date).fromNow();
    },

    timeuntil(minutes, createdAt) {
      const expires = moment(createdAt)
        .add(minutes, 'm')
        .toDate();
      return moment(expires).fromNow();
    },

    getlang(mime) {
      return CodeMirror.findModeByMIME(mime)?.name || mime;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 1rem;
  margin: auto;
}

.card {
  margin: 1.25rem auto;

  &:last-child {
    margin-bottom: 2.5rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin-right: 1rem;
    }

    & > * {
      flex-shrink: 0;
    }
  }

  &__footer {
    padding: 10px 0;
    display: flex;

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.popover {
  margin-left: 1rem;

  &__heading {
    margin-bottom: 0.5rem;
  }

  &__buttons {
    text-align: right;
    margin: 1rem 0 0 0;
  }
}
</style>
