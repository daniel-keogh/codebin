<template>
  <div class="editor-wrapper">
    <codemirror
      class="editor"
      :options="options"
      :value="value"
      @cursorActivity="onCursorActivity"
      @input="$emit('input', $event)"
    />

    <div class="editor-footer">
      <div class="editor-footer__start">
        <span v-if="!readonly">
          Line {{ status.line }}, Column {{ status.col }}
        </span>
        <div v-else>
          <span>Read Only</span>
          <i class="el-icon-lock"></i>
        </div>
      </div>

      <div class="editor-footer__end">
        <el-select
          :value="mimeType"
          @input="$emit('lang-change', $event)"
          filterable
          placeholder="Language"
        >
          <el-option
            v-for="lang in langs"
            :key="lang.mime"
            :label="lang.name"
            :value="lang.mime"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { CodeMirror } from 'vue-codemirror';

export default {
  name: 'Editor',

  props: {
    mimeType: String,
    value: String,
    readonly: Boolean,
  },

  data() {
    const readOnly = this.readonly ?? false;
    const mode = this.mimeType ?? 'text/plain';

    return {
      options: {
        readOnly,
        mode,
        styleActiveLine: !readOnly,
        cursorBlinkRate: readOnly ? -1 : 530,
      },
      status: {
        line: 1,
        col: 1,
      },
    };
  },

  computed: {
    langs() {
      return CodeMirror.modeInfo;
    },
  },

  watch: {
    mimeType() {
      this.setMode();
    },
  },

  mounted() {
    this.setMode();
  },

  methods: {
    async setMode() {
      const lang = CodeMirror.findModeByMIME(this.mimeType);

      if (lang.mime !== 'text/plain') {
        await import(
          /* webpackChunkName: "codemirror.mode" */ `codemirror/mode/${lang.mode}/${lang.mode}.js`
        ).then();
      }

      this.options.mode = lang.mime;
    },

    onCursorActivity(event) {
      const { line, ch } = event.getCursor();

      this.status.line = line + 1;
      this.status.col = ch + 1;
    },
  },
};
</script>

<style scoped lang="scss">
.editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor {
  flex: 1 0 0;
  overflow-y: auto;
}

.editor-footer {
  background-color: lightgray;
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  padding: 0 20px;

  &__start {
    margin-right: auto;
    flex-shrink: 0;
    padding-right: 1rem;

    i {
      padding-left: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
}
</style>
