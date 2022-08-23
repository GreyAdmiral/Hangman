"use strict";async function gameStart(e){try{let t=await fetch(`dict/${e}.json`);if(!t.ok)throw`Looks like there was a problem. Status Code: ${t.status}`;let r=await t.json();gameApp(r)}catch(e){gameWord.innerHTML="",message("Произошла ошибка!",2,gameWord,!0),console.log(e)}}function gameApp(e){let t=document.querySelector(".game");newWord=new Proxy(new Word(pickWord(e)),PROXYOPT),gameWord.append(wordInput(newWord.publicWord)),t.onclick=(e=>{let t=e.target;!t.closest("span.letter")||t.closest(".checked_true")||t.closest(".checked_false")||newWord.counter<7&&!newWord.winnerChecked&&(newWord.letterChecked(t.textContent)?(newWord.updatePublicWord=t.textContent,gameWord.innerHTML="",gameWord.append(wordInput(newWord.publicWord)),t.classList.add("checked_true")):(t.classList.add("checked_false"),allImages[newWord.counter].classList.remove("alive"),newWord.counter=++newWord.counter),newWord.winnerChecked?(resultMessage.hidden=!1,message("Вы победили!",4,resultMessage,!0)):newWord.counter>=7&&(looseWord(),resultMessage.hidden=!1,message("Вы проиграли!",4,resultMessage,!0))),e.stopPropagation()})}function menuClick(e){let t=document.querySelector(".header__menu"),r=document.querySelector(".burger");if(e.target.closest(".header__menu")&&e.target.id){if(resultMessage.hidden=!0,activeTag&&activeTag.classList.remove("header--active"),activeTag=e.target,activeTag.classList.add("header--active"),[...images.children].forEach((e,t)=>{0!==t&&e.classList.add("alive")}),[...alphaBetaDom.children].forEach(e=>{e.classList.remove("checked_true","checked_false")}),gameWord.innerHTML="","random"!==e.target.id)gameStart(e.target.id);else{let e=[...headerItem].slice(1).map(e=>e.id);gameStart(pickWord(e))}r.classList.contains("active")&&t.classList.contains("active")&&r.click()}e.target.closest(".burger")&&(r.classList.toggle("active"),t.classList.toggle("active"),document.body.classList.toggle("lock")),e.stopPropagation()}function pickWord(e){let t=Math.floor(Math.random()*e.length);return t!==oldWordNumber?(oldWordNumber=t,e[t]):pickWord(e)}function createAlphaBeta(e){let t=[],r=new DocumentFragment;for(let e=1072;e<=1103;e++){let o=letterReturn(e);t.push(o),r.append(createSpan(o,"letter")),1077===e&&(t.push(letterReturn(1105)),r.append(createSpan(letterReturn(1105),"letter")))}e.append(r)}function letterReturn(e){return String.fromCharCode(e)}function createSpan(e,t){let r=document.createElement("span");return r.classList.add(t),r.textContent=e,r}function wordInput(e){let t=new DocumentFragment;return[...e].forEach(e=>{let r=createSpan(e,"letter_word");t.append(r)}),t}function looseWord(){let e=gameWord.querySelectorAll(".letter_word");newWord.hint.forEach(t=>{let r=e[t.position];r.textContent=t.letter,r.classList.add("message--color")})}function message(e,t,r,o){let a=document.createElement("span");o?a.classList.add("start--message","message--color"):a.classList.add("start--message"),a.textContent=e,r.innerHTML="",r.append(a),setTimeout(blink,900,t,a)}function blink(e,t){t.classList.toggle("message--blink");let r=setTimeout(blink,900,++e,t);8===e&&clearTimeout(r)}const PROXYOPT={get(e,t){if(t.startsWith("_"))throw new Error("Отказано в доступе");{let r=e[t];return"function"==typeof r?r.bind(e):r}},set(e,t,r){if(t.startsWith("_"))throw new Error("Отказано в доступе");return e[t]=r,!0},deleteProperty(e,t){if(t.startsWith("_"))throw new Error("Отказано в доступе");return delete e[t],!0},ownKeys:e=>Object.keys(e).filter(e=>!e.startsWith("_"))};let oldWordNumber,newWord,activeTag,header=document.querySelector(".header"),headerItem=document.getElementsByClassName("header__item"),images=document.querySelector(".images"),gameWord=document.querySelector(".gameword"),alphaBetaDom=document.querySelector(".alphabeta"),allImages=document.querySelectorAll(".alive"),resultMessage=document.querySelector(".result__message");class Word{constructor(e){this.privateWord=e,this.publicWord=Word.firstPublicWord(this.privateWord),this.counter=0}get privateWord(){return this._privateWord}set privateWord(e){this._privateWord=e}get publicWord(){return this._publicWord}set publicWord(e){this._publicWord=e}set updatePublicWord(e){let t=[...this.publicWord];[...this.privateWord].forEach((r,o)=>{r.toLowerCase()==e.toLowerCase()&&(t[o]=r)}),this.publicWord=t.join("")}get counter(){return this._counter}set counter(e){this._counter=e}get winnerChecked(){return this.publicWord.toLowerCase()===this.privateWord.toLowerCase()}get hint(){return[...this.publicWord].reduce((e,t,r)=>(this.letterChecked(t)||e.push({letter:this.privateWord[r],position:r}),e),[])}static firstPublicWord(e){return Array(e.length).fill("_").join("")}letterChecked(e){return this.privateWord.toLowerCase().includes(e.toLowerCase())}}createAlphaBeta(alphaBetaDom),message("Выберите тему игры",1,gameWord,!1),header.addEventListener("click",menuClick);
