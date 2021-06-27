<template>
  <editor-card>
    <editor-header
      slot="header"
      @raw="onRaw"
      @copy="onCopy"
      @edit="onEdit"
      @new="$router.push('/')"
      readonly
    />
    <editor
      :mimeType="mimeType"
      @lang-change="onLangChange"
      v-model="code"
      readonly
    />
  </editor-card>
</template>

<script>
import Editor from "@/components/Editor";
import EditorCard from "@/components/EditorCard";
import EditorHeader from "@/components/EditorHeader";

import axios from "axios";

export default {
  name: "Paste",

  components: {
    Editor,
    EditorCard,
    EditorHeader
  },

  data() {
    return {
      code: "",
      mimeType: "text/plain"
    };
  },

  created() {
    axios
      .get(`/pastes/${this.$route.params.id}`)
      .then(res => {
        this.code = res.data.content;
        this.mimeType = res.data.mimeType;
      })
      .catch(err => {
        this.$message({
          showClose: true,
          message: err?.response?.statusText || "Error sending that request",
          type: "error"
        });

        this.$router.push("/");
      });
  },

  methods: {
    async onCopy() {
      await this.$copyText(this.code);

      this.$message({
        showClose: true,
        message: "Copied to clipboard!",
        type: "success"
      });
    },

    onEdit() {
      this.$router.push({
        name: "Home",
        query: {
          id: this.$route.params.id
        }
      });
    },

    onRaw() {
      location.href = `${axios.defaults.baseURL}/raw/${this.$route.params.id}`;
    },

    onLangChange(lang) {
      this.mimeType = lang;
    }
  }
};
</script>

<style scoped lang="scss"></style>
