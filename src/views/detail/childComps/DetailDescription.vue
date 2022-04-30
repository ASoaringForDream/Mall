<template>
  <div v-if="Object.keys(description).length !== 0" class="DetailDescription">
    <div class="desc">
      <div class="start"></div>
      <div class="Description">
        {{ description.desc }}
      </div>
      <div class="end"></div>
    </div>
    <div class="Description-key">{{ description.detailImage[0].key }}</div>
    <div
      class="Description-img"
      v-for="item in description.detailImage[0].list"
      :key="item"
    >
      <img :src="item" alt="" @load="DescriptionImage" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailDescription",
  props: {
    description: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    DescriptionImage() {
      this.$emit("DescriptionImage");
    },
  },
};
</script>

<style scoped>
.Description-img {
  width: 100%;
}
.Description-img img {
  width: 100%;
}
.desc {
  margin-top: 20px;
  padding: 0 15px;
}

.desc .start,
.desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.desc .start {
  float: left;
}

.desc .end {
  float: right;
}

.desc .start::before,
.desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.desc .end::after {
  right: 0;
}

.desc .Description {
  padding: 15px 0;
  font-size: 14px;
}
.Description-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
</style>