<template>
  <div class="main">
    <v-container class="px-0 py-15">
      <job-filter :checkedTag="checkedTag" :isActive="isActive" />

      <div v-for="job in filteredJobs" :key="job.id" class="container">
        <v-hover v-slot="{ hover }">
          <v-card
            color="white"
            class="my-0 card ml-0"
            :class="{ 'on-hover': hover }"
          >
            <div class="d-flex flex-no-wrap justify-start">
              <v-col sm="2" md="2" class="job-avatar px-0">
                <v-avatar class="ma-3" size="90" tile>
                  <v-img :src="job.logo" contain></v-img>
                </v-avatar>
              </v-col>
              <v-col sm="6" md="5" class="job-description px-0">
                <v-card-title class="company-name py-3 pl-1 pr-0"
                  ><span class="pr-3">{{ job.company }}</span>
                  <v-chip small v-if="job.new" class="chip-new mb-1 mx-1"
                    >NEW!</v-chip
                  >
                  <v-chip
                    small
                    v-if="job.featured"
                    class="chip-featured mb-1 ml-1"
                    >FEATURED</v-chip
                  >
                </v-card-title>
                <v-card-subtitle class="job-position">{{
                  job.position
                }}</v-card-subtitle>
                <v-card-text class="job-details px-1">
                  <span>{{ job.postedAt }}</span> &bull;
                  <span>{{ job.contract }}</span> &bull;
                  <span>{{ job.location }} </span>
                </v-card-text>
              </v-col>

              <v-col sm="4" md="5" class="button-group-tags px-0">
                <v-divider
                  inset
                  class="job-divider mb-1 mt-4 d-sm-none"
                ></v-divider>
                <div class="pl-1">
                  <button
                    class="button-tag"
                    @click="addTag($event)"
                    :value="job.role"
                  >
                    {{ job.role }}
                  </button>
                  <button
                    :value="job.level"
                    @click="addTag($event)"
                    class="button-tag"
                  >
                    {{ job.level }}
                  </button>
                  <button
                    class="button-tag"
                    v-for="language in job.languages"
                    :key="language.id"
                    @click="addTag($event)"
                    :value="language"
                  >
                    {{ language }}
                  </button>
                  <button
                    class="button-tag"
                    v-for="tool in job.tools"
                    @click="addTag($event)"
                    :key="tool.id"
                    :value="tool"
                  >
                    {{ tool }}
                  </button>
                </div>
              </v-col>
            </div>
          </v-card>
        </v-hover>
      </div>
    </v-container>
  </div>
</template>

<script>
import jobFilter from './JobFilter'

export default {
  name: 'JobListing',
  components: {
    jobFilter
  },
  data: () => ({
    jobs: [],
    checkedTag: [],
    hover: false,

  }),
  methods: {
    addTag(e){
      if(this.checkedTag.includes(e.target.value)) return 
      else this.checkedTag.push(e.target.value)   
    }
  },
  computed: {
    isActive() {
      return !!this.checkedTag.length
    },
    filteredJobs() {
      return this.jobs.filter(job => this.checkedTag.every(tag => tag == job.level
      || tag == job.role 
      || tag == job.languages.filter(lang => tag == lang) 
      || tag == job.tools.filter(tool => tag == tool)));        
    }
  },
  created() {
    this.axios.get('data.json').then(res => {
      this.jobs = res.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.main {
  min-height: calc(100vh - 120px);
  background: $lightGreyBackground;
}
.active-filter {
  background: white;
  z-index: 1;
  height: 60px;
  margin: 0 12px;
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  top: -80px;
  justify-content: space-between;
  border-radius: 3px;
  font-weight: 700;
}
.button-group-tags {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 700 !important;
}
.company-name {
  color: $primaryColor;
  font-weight: 700 !important;
  font-size: 14px;
}
.job {
  &-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-position {
    color: $distinctlyDarkGrey;
    font-weight: 700 !important;
    font-size: 18px;
    padding: 12px 0 8px 4px !important;
  }
  &-details {
    color: $darkGrey;
    font-weight: 500 !important;
  }
}

.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical) {
  margin: 0;
}

.button-tag {
  max-width: 100%;
  padding: 0 12px;
  position: relative;
  background: $lightGreyTag;
  height: 32px;
  font-size: 12px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  font-weight: 700;
  color: $primaryColor;
  margin: 4px 8px 0 0;
  outline: none;
}
.button-tag:hover {
  background: $primaryColor;
  color: white;
}

.v-card.on-hover {
  position: relative;
  border-left: 5px solid $primaryColor !important;

  .job-position {
    color: $primaryColor !important;
    cursor: pointer;
  }
}

.chip {
  &-new {
    color: white !important;
    background: $primaryColor !important;
    font-size: 10px !important;
    margin: 0 8px 0 16px;
    padding-top: 3px;
  }
  &-featured {
    color: white !important;
    background: $distinctlyDarkGrey !important;
    font-size: 10px !important;
    padding-top: 3px;
  }
  &-active {
    background: $primaryColor !important;
    color: white !important;
    font-size: 12px !important;
  }
}

@media all and (max-width: 375px) {
  .container {
    margin-bottom: 20px;
  }
  .active-filter {
    height: 130px;
    padding: 0;
    max-height: 100%;
    top: -90px;
  }
  .card {
    display: flex;
    flex-direction: column;
    height: 230px !important;
    margin-left: 20px;
  }
  .company-name {
    margin: 5px 0 0 5px;
  }
  .job {
    &-avatar {
      position: absolute;
      top: -55px;
      right: 115px;

      .v-avatar {
        width: 60px !important;
        height: 60px !important;
      }
    }
    &-description {
      display: block;
    }
    &-position {
      margin-left: 8px;
      font-size: 15px;
    }
    &-details {
      margin-left: 8px !important;
    }
    &-divider {
      max-width: calc(100% - 8px) !important;
      margin: 0 auto !important;
    }
  }
  .v-chip-group .v-slide-group__content {
    margin-left: 8px !important;
  }
  .chip-group-tags {
    position: absolute;
    top: 100px;
    display: inline-block;
    justify-content: flex-end;
    padding-left: 8px !important;
    width: 90%;
    margin-left: 8px !important;
  }
}
</style>