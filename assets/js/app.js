// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

// game status 0 -> not started, 1 -> playing, 2 finished.
var app = new Vue({
  el: '#app',
  data: {
    message: 'Welcome Phoenix Typer...',
    textScript: "Lorem ipsum dolor sit amet.",
    // textScript: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    textArray: [],
    currentIndex: 0,
    wordCount: 0,
    textInput: "",
    wrongCurrentText: false,
    gameStatus: 0
  },
  computed: {
    currentText: function () {
      return this.textArray[this.currentIndex];
    },
    currentTextInput: function(){
      let spacePosition = this.textInput.indexOf(' ');
      if (spacePosition === -1){
        return this.textInput;
      } else {
        return this.textInput.substr(0, spacePosition);
      }
    },
    currentTextInputRemaining: function(){
      let spacePosition = this.textInput.indexOf(' ');
      if (spacePosition === -1){
        return this.textInput;
      } else {
        console.log("spacePosition", spacePosition);
        console.log("this.textInput.length", this.textInput.length);
        return this.textInput.substr(spacePosition, this.textInput.length);
      }
    }
  },
  methods: {
    handleKeyUp: function (event) {
      if(this.gameStatus !== 2){
        if(event.keyCode == 32){
          this.handleSpace();
        }
        this.checkError();
        this.checkWin();
      }
    },
    checkError(){
      if(!this.currentText.startsWith(this.currentTextInput)){
        console.log("CurrentText", this.currentText);
        console.log("TextInput", this.currentTextInput);
        this.wrongCurrentText = true;
      } else {
        this.wrongCurrentText = false;
      }
    },
    checkWin(){
      if(this.wordCount === this.currentIndex + 1){
        if(this.currentText === this.currentTextInput){
          this.gameStatus = 2;
          this.emtpyCurrentText();
          alert("Fin.");
        }
      }
    },
    handleSpace: function(){
      if(this.currentTextInput == this.currentText){
        this.emtpyCurrentText();
        this.incrementCurrentIndex();
      }
    },
    incrementCurrentIndex(){
      this.currentIndex += 1;
    },
    emtpyCurrentText(){
      // to do handle fast type
      this.textInput = "";
    }
  },
  mounted(){
    this.textArray = this.textScript.split(" ");
    this.wordCount = this.textArray.length;
  }
})