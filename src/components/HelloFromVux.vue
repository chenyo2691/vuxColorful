<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>{{msg}}</h1>
      <span class="vux-close" style="color:red;"></span>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
import {cookie} from 'vux'
import {dateFormat} from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  filters: {
    dateFormat
  },
  mounted() {
    // setup
    // document.cookie = 'foo=1'
    // document.cookie = 'bar=2'
    // console.log(cookie.get('foo'));
    // returns '1'
    // console.log(cookie.get('bar', function (s) {return parseInt(s);}));
    // returns 2
    // console.log(dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'));
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
