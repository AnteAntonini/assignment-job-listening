<template>
  <div
    class="active-filter"
    :class="{ visibleFilter: isActive }"
    v-show="isActive"
  >
    <v-col cols="10" sm="11" class="px-0 py-0">
      <v-chip-group
        class="chip-tag"
        column
        active-class="chip-tag-disabled"
      >
        <v-chip
          class="tag-active"
          label
          v-for="(tag, index) in checkedTag"
          :key="index"
          >{{ tag }}
          <img
            src="\images\icon-remove.svg"
            alt="remove icon"
            class="tag-remove"
            @click="removeTag(index)"
          />
        </v-chip>
      </v-chip-group>
    </v-col>
    <v-col cols="2" sm="1" class="clear-btn">
      <button class="clear-filter" @click="removeAllTags">Clear</button>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    checkedTag: Array,
    isActive: Boolean
  },
  methods: {
    removeTag(index) {
      this.checkedTag.splice(index,1)
    },
    removeAllTags() {
      this.checkedTag.splice(0,this.checkedTag.length)
    }
  },
}
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

.chip {
  &-tag {
    .v-chip:not(.v-chip--active) {
      background: $lightGreyTag !important;
      color: $primaryColor;
      font-size: 12px;
    }
  }
  &-tag-disabled {
    background: $lightGreyTag !important;
    color: $primaryColor !important;
    font-size: 12px !important;
  }
}

.tag {
  &-active {
    margin: 0 12px !important;
    padding-right: 0 !important;
    display: inline;
  }
  &-remove {
    height: 32px;
    width: 32px;
    background: $primaryColor;
    padding: 9px;
    margin-left: 5px;

    &:hover {
      background: $distinctlyDarkGrey;
    }
  }
}

.visibleFilter {
  display: none;
}

.clear {
  &-btn {
    text-align: end;
    padding: 12px 0;
  }
  &-filter {
    font-size: 12px;
    color: $darkGrey;
    cursor: pointer;
    outline: none;

    &:hover {
      color: $primaryColor;
      text-decoration: underline;
    }
  }
}

@media all and (max-width: 375px) {
  .clear-btn {
    text-align: start;
    padding: 0 !important;
  }
  .tag-active {
    margin-bottom: 10px !important;
    font-size: 11px !important;
    height: 28px !important;
  }
}
</style>