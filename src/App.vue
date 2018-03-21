<template>
  <div id="app">
    <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item"
             @click="handleToRecommend"
             :class="{ on:type === 'recommend'}"><p>每日推荐</p>
        </div>
        <div class="daily-menu-item"
             :class="{ on:type === 'daily'}"
             @click="showThemes = !showThemes"><p>主题日报</p>
        </div>
        <ul v-show="showThemes">
          <li v-for="item in themes" :key="item.id">
            <a :class="{ on:item.id === themeId && type === 'daily'}"
               @click="handleToTheme(item.id)">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="daily-list"
           ref="list"
           @scroll="handleScroll">
        <template v-if="type === 'recommend'">
          <div v-for="list in recommendList" :key="list.date">
            <div class="daily-date">{{ formatDay(list.date) }}</div>
            <Item v-for="item in list.stories"
                  :data="item"
                  :key="item.id"
                  @click.native="handleClick(item.id)"></Item>
          </div>
        </template>
        <template v-if="type === 'daily'">
          <Item v-for="item in list"
                :data="item"
                :key="item.id"
                @click.native="handleClick(item.id)"></Item>
        </template>
      </div>
      <daily-article :id="articleId"></daily-article>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from '../utils.js';
  import Item from './components/item.vue';
  import DailyArticle from './components/daily-article.vue';
  export default {
    components: {
      'Item': Item,
      'daily-article': DailyArticle
    },
    data() {
      return {
        themes: [],
        showThemes: false,
        type: 'recommend',
        recommendList: [],
        dailyTime: $.getTodayTime(),
        isLoading: false,
        list: [],
        themeId: 0,
        articleId: 0,
        firstLoad: true
      };
    },
    methods: {
      getThemes() {
        $.ajax.get('themes').then(res => {
          this.themes = res.others;
        });
      },
      handleToTheme(id) {
        this.type = 'daily';
        this.themeId = id;
        this.list = [];
        $.ajax.get('theme/' + id).then(res => {
          this.list = res.stories.filter(item => item.type !== 1);
        });
      },
      handleToRecommend() {
        this.type = 'recommend';
        this.recommendList = [];
        this.dailyTime = $.getTodayTime();
        this.getRecommendList();
      },
      getRecommendList() {
        this.isLoading = true;
        const prevDay = $.prevDay(this.dailyTime);
        $.ajax.get('news/before/' + prevDay).then(res => {
          this.recommendList.push(res);
          this.isLoading = false;
          if (this.firstLoad) {
            this.articleId = this.recommendList[0].stories[0].id;
            this.firstLoad = false;
          }
        });
      },
      formatDay(date) {
        let year = date.substr(0, 4);
        let mouth = date.substr(4, 2);
        let day = date.substr(6, 2);
        if (mouth.substr(0, 1) === '0') {
          mouth = mouth.substr(1, 1);
        }
        if (day.substr(0, 1) === '0') {
          day = day.substr(1, 1);
        }
        return `${year} 年 ${mouth} 月 ${day} 日`;
      },
      handleScroll() {
        const $list = this.$refs.list;
        if (this.type === 'daily' || this.isLoading) return;
        if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight - 1) {
          this.dailyTime -= 86400000;
          this.getRecommendList();
        }
      },
      handleClick(id) {
        this.articleId = id;
      }
    },
    mounted() {
      this.getThemes();
      this.getRecommendList();
    }
  };
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    color: #657180;
    font-size: 16px;
  }

  .daily-menu {
    width: 150px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: #f5f7f9;
  }

  .daily-menu-list {
    font-size: 18px;
    text-align: center;
    margin: 5px 0;
    padding: 10px 0;
    cursor: pointer;
    border-right: 2px solid transparent;
    transition: all .3s ease-in-out;
  }

  .daily-menu-item p {
    margin-left: 20%;
    font-size: 18px;
    line-height: 40px;
    height: 40px;
    cursor: pointer;
  }

  .daily-menu-item:hover {
    background: #e3e8ee;
  }

  .daily-menu-item.on {
    border-right: 2px solid #3399ff;
  }

  .daily-list {
    width: 300px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 150px;
    overflow: auto;
    border-right: 1px solid #d7dde4;
  }

  .daily-menu ul {
    list-style: none;
  }

  .daily-menu ul li a {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 5px 0;
    margin: 5px 0;
    cursor: pointer;
  }

  .daily-menu ul li a:hover,
  .daily-menu ul li a.on {
    color: #3399ff;
  }

  .daily-date {
    text-align: center;
    margin: 10px 0;
  }
</style>
