<template>
  <div class="charts" ref="myChart" :style="{width:chartsWidth,height:chartsHeight}"></div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
import echarts from "echarts";

@Component({
  components: {}
})
export default class ChartsData extends Vue {
  @Provide() tabPosition: String = "line";

  @Prop({ type: String, default: "line" }) readonly chartsType!: string;

  @Prop(Object) chartsData!: string | null;

  @Provide() chartsHeight: string = "";

  @Provide() chartsWidth: string = "";

  created() {
    this.generatorWidthAndHeight();
  }

  mounted() {
    this.drawChart();
  }

  //   根据页面生成合适的宽高
  generatorWidthAndHeight() {
    this.chartsHeight = document.body.offsetHeight * 0.6 + "px";
    this.chartsWidth = document.body.offsetWidth * 0.8 + "px";
  }

  drawChart() {
    let chart = echarts.init((this as any).$refs.myChart as HTMLCanvasElement);

    if (chart == undefined) {
      console.log(`echarts init dom is failed`);
      return;
    }

    switch (this.chartsType) {
      case "line":
        chart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        chart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        chart.setOption((this as any).generatorPieOption());
        break;
      default:
        console.log("chartType is invaild");
        break;
    }
  }

  // 折线图 option
  generatorLineOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartsData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartsData.yAxisData,
          type: "line",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      }
    };
  }

  // 柱状图 option
  generatorBarOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartsData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartsData.yAxisData,
          type: "bar",
          barWidth: "20%"
        }
      ],
      color: ["#3398db"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%"
      }
    };
  }
  
  // 饼图 option
  generatorPieOption() {
    let pieData = [];
    for (const index in (this as any).chartsData.xAxisData) {
      pieData.push({
        value: (this as any).chartsData.yAxisData[index],
        name: (this as any).chartsData.xAxisData[index]
      });
    }
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartsData.xAxisData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }
}
</script>

<style lang="less" scoped>
</style>