<template>
    <div
      class="filter_active"
      :class="{ filter_visible: isActive }"
      v-show="isActive"
    >
      <v-col cols="10" sm="11" class="px-0 py-0">
        <v-chip-group class="filter__chip" column active-class="filter__chip_disabled">
          <v-chip
            class="filter__chip_active"
            label
            v-for="(tag, index) in checkedTag"
            :key="index"
            >{{ tag }}
            <img
              src="\images\icon-remove.svg"
              alt="remove icon"
              class="filter__chip_remove"
              @click="removeTag(index)"
            />
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="2" sm="1" class="filter__button-col">
        <button class="filter__button_clear-all" @click="removeAllTags">Clear</button>
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

.filter {
  &__chip {
    .v-chip:not(.v-chip--active) {
      background: $lightGreyTag !important;
      color: $primaryColor;
      font-size: 12px;
    }
    &_disabled {
      background: $lightGreyTag !important;
      color: $primaryColor !important;
      font-size: 12px !important;
    }
    &_active {
      margin: 0 12px !important;
      padding-right: 0 !important;
      display: inline;
    }
    &_remove {
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
  &_visible {
    display: none;
  }
  &__button {
    &-col {
      text-align: end;
      padding: 12px 0;
    }
    &_clear-all {
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
}
/*   &_clear-all {
    font-size: 12px;
    color: $darkGrey;
    cursor: pointer;
    outline: none;

    &:hover {
      color: $primaryColor;
      text-decoration: underline;
    }
  } */
/*   &__button_clear {
    text-align: end;
    padding: 12px 0;
  }
} */

@media all and (max-width: 375px) {
  .filter__button_clear {
    text-align: start;
    padding: 0 !important;
  }
  .filter__chip_active {
    margin-bottom: 10px !important;
    font-size: 11px !important;
    height: 28px !important;
  }
}
</style>