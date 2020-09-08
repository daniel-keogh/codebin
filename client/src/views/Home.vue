<template>
  <div class="home">
    <el-main>
      <el-card class="card" :body-style="{ padding: '0px', height: '100%' }">
        <editor-header slot="header" @save="onSave" />
        <editor :mimeType="mimeType" @lang-change="onLangChange" v-model="code" />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import EditorHeader from "@/components/EditorHeader";

import axios from "axios";
import hljs from "highlight.js";
import { CodeMirror } from "vue-codemirror";

export default {
  name: "Home",

  components: {
    Editor,
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

  methods: {
    onSave(expireAfterMinutes) {
      if (this.code === "") {
        return;
      }

      let mimeType = this.mimeType;

      if (!this.mimeTypeChanged) {
        // Try to auto-detect the mime type
        const lang = hljs.highlightAuto(this.code).language;
        if (lang) {
          mimeType = CodeMirror.findModeByName(lang)?.mime;
        }
      }

      axios
        .post("/pastes", {
          content: this.code,
          mimeType,
          expireAfterMinutes: expireAfterMinutes?.value
        })
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

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
