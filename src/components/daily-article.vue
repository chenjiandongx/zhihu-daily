<template>
  <div class="daily-article">
    <div class="daily-article-content" v-html="data.body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from '../../utils.js';
  export default {
    props: {
      id: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        data: {}
      };
    },
    methods: {
      getArticle() {
        $.ajax.get('news/' + this.id).then(res => {
          res.body = res.body.replace(/src="https:/g, 'src="' + $.imgPath + 'https:');
          res.body = res.body.replace(/src="http:/g, 'src="' + $.imgPath + 'http:');
          this.data = res;
          window.scrollTo(0, 0);
        });
      }
    },
    watch: {
      id(val) {
        if (val) this.getArticle();
      }
    },
    mounted() {
      this.getArticle();
    }
  };
</script>

<style>
  .daily-article {
    margin-left: 450px;
    padding: 20px;
  }
</style>
