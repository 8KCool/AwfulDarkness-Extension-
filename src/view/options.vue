<template>
  <div class="main_app">
    eed to position an absolute positioned button next to user's selected text.

I'm binding a mouseup event to the Document, and getting the selected text, but I'm currently out of ideas on how to know where the actual selection is positioned, without wrapping it in some element, because selection of text can be across several elements, and it would mess the structure if I would wrap it.

javascriptdom
Share
Follow
edited Jun 20, 2020 at 9:12
Community's user avatar
CommunityBot
111 silver badge
asked Oct 19, 2009 at 16:28
vsync's user avatar
vsync
116k5656 gold badges302302 silver badges392392 bronze badges
Add a comment
3 Answers
Sorted by:

Highest score (default)

30


You could position a marker span at the end of the selection, get its coordinates using jQuery, place your button at those coordinates and remove the marker span.

The following should get you started:

var markSelection = (function() {
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    return function(win) {
        win = win || window;
        var doc = win.document;
        var sel, range;
        // Branch for IE 
  </div>
</template>

<script>

export default {
  name: 'optionsView',
  data () {
    return {
      msg: 'options'
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
