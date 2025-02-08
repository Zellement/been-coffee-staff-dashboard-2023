<template>
    <section v-if="uiStore.isXmasTheme" class="px-2">
        <h2 class="h1 mb-6">Advent Calendar Winners</h2>

        <div class="grid grid-cols-7 gap-1">
            <!-- Empty cells for the days before December 1st -->
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <!-- Days of December up to the 24th -->
            <div class="cell">
                <span class="cell__number">1</span>
                <nuxt-img
                    v-if="w01?.image.asset?._ref"
                    :src="
                        $urlFor(w01?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w01.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">2</span>
                <nuxt-img
                    v-if="w02?.image.asset?._ref"
                    :src="
                        $urlFor(w02?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w02.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">3</span>
                <nuxt-img
                    v-if="w03?.image.asset?._ref"
                    :src="
                        $urlFor(w03?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w03.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">4</span>
                <nuxt-img
                    v-if="w04?.image.asset?._ref"
                    :src="
                        $urlFor(w04?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w04.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">5</span>
                <nuxt-img
                    v-if="w05?.image.asset?._ref"
                    :src="
                        $urlFor(w05?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w05.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">6</span>
                <nuxt-img
                    v-if="w06?.image.asset?._ref"
                    :src="
                        $urlFor(w06?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w06.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">7</span>
                <nuxt-img
                    v-if="w07?.image.asset?._ref"
                    :src="
                        $urlFor(w07?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w07.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">8</span>
                <nuxt-img
                    v-if="w08?.image.asset?._ref"
                    :src="
                        $urlFor(w08?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w08.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">9</span>
                <nuxt-img
                    v-if="w09?.image.asset?._ref"
                    :src="
                        $urlFor(w09?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w09.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">10</span>
                <nuxt-img
                    v-if="w10?.image.asset?._ref"
                    :src="
                        $urlFor(w10?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w10.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">11</span>
                <nuxt-img
                    v-if="w11?.image.asset?._ref"
                    :src="
                        $urlFor(w11?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w11.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">12</span>
                <nuxt-img
                    v-if="w12?.image.asset?._ref"
                    :src="
                        $urlFor(w12?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w12.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">13</span>
                <nuxt-img
                    v-if="w13?.image.asset?._ref"
                    :src="
                        $urlFor(w13?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w13.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">14</span>
                <nuxt-img
                    v-if="w14?.image.asset?._ref"
                    :src="
                        $urlFor(w14?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w14.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">15</span>
                <nuxt-img
                    v-if="w15?.image.asset?._ref"
                    :src="
                        $urlFor(w15?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w15.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">16</span>
                <nuxt-img
                    v-if="w16?.image.asset?._ref"
                    :src="
                        $urlFor(w16?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w16.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">17</span>
                <nuxt-img
                    v-if="w17?.image.asset?._ref"
                    :src="
                        $urlFor(w17?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w17.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">18</span>
                <nuxt-img
                    v-if="w18?.image.asset?._ref"
                    :src="
                        $urlFor(w18?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w18.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">19</span>
                <nuxt-img
                    v-if="w19?.image.asset?._ref"
                    :src="
                        $urlFor(w19?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w19.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">20</span>
                <nuxt-img
                    v-if="w20?.image.asset?._ref"
                    :src="
                        $urlFor(w20?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w20.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">21</span>
                <nuxt-img
                    v-if="w21?.image.asset?._ref"
                    :src="
                        $urlFor(w21?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w21.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">22</span>
                <nuxt-img
                    v-if="w22?.image.asset?._ref"
                    :src="
                        $urlFor(w22?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w22.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">23</span>
                <nuxt-img
                    v-if="w23?.image.asset?._ref"
                    :src="
                        $urlFor(w23?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w23.name"
                />
            </div>
            <div class="cell">
                <span class="cell__number">24</span>
                <nuxt-img
                    v-if="w24?.image.asset?._ref"
                    :src="
                        $urlFor(w24?.image.asset?._ref)
                            .width(200)
                            .height(200)
                            .url()
                    "
                    class="cell__img"
                    :alt="w24.name"
                />
            </div>
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
            <div class="cell cell--not-dec" />
        </div>
    </section>
</template>

<script setup>
const uiStore = useUiStore()

const query = groq`*[_type == "adventCalendar"]{
w01->{
    name,
    image
  },
w02->{
    name,
    image
  },
w03->{
    name,
    image
  },
w04->{
    name,
    image
  },
w05->{
    name,
    image
  },
w06->{
    name,
    image
  },
w07->{
    name,
    image
  },
w08->{
    name,
    image
  },
w09->{
    name,
    image
  },
w10->{
    name,
    image
  },
w11->{
    name,
    image
  },
w12->{
    name,
    image
  },
w13->{
    name,
    image
  },
w14->{
    name,
    image
  },
w15->{
    name,
    image
  },
w16->{
    name,
    image
  },
w17->{
    name,
    image
  },
w18->{
    name,
    image
  },
w19->{
    name,
    image
  },
w20->{
    name,
    image
  },
w21->{
    name,
    image
  },
w22->{
    name,
    image
  },
w23->{
    name,
    image
  },
w24->{
    name,
    image
  }
}

`
const sanity = useSanity()

const { data } = await useAsyncData('adventCalendar', () => sanity.fetch(query))

const winners = computed(() => {
    return data.value
})

const w01 = computed(() => winners.value[0]?.w01)
const w02 = computed(() => winners.value[0]?.w02)
const w03 = computed(() => winners.value[0]?.w03)
const w04 = computed(() => winners.value[0]?.w04)
const w05 = computed(() => winners.value[0]?.w05)
const w06 = computed(() => winners.value[0]?.w06)
const w07 = computed(() => winners.value[0]?.w07)
const w08 = computed(() => winners.value[0]?.w08)
const w09 = computed(() => winners.value[0]?.w09)
const w10 = computed(() => winners.value[0]?.w10)
const w11 = computed(() => winners.value[0]?.w11)
const w12 = computed(() => winners.value[0]?.w12)
const w13 = computed(() => winners.value[0]?.w13)
const w14 = computed(() => winners.value[0]?.w14)
const w15 = computed(() => winners.value[0]?.w15)
const w16 = computed(() => winners.value[0]?.w16)
const w17 = computed(() => winners.value[0]?.w17)
const w18 = computed(() => winners.value[0]?.w18)
const w19 = computed(() => winners.value[0]?.w19)
const w20 = computed(() => winners.value[0]?.w20)
const w21 = computed(() => winners.value[0]?.w21)
const w22 = computed(() => winners.value[0]?.w22)
const w23 = computed(() => winners.value[0]?.w23)
const w24 = computed(() => winners.value[0]?.w24)
</script>

<style lang="scss" scoped>
.cell {
    @apply relative aspect-square overflow-clip bg-gradient-to-br from-butterscotch-200 dark:from-navy-800 dark:to-navy-400;

    &--not-dec {
        @apply opacity-30;
    }

    &__number {
        @apply absolute left-0 top-0 z-10 bg-tuscany-700 p-1 text-3xs leading-none text-white;
    }

    &__img {
        @apply h-full w-full scale-110 object-cover;
    }
}
</style>
