<template>
  <div class="editor-header">
    <div class="title-area">
      <profile-popover />
      <h1 class="title">Codebin</h1>
    </div>

    <div class="controls">
      <template v-if="readonly">
        <el-button-group>
          <el-button
            v-for="control in controls"
            :key="control.icon"
            :icon="`el-icon-${control.icon}`"
            class="shrink-btn"
            type="primary"
            round
            @click="$emit(control.label.toLowerCase())"
          >
            {{ control.label }}
          </el-button>
        </el-button-group>
      </template>
      <template v-else>
        <div class="controls__expiration">
          <label>Expires</label>
          <el-select v-model="expiration">
            <el-option
              v-for="item in expires"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </div>

        <el-button-group>
          <el-button
            class="shrink-btn"
            type="success"
            round
            icon="el-icon-check"
            :disabled="disableSave"
            @click="$emit('save', expiration)"
            >Save
          </el-button>
        </el-button-group>
      </template>
    </div>
  </div>
</template>

<script>
import ProfilePopover from "@/components/ProfilePopover";

export default {
  name: "EditorHeader",

  components: {
    ProfilePopover
  },

  props: {
    readonly: Boolean,
    disableSave: Boolean
  },

  created() {
    this.expiration = this.expires[0];
  },

  data() {
    return {
      controls: [
        { label: "New", icon: "document-add" },
        { label: "Edit", icon: "edit" },
        { label: "Copy", icon: "copy-document" },
        { label: "Raw", icon: "document" }
      ],
      expiration: null,
      expires: [
        { label: "Never", value: null },
        { label: "15 minutes", value: 15 },
        { label: "30 minutes", value: 30 },
        { label: "1 hour", value: 60 },
        { label: "3 hours", value: 180 },
        { label: "6 hours", value: 360 },
        { label: "12 hours", value: 720 },
        { label: "1 day", value: 1440 },
        { label: "1 week", value: 10080 }
      ]
    };
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

  @media (max-width: 580px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.title-area {
  display: flex;
  align-items: center;

  .title {
    padding-left: 1rem;
    padding-right: 2.5rem;
  }

  @media (max-width: 580px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding-bottom: 1rem;

    .title {
      padding-right: 0;
      padding-left: 0;
      padding-top: 1rem;
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
