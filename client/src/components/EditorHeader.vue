<template>
  <div class="editor-header">
    <h1 class="title">Codebin</h1>

    <div class="controls">
      <template v-if="readonly">
        <el-button-group>
          <el-button type="primary" icon="el-icon-document-add" round @click="$emit('new')">New</el-button>
          <el-button type="primary" icon="el-icon-edit" round @click="$emit('edit')">Edit</el-button>
          <el-button type="primary" icon="el-icon-copy-document" round @click="$emit('copy')">Copy</el-button>
          <el-button type="primary" icon="el-icon-document" round @click="$emit('raw')">Raw</el-button>
        </el-button-group>
      </template>
      <template v-else>
        <div class="controls__expiration">
          <label>Expires</label>
          <el-select v-model="expiration">
            <el-option v-for="item in expires" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </div>

        <el-button-group>
          <el-button
            type="success"
            round
            icon="el-icon-check"
            :disabled="disableSave"
            @click="$emit('save', expiration)"
          >Save</el-button>
        </el-button-group>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorHeader",

  props: {
    readonly: Boolean,
    disableSave: Boolean
  },

  data() {
    return {
      expiration: null,
      expires: [
        {
          label: "Never",
          value: null
        },
        {
          label: "15 minutes",
          value: 15
        },
        {
          label: "30 minutes",
          value: 30
        },
        {
          label: "1 hour",
          value: 60
        },
        {
          label: "3 hours",
          value: 180
        },
        {
          label: "6 hours",
          value: 360
        },
        {
          label: "12 hours",
          value: 720
        },
        {
          label: "1 day",
          value: 1440
        },
        {
          label: "1 week",
          value: 10080
        }
      ]
    };
  },

  created() {
    this.expiration = this.expires[0];
  }
};
</script>

<style scoped lang="scss">
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  min-height: 60px;

  & > * {
    flex-shrink: 0;
  }

  .title {
    user-select: none;
    padding-right: 4rem;
  }

  @media (max-width: 480px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      padding-right: 0;
      padding-bottom: 1rem;
    }
  }
}

.controls {
  display: flex;
  align-items: flex-end;

  &__expiration {
    display: flex;
    flex-direction: column;
    padding-right: 2rem;

    label {
      font-size: 11px;
    }
  }
}
</style>
