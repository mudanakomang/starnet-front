<template>
  <div style="display: contents">
    <v-btn @click.stop="isOpen = true" v-bind="$attrs" :class="btnClass">
      <slot>
        <v-icon>mdi-delete</v-icon>
      </slot>
    </v-btn>

    <v-dialog v-model="isOpen" max-width="300">
      <v-card>
        <v-card-title class="headline">
          {{ text.title }}
        </v-card-title>

        <v-card-text>
          <h4>
            {{ text.body }}
          </h4>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancel">
            {{ text.cancel }}
          </v-btn>
          <v-btn color="success" text @click="confirm">
            {{ text.confirm }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    onConfirm: Function,
    cardText: {
      type: Object,
      default: () => ({})
    },
    btnClass: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpen: false,
      text: {
        title: this.cardText.title || this.$t("general.alert.youSure"),
        body: this.cardText.body || this.$t("general.alert.confirmDelete"),
        confirm: this.cardText.confirm || this.$t("general.alert.confirm"),
        cancel: this.cardText.cancel || this.$t("general.alert.cancel")
      }
    };
  },
  methods: {
    confirm() {
      this.isOpen = false;
      this.onConfirm();
    },
    cancel() {
      this.isOpen = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
