const light_blue = document.getElementById('light_blue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const start = document.getElementById('start')
const last_level = 1

class games {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generate_sequence()
    setTimeout(this.next_level, 500)
  }
  initialize(){
    this.next_level = this.next_level.bind(this)
    this.choose_color = this.choose_color.bind(this)
    this.toggle_stard()
    this.lvl= 1
    this.colors= {
      light_blue,
      purple ,
      orange ,
      green
    }
  }
  toggle_stard() {
    if (start.classList.contains('hide')){
      start.classList.remove('hide')
    } else {
      start.classList.add('hide')
    }
  }
  generate_sequence(){
    this.sequence= new Array(last_level).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  next_level(){
    this.sub_level = 0
    this.illuminate_sequence()
    this.add_click_events()
  }
  transform_number_color(number){
    switch(number){
      case 0:
        return 'light_blue'
      case 1:
        return 'purple'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }
  transform_color_number(color){
    switch(color){
      case 'light_blue':
        return 0
      case 'purple':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }
  illuminate_sequence(){
    for(let i = 0;i < this.lvl; i++) {
      const color = this.transform_number_color(this.sequence[i])
      setTimeout(() => this.illuminate_color(color), 1000 * i)
    }
  }
  illuminate_color(color){
    this.colors[color].classList.add('light')
    setTimeout(() => this.turn_off_color(color),350)
  }
  turn_off_color(color){
    this.colors[color].classList.remove('light')
  }
  add_click_events() {
    this.colors.light_blue.addEventListener('click' , this.choose_color)
    this.colors.purple.addEventListener('click' , this.choose_color)
    this.colors.orange.addEventListener('click' , this.choose_color)
    this.colors.green.addEventListener('click' , this.choose_color)
  }
  delete_click_events() {
    this.colors.light_blue.removeEventListener('click' , this.choose_color)
    this.colors.purple.removeEventListener('click' , this.choose_color)
    this.colors.orange.removeEventListener('click' , this.choose_color)
    this.colors.green.removeEventListener('click' , this.choose_color)

  }
  choose_color(ev) {
    const name_color = ev.target.dataset.color
    const number_color = this.transform_color_number(name_color)
    this.illuminate_color(name_color)
    if (number_color === this.sequence[this.sub_level]) {
      this.sub_level++
      if(this.sub_level === this.lvl)
      this.nivel++
      this.delete_click_events()
      if (this.lvl === (last_level + 1)) {
        this.win_game()
      } else {
      setTimeout(this.next_level, 1500)
      }
    } else {
      this.lost_game()
     }
    
  } 
  win_game() {
    swal ('Ganaste', 'success')
    .then(this.initialize)
  }
  lost_game () {
    swal ('Perdiste', 'success')
    .then( () =>{
     this.delete_click_events()
     this.initialize()
    })
  }
}
function start_game(){
  // debugger
window.game = new games()
}