

//Sets up a webkitAudioContext
//Were we will do all our web audio work
var musicContext = new webkitAudioContext();	
 
//creates a master gain and master analyser
//that all of the different audio will run through
var masterGain = musicContext.createGainNode();
var masterAnalyser = musicContext.createAnalyser();

//Sets master gain
masterGain.gain.value = 1

//connects the gain and analyser so we will 
//hear everything connected to the master gain
masterGain.connect(masterAnalyser)
masterAnalyser.connect(musicContext.destination)

musicContext.listener.setPosition(0, 0, 0);

		
/*
 *  Creates an AUDIO object that will 
 *  be correlated to a specific 'sound object'
 *  in this case the sound objects arinit();
animate();

e 'emitters'
 *
 */
function AUDIO(){

  params = arguments[0]

  if(params.buffer){
    this.buffer = params.buffer
  }

  if(params.file){
    this.file = params.file
  }

  if(params.whichSoundObj){
    this.whichSoundObj = params.whichSoundObj
  }
  	
  if(params.looped){
    this.looped = params.looped
  }

  if(params.stream){
    this.streamFile = params.stream
  }

  //gets just the track name, removing the mp3
  //this.trackID= file.split('.')[file.split('.').length-2];
  
  this.playing = false
	
  //creates a source 
  this.createSource(); 
}
		
		
/*
 *  Audio Prototype 
 */

AUDIO.prototype = {
	
  playing:false,

  stop:function(){
      this.playing = false
      this.source.noteOff(0);
  },
      
  play:function(){
      
      this.playing = true
      this.source.noteOn(0);
      var self = this
      
      if(this.source.loop == false){
           this.createSource()	
      }
  },
          
  update:function(){

    //only update the visuals, if there is a visualize function
    //and the loop is playing
    //
    //
    //console.log('s')
    if(this.whichSoundObj.visualize && this.playing == true){
      this.freqByteData = new Uint8Arinit();
animate();

ray(this.analyser.frequencyBinCount)
      this.analyser.getByteFrequencyData(this.freqByteData)
     
      for(var i=0;i<this.analyser.frequencyBinCount;i++){
        if(this.whichSoundObj.visualize){
          //console.log(this.freqByteData[i])
          this.whichSoundObj.visualize(this.freqByteData[i],this.analyser.frequencyBinCount,i);
        }
      }
    }else{
    
    }
    
  },
  
 

  
  createSource: function(looped) {

      //creates a source based on 
      //this AUDIOs buffer
init();
animate();


     console.log('checks')
      if(this.buffer){
        this.source = musicContext.createBufferSource();
        this.source.buffer = this.buffer;
      }else if(this.streamFile){
       console.log('che;s') 
        this.createStream()
        console.log(this.stream)
        this.source = this.musicContext.createMediaElementSource(this.stream);

      }else{
        console.log('no buffer or stream );')
      }


      
      // Create a gain node.
      this.gainNode =  musicContext.createGainNode();
      
      //sets the gain to 0
      this.gainNode.gain.value = 1  ;
          
      //creates an analyser for this object             
      this.analyser = musicContext.createAnalyser();
      this.analyser.fftSize = 1024;
      
      this.panner = musicContext.createPanner();
      
      this.panner.setPosition(0,0,0)
              
      //loops the source. 
      if(this.looped){
          this.source.loop=true;
      }else{
          this.source.loop=false;
      }
              
      // Connect source to gain.
      this.source.connect(this.gainNode);
              
      //Connects source to analyser
      this.gainNode.connect(this.analyser);
  
              
      //Connect Analyser to destination
      this.analyser.connect(this.panner);

      this.panner.connect(masterGain)
          
  },


  //creates a streamed source for 
  createStream:function (){ 
  	var stream = new Audio();
	stream.preload = "none"
	stream.src = this.streamFile;
	stream.loop = true;
	this.stream = stream
  },

  //Disconnects and destroys all nodes
  //This is important for recreating source after source
  destroySource:function(){
      this.analyser.disconnect(this.gainNode)
      this.gainNode.disconnect(this.analyser)
      console.log('destroyed')
      this.source = undefined
      this.gainNode = undefined
      this.analyser = undefined
  },
	
}





