<template>
  <editor-card>
    <editor-header slot="header" :disableSave="disableSave" @save="onSave" />
    <editor :mimeType="mimeType" @lang-change="onLangChange" v-model="code" />
  </editor-card>
</template>

<script>
import Editor from "@/components/Editor";
import EditorCard from "@/components/EditorCard";
import EditorHeader from "@/components/EditorHeader";

import axios from "axios";
import hljs from "highlight.js";
import { CodeMirror } from "vue-codemirror";

export default {
  name: "Home",

  components: {
    Editor,
    EditorCard,
    EditorHeader
  },

  data() {
    return {
      mimeType: "text/plain",
      code: "",
      mimeTypeChanged: false
    };
  },

  created() {
    if (this.$route.query.id) {
      axios
        .get(`/pastes/${this.$route.query.id}`)
        .then(res => {
          this.code = res.data.content;
          this.mimeType = res.data.mimeType;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err?.response?.statusText || "Error fetching paste",
            type: "error"
          });
        });
    }
  },

  computed: {
    disableSave() {
      return this.code.trim() === "";
    }
  },

  methods: {
    onSave(expireAfterMinutes) {
      const headers = {
        Authorization: `Bearer ${this.$store.state.auth.token}`
      };

      let mimeType = this.mimeType;

      if (!this.mimeTypeChanged) {
        // Try to auto-detect the mime type
        const lang = hljs.highlightAuto(this.code).language;
        if (lang) {
          mimeType = CodeMirror.findModeByName(lang)?.mime;
        }
      }

      axios
        .post(
          "/pastes",
          {
            content: this.code,
            mimeType,
            expireAfterMinutes: expireAfterMinutes?.value
          },
          {
            headers
          }
        )
        .then(res => {
          this.$router.replace(`/${res.data.id}`);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: err?.response?.statusText || "Error sending that request",
            type: "error"
          });
        });
    },

    onLangChange(lang) {
      if (lang !== this.mimeType) {
        this.mimeTypeChanged = true;
      }
      this.mimeType = lang;
    }
  }
};
</script>

<style scoped lang="scss">
.home {
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
