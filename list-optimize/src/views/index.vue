<template>
  <div class="list" ref="container" @scroll.passive="handleScroll">
    <div :style="blankFillStyle">
      <ul ref="ul">
        <li
          v-for="item in showDataList"
          :key="item.id"
          @click="toDetail(item.id)"
        >
          <div class="left">
            <div class="title">{{ item.title }}</div>
            <div class="reads">
              <div class="readNum">{{ item.reads }}</div>
              <div class="date">{{ item.date }}</div>
            </div>
          </div>
          <div class="right">
            <img :src="img[item.image]" alt="" />
          </div>
        </li>
      </ul>
      <div v-if="data.isLoading">加载中。。。。</div>
    </div>
  </div>
</template>

<script setup>
import img1 from "../assets/1.png";
import img2 from "../assets/2.jpg";
import img3 from "../assets/squa.png";
import { reactive, onMounted, ref, computed, onActivated } from "vue";
import { useRouter } from "vue-router";
import { fetchList } from "../actions/index.js";

const img = [img1, img2, img3];
const data = reactive({
  list: [],
  isLoading: true,
  oneHeight: 88,
  containerSize: 0,
  startIndex: 0,
});

const router = useRouter();

/** 替代 $refs 写法 */
const container = ref(null);

const getList = async (num) => {
  data.isLoading = true;
  try {
    const res = await fetchList(num);
    data.isLoading = false;
    data.list.length ? data.list.push(...res.list) : (data.list = res.list);
  } catch (e) {
    console.log(e);
  }
};

getList(20);

const getContainerSize = () => {
  /* 获取一屏容纳的item数量 */
  data.containerSize =
    Math.floor(container.value.offsetHeight / data.oneHeight) + 2;
};

const updateData = () => {
  /* 没有切到下一个item时，不做重复操作 */
  let currentIndex = Math.floor(container.value.scrollTop / data.oneHeight);
  if (data.startIndex === currentIndex) return;
  data.startIndex = currentIndex;

  /* 请求的过程中不要重复执行 */
  if (
    data.startIndex + data.containerSize > data.list.length - 1 &&
    !data.isLoading
  ) {
    getList(20);
  }
};

let start = Date.now();
let wait = 1000 / 30;

/* 滚动事件 附加节流 */
const handleScroll = () => {
  /* 利用时间戳实现计时 */
  let now = Date.now();
  if (now - start >= wait) {
    updateData();
    start = now;
  }
};

const toDetail = (id) => {
  router.push(`/detail/${id}`);
};

const endIndex = computed(() => {
  let end = data.startIndex + data.containerSize;

  if (!data.list[end]) {
    // 如果不存在 则取列表中最后一个
    end = data.list.length - 1;
  }
  return end;
});

const blankFillStyle = computed(() => {
  return {
    paddingTop: data.startIndex * data.oneHeight + "px",
    paddingBottom:
      (data.list.length - 1 - endIndex.value) * data.oneHeight + "px",
  };
});

const showDataList = computed(() => {
  return data.list.slice(data.startIndex, endIndex.value);
});

onMounted(() => {
  getContainerSize();
  window.onresize = getContainerSize;
  window.orientationchange = getContainerSize;
});

</script>

<style scoped>
.list {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.list li {
  height: 88px;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  padding: 10px;
  justify-content: space-between;
}
.list li img {
  width: 80px;
  height: 68px;
  margin-left: 10px;
}
.reads {
  display: flex;
  justify-content: space-between;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 10px;
}
</style>