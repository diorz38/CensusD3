<template>
  <div class="legend-box"
    :style="{left: left + 'px', top: top + 'px'}">
    <span class="legend-label">{{title}}</span>    
    <table class="legend-table">
      <thead>
        <tr>
          <th v-for="(colorStop, index) in colorStops"
            :key="colorStop.color"
            :data-index="index" 
            :title="colorStop.value"
            :style="{backgroundColor: colorStop.color}">
            <span class="legend-label">
              <span v-if="index === colorStops.length -1">></span>
              {{colorStop.value}}
            </span>
          </th>
        </tr>        
      </thead>
    </table>    
  </div>
</template>

<style>
.legend-box {
  display: block;
  position: absolute;
  border: 0px;
  padding: 5px;
  z-index: 500;
}
.legend-table {
  background-color: #eee;  
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  empty-cells: show;
}
.legend-table tr {
  display: table-row;
}
.legend-table th {
  background-color: #fff;
  opacity: 0.6;
  font-size: 10px;
  font-weight: normal;
  text-align: left;
  padding: 2px;
  min-width: 40px;
}
.legend-label {
  color: #5dbbfb;
  font-size: 10px;
}
</style>

<script>
export default {
  name: 'legend-box',
  props: {
    title: {
      type: String,
      required: true
    },
    colorStops: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      left: 20,
      top: 330
    }
  },

  methods: {

    /**
     * Gets hex color for the specified number value and configured color palette
     */
    getColor (value) {
      let colorIndex = this.colorStops.length - 1
      while (colorIndex >= 0) { // check in reverse
        let colorStop = this.colorStops[colorIndex]
        if (value >= colorStop.value) {
          return colorStop.color
        }
        colorIndex--
      }
      return '#fff' // should never really get here
    }
  }

}
</script>
