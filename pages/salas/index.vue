<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(no)="data">
        <NuxtLink :to="`/salas/${data.item.no}`"
          ><b-button variant="success">{{ data.item.no }}</b-button></NuxtLink
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['name', 'no'],
      items: [
        {
          isActive: true,
          no: 40,
          name: 'Dickerson'
        },
        { isActive: false, no: 21, name: 'Larsen' },
        { isActive: false, no: 89, name: 'Geneva' },
        { isActive: true, no: 38, name: 'Jami' }
      ]
    }
  }
}
</script>
