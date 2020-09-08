<template>
  <div class="paste">
    <el-main>
      <el-card class="card" :body-style="{ padding: '0px', height: '100%' }">
        <editor-header
          slot="header"
          @raw="onRaw"
          @copy="onCopy"
          @edit="onEdit"
          @new="$router.push('/')"
          readonly
        />
        <editor :mimeType="mimeType" @lang-change="onLangChange" v-model="code" readonly />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import EditorHeader from "@/components/EditorHeader";

import axios from "axios";

export default {
  name: "Paste",

  components: {
    Editor,
    EditorHeader
  },

  data() {
    return {
      code: "",
      mimeType: "text/plain"
    };
  },

  mounted() {
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
      const id = this.$route.params.id;
      this.$router.push({ name: "Home", query: { id } });
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

<style scoped lang="scss">
.paste {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
