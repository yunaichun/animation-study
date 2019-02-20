<template>
  <div class="main">
    <div class="top">
      <h1 class="title">支持我的全新奥迪色</h1>
      <button class="vote-btn" @click="changeVote">投票</button>
    </div>
    <p class="conent">
      奥迪二零一七秋冬系列，快来这里寻找属于你的奥迪色奥迪二零一七秋冬系列，快来这里寻找属于你的迪奥色奥迪二零一七秋冬系列快来这里寻找属于你的奥迪色奥迪二零一七秋冬系列？
    </p>
    <div class="after-voted" v-show="hasVoted">
        <div class="progress-bar">
            <div class="romance" :style="`width:${(romancePercent * 100 / allPercent)}%`"></div>
            <div class="cool" :style="`width:${(coolPercent * 100 / allPercent)}%`"></div>
        </div>
        <div class="percent">
            <p class="romance">支持浪漫主义{{ (romancePercent * 100 / allPercent) }}%</p>
            <p class="cool">支持酷感主义{{ ( coolPercent* 100 / allPercent) }}%</p>
        </div>
    </div>
    <div class="before-vote" v-show="!hasVoted">
      <button class="like-romance" @click="showVoted">支持浪漫主义</button>
      <button class="like-cool" @click="showVoted">支持酷感主义</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data(){
    return {
      allPercent: 100,
      romancePercent: 30,
      coolPercent: 70,
      hasVoted: false
    }
  },
  methods: {
    changeVote() {
      this.hasVoted = false;
    },
    showVoted() {
      this.hasVoted = !this.hasVoted;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 40px;
  width: 450px;
  /* 顶部 */
  .top {
    display: flex;
    align-items: flex-end;
    .title {
      margin: 0;
      color: #25272e;
    }
    .vote-btn {
      cursor: pointer;
      outline: none;
      width: 70px;
      border-radius: 5px;
      border: 0;
      height: 35px;
      margin-left: 15px;
      background: #ebedf0;
      color: #8b8c90;
      font-size: 18px;
    }
  }
  /* 投票内容 */
  .conent {
    font-size: 20px;
    color: #727378;
    text-align: left;
  }
  /* 投票前 */
  .before-vote {
    display: flex;
    justify-content: space-between;
    .like-romance,.like-cool {
      outline: none;
      width: 205px;
      border-radius: 5px;
      border: 1px solid #e3e3e5;
      height: 60px;
      background: #fff;
      color: #353535;
      font-size: 20px;
      font-weight: bold;
    }
  }
  /* 投票后 */
  .after-voted {
    .progress-bar {
      display: flex;
      width: 100%;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      .romance {
        animation: myfirst 2s;
        background: #bdbec0;
      }
      .cool {
        animation: mySecond 2s;
        background: #353535;
      }
    }
    .percent {
      display: flex;
      justify-content: space-between;
      .romance {
        color: #bdbec0;
        font-size: 25px;
      }
      .cool {
        color: #353535;
        font-size: 25px;
      }
    }
  }
}
@keyframes myfirst
{
  from {
    width: 0;
  }
}
@keyframes mySecond
{
  from {
    width: 100%;
  }
}
</style>
