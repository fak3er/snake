window.onload=()=>{
    container=document.querySelector('.container')
    for(let i=0;i<400;i++){
        container.appendChild(document.createElement('div'))
    }
    let food=Math.round(Math.random()*400)
    container.childNodes[food].style.backgroundColor="red"
    class Snake {
        interval
        snake=[]
        control
        constructor(){
            this.snake.push(Math.round(Math.random()*400))
            this.control=new Controls()
        }
        move(){
            if(this.control.direction=="UP")
            {
                if((this.snake[0]-20)<=0)
                return false 
                this.snake.unshift(this.snake[0]-20)
                this.snake.pop()
                return true
            }
            else if(this.control.direction=="DOWN")
            {   
                if(this.snake[0]+20>400)
                return false
                this.snake.unshift(this.snake[0]+20)
                this.snake.pop()
                return true
            }
            else if(this.control.direction=="LEFT"){
                if(((this.snake[0]%20)-1)==0)
                    return false
                this.snake.unshift(this.snake[0]-1)
                this.snake.pop()
                return true
            }
            else
            {
                if(((this.snake[0]+1)%20)==1)
                return false
                this.snake.unshift(this.snake[0]+1)
                this.snake.pop()
                return true
            }
        }

    }
     class Controls{
        direction
        constructor(){
            this.direction="UP"
        }
        /**
          * @param {string} direct
          */
        set direction(direct){
            if((direct=="TOP" && this.direction=="DOWN") || (direct=="DOWN" && this.direction=="TOP") ||(direct=="LEFT" && this.direction=="RIGHT") || (direct=="RIGHT" && this.direction=="LEFT") )
            return 
            else
            this.direction=direct
        }
    }
    container.childNodes[Math.round(Math.random()*400)].style.backgroundColor="green"
    function gameLoop(snake){
        if(!snake.move())
            {
                this.Exit=true
                this.exit()
                clearInterval(snake.interval)
                return
            }
        for(child of container.children)
        child.style.backgroundColor="gray"
        container.childNodes[food].style.backgroundColor="red"
        if(snake.snake[0]==food)
        {
            snake.snake.unshift(food)
            food=Math.round(Math.random()*400)
        }
        for(portion of snake.snake )
        container.childNodes[portion].style.backgroundColor="green"
    }
   class GameMenu{
       rr=0
       constructor(){
           this.running=false
           this.Exit=false
           this.gameUI=new GameUI()
           this.gameUI.display()
           this.gameUI.menu.firstChild.firstChild.addEventListener('click',this.start.bind(this))
           this.gameUI.menu.firstChild.children[1].addEventListener('click',this.resume.bind(this))
           this.gameUI.menu.firstChild.children[2].addEventListener('click',this.exit.bind(this))
           this.snake=new Snake()
       }
       start(){
           if(!this.Exit)
           {   
               this.running=true
               this.gameUI.removeStartOption()
               this.gameUI.Remove()
               window.onkeydown=this.control.bind(this)
               this.snake.interval=setInterval(gameLoop.bind(this),100,this.snake)
            }    
       }
       resume(){
        if(!this.Exit && this.running)
        {    
            this.gameUI.removeStartOption()
            this.gameUI.Remove()
            window.onkeydown=this.control.bind(this)
            this.snake.interval=setInterval(gameLoop.bind(this),100,this.snake)
         }    
    }
       pause(){
           if(!this.Exit)
            clearInterval(this.snake.interval)
            window.onkeydown=undefined
            this.gameUI.display()
       }
       exit(){
           clearInterval(this.snake.interval)
           this.snake=null
           window.onkeydown=undefined
           if(!this.Exit)
           this.gameUI.Remove()
           game= new GameMenu()
       }    
       control(e){
        if(e.keyCode==40)
        game.snake.control.direction="DOWN"
        else if(e.keyCode==38)
        game.snake.control.direction="UP"
        else if(e.keyCode==37)
        game.snake.control.direction="LEFT"
        else if(e.keyCode==39)
        game.snake.control.direction="RIGHT"
        else if(e.keyCode==32)
        {
            this.pause()
        }
    }
   }
 class GameUI {
    constructor(){ 
    this.init()
    }
    init(){
        this.menu=document.createElement('div')
        this.menu.classList.add('gamemenuui')
        this.menu.innerHTML=`<div class='gamemenu'><div>start</div>
        <div>resume</div>
        <div>restart</div>
        </div>`
        this.startOption=document.createElement('div')
        this.startOption.textContent="start"
    }
    display(){
        document.body.appendChild(this.menu)
    }
    Remove(){
        document.body.removeChild(this.menu)
    }
    removeStartOption(){
        if(this.menu.firstChild.firstChild.textContent=='start')
        this.menu.firstChild.firstChild.remove()
    }
    addFirstStartOption(){
        this.menu.firstChild.insertBefore(this.menu.firstChild.firstChild,this.startOption)
    }   
 }
 game=new GameMenu()
}