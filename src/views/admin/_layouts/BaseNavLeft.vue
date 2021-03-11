<template>
  <v-navigation-drawer v-model="drawerOpen" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ $t("general.nav.projectName") }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $t("general.nav.grune") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group value="true">
        <template v-for="menu in navLeftMenus">
          <v-list-item v-if="!menu.hasChildren" :key="menu.id" :to="menu.route">
            <v-list-item-icon v-if="menu.icon">
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t(menu.label) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else :key="menu.id" value="true" class="ml-1">
            <template v-slot:activator>
              <v-list-item-icon v-if="menu.icon">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t(menu.label) }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="submenu in menu.children"
              :key="submenu.title"
              :to="submenu.route"
              exact
              class="ml-5"
            >
              <v-list-item-icon v-if="submenu.icon">
                <v-icon>{{ submenu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t(submenu.label) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
const navLeftMenus = [
  {
    id: "user",
    label: "general.nav.users",
    // icon: "mdi-account-group-outline",
    hasChildren: true,
    children: [
      {
        id: "user.datatable",
        label: "general.crud.list",
        route: { name: "admin.user" },
        hasChildren: false
      },
      {
        id: "user.form",
        label: "general.crud.createNew",
        route: { name: "admin.user.create" },
        hasChildren: false
      }
    ]
  },
  {
    id: "event",
    label: "general.nav.events",
    // icon: "mdi-account-group-outline",
    hasChildren: true,
    children: [
      {
        id: "event.datatable",
        label: "general.crud.list",
        route: { name: "admin.event" },
        hasChildren: false
      },
      {
        id: "event.form",
        label: "general.crud.createNew",
        route: { name: "admin.event.create" },
        hasChildren: false
      }
    ]
  },
  {
    id: "big_category",
    label: "general.nav.big_category",
    // icon: "mdi-account-group-outline",
    hasChildren: true,
    children: [
      {
        id: "big_category.datatable",
        label: "general.crud.list",
        route: { name: "admin.event-category-group" },
        hasChildren: false
      },
      {
        id: "big_category.form",
        label: "general.crud.createNew",
        route: { name: "admin.event-category-group.create" },
        hasChildren: false
      }
    ]
  },
  {
    id: "middle_category",
    label: "general.nav.middle_category",
    // icon: "mdi-account-group-outline",
    hasChildren: true,
    children: [
      {
        id: "middle_category.datatable",
        label: "general.crud.list",
        route: { name: "admin.event-category" },
        hasChildren: false
      },
      {
        id: "middle_category.form",
        label: "general.crud.createNew",
        route: { name: "admin.event-category.create" },
        hasChildren: false
      }
    ]
  },
  {
    id: "admin",
    label: "general.nav.admin",
    // icon: "mdi-account-group-outline",
    hasChildren: true,
    children: [
      {
        id: "admin.datatable",
        label: "general.crud.list",
        route: { name: "admin.admin" },
        hasChildren: false
      },
      {
        id: "admin.form",
        label: "general.crud.createNew",
        route: { name: "admin.admin.create" },
        hasChildren: false
      }
    ]
  },
  {
    id: "billing_list",
    label: "general.nav.billing_list",
    // icon: "mdi-account-group-outline",
    route: { name: "admin.sales" },
    hasChildren: false
  }
];
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      navLeftMenus
    };
  },
  computed: {
    drawerOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {}
};
</script>
