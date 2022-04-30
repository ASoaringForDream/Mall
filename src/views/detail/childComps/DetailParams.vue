<template>
  <div v-if="Object.keys(DetailParams).length !== 0" class="params-info">
    <table
      v-for="(table, index) in DetailParams.rule.tables"
      class="params-size"
      :key="index"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="info in DetailParams.info.set" :key="info">
        <td class="params-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="DetailParams.info.images">
      <div v-for="item in DetailParams.info.images" :key="item">
        <img :src="item" alt="" @load="paramsimgload"/>
      </div>
    </div>
    <div class="others">
      {{ DetailParams.rule.disclaimer }}
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    DetailParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    paramsimgload(){
      this.$emit('paramsimgload')
    }
  }
};
</script>

<style scoped>
.params-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.params-info table {
  width: 100%;
  border-collapse: collapse;
}

.params-info table tr {
  height: 42px;
}

.params-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.params-key {
  width: 95px;
}

.info-params {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
.others {
  margin-top: 10px;
}
</style>